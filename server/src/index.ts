import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.APP_ORIGIN === '*' ? true : process.env.APP_ORIGIN?.split(',') }));
app.use(express.json({ limit: '32kb' }));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Configure SUPABASE_URL e SUPABASE_ANON_KEY no ambiente do servidor.');
}

function userClient(token: string) {
  return createClient(supabaseUrl!, supabaseAnonKey!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

async function requireUser(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.header('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Token de sessão ausente.' });
  const client = userClient(token);
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
  res.locals.user = data.user;
  res.locals.supabase = client;
  next();
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'valdiron-tracker-api' }));

app.get('/api/me', requireUser, (req, res) => {
  const user = res.locals.user;
  res.json({ id: user.id, email: user.email ?? null });
});

app.get('/api/accounts', requireUser, async (_req, res) => {
  const client = res.locals.supabase;
  const { data, error } = await client.from('tracked_accounts')
    .select('id, username, platform, account_type, status, created_at')
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ accounts: data });
});

const accountSchema = z.object({
  username: z.string().trim().min(1).max(30).regex(/^[a-zA-Z0-9._]+$/),
  account_type: z.enum(['public', 'authorized']).default('public')
});

app.post('/api/accounts', requireUser, async (req, res) => {
  const parsed = accountSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Dados inválidos.', details: parsed.error.flatten() });
  const user = res.locals.user;
  const client = res.locals.supabase;
  const { data, error } = await client.from('tracked_accounts').insert({
    owner_id: user.id,
    platform: 'instagram',
    username: parsed.data.username.replace(/^@/, ''),
    account_type: parsed.data.account_type,
    status: 'pending'
  }).select('id, username, platform, account_type, status, created_at').single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ account: data, note: 'Registro criado. A coleta só poderá começar após validar fonte e autorização.' });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`Valdiron Tracker API listening on ${port}`));
