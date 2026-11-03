# Valdiron Tracker API

API inicial Node.js + Express + Supabase Auth. O backend valida o JWT do usuário e usa o mesmo token nas consultas ao Supabase, fazendo as políticas RLS valerem também nas operações da API.

## Local
1. Copie `.env.example` para `.env`.
2. Configure `SUPABASE_URL` e `SUPABASE_ANON_KEY` (chave pública/anon, nunca service-role).
3. `npm install`
4. `npm run dev`

## Endpoints
- `GET /health` público
- `GET /api/me` autenticado
- `GET /api/accounts` autenticado
- `POST /api/accounts` autenticado, body: `{"username":"perfil","account_type":"public"}`

## Segurança
Nunca coloque chaves secretas no aplicativo. A coleta de dados do Instagram não está implementada. Use somente APIs oficiais e dados públicos ou expressamente autorizados. Não solicite senha do Instagram, não leia mensagens privadas e não tente contornar controles de privacidade.
