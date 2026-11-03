-- Valdiron Tracker: initial secure schema
-- Apply with: supabase db push
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tracked_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  platform text not null default 'instagram' check (platform in ('instagram')),
  username text not null check (length(username) between 1 and 30),
  display_name text,
  account_type text not null default 'public' check (account_type in ('public','authorized')),
  status text not null default 'pending' check (status in ('pending','active','paused','revoked')),
  source_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id, platform, username)
);

create table if not exists public.authorizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  tracked_account_id uuid not null references public.tracked_accounts(id) on delete cascade,
  authorization_type text not null check (authorization_type in ('account_owner','explicit_consent','official_api')),
  status text not null default 'pending' check (status in ('pending','active','expired','revoked')),
  evidence_reference text,
  granted_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  check (expires_at is null or granted_at is null or expires_at > granted_at)
);

create table if not exists public.account_snapshots (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  tracked_account_id uuid not null references public.tracked_accounts(id) on delete cascade,
  captured_at timestamptz not null default now(),
  source text not null check (source in ('official_api','user_provided','demo')),
  payload jsonb not null default '{}'::jsonb
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  tracked_account_id uuid references public.tracked_accounts(id) on delete set null,
  alert_type text not null,
  title text not null,
  description text,
  severity text not null default 'info' check (severity in ('info','low','medium','high')),
  status text not null default 'unread' check (status in ('unread','read','dismissed')),
  created_at timestamptz not null default now()
);

create table if not exists public.ai_analyses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  tracked_account_id uuid references public.tracked_accounts(id) on delete set null,
  model text,
  risk_level text not null default 'unknown' check (risk_level in ('unknown','low','medium','high')),
  summary text not null,
  indicators jsonb not null default '[]'::jsonb,
  limitations text,
  created_at timestamptz not null default now()
);

create table if not exists public.investigations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  objective text,
  status text not null default 'open' check (status in ('open','closed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  investigation_id uuid references public.investigations(id) on delete set null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists tracked_accounts_owner_idx on public.tracked_accounts(owner_id, created_at desc);
create index if not exists authorizations_account_idx on public.authorizations(tracked_account_id, status);
create index if not exists snapshots_account_time_idx on public.account_snapshots(tracked_account_id, captured_at desc);
create index if not exists alerts_owner_time_idx on public.alerts(owner_id, created_at desc);
create index if not exists analyses_owner_time_idx on public.ai_analyses(owner_id, created_at desc);
create index if not exists audit_actor_time_idx on public.audit_logs(actor_id, created_at desc);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists tracked_accounts_updated_at on public.tracked_accounts;
create trigger tracked_accounts_updated_at before update on public.tracked_accounts for each row execute function public.set_updated_at();
drop trigger if exists investigations_updated_at on public.investigations;
create trigger investigations_updated_at before update on public.investigations for each row execute function public.set_updated_at();

-- Create a profile row for each new authenticated user.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'));
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.tracked_accounts enable row level security;
alter table public.authorizations enable row level security;
alter table public.account_snapshots enable row level security;
alter table public.alerts enable row level security;
alter table public.ai_analyses enable row level security;
alter table public.investigations enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

create policy "profile owner can read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profile owner can update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "owner manages tracked accounts" on public.tracked_accounts for all to authenticated
using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads authorizations" on public.authorizations for select to authenticated
using (owner_id = auth.uid());
create policy "owner reads snapshots" on public.account_snapshots for select to authenticated using (owner_id = auth.uid());
create policy "owner reads alerts" on public.alerts for select to authenticated using (owner_id = auth.uid());
create policy "owner updates alerts" on public.alerts for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads analyses" on public.ai_analyses for select to authenticated using (owner_id = auth.uid());
create policy "owner manages investigations" on public.investigations for all to authenticated
using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner manages reports" on public.reports for all to authenticated
using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads audit logs" on public.audit_logs for select to authenticated using (actor_id = auth.uid());

-- Clients may read their own records. Snapshot/alert/analysis/audit writes are reserved for trusted backend jobs.
revoke insert, update, delete on public.authorizations from anon, authenticated;
revoke insert, update, delete on public.account_snapshots from anon, authenticated;
revoke insert, update, delete on public.alerts from anon, authenticated;
revoke insert, update, delete on public.ai_analyses from anon, authenticated;
revoke insert, update, delete on public.audit_logs from anon, authenticated;
