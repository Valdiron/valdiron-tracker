# Configurar o Supabase — Valdiron Tracker

Esta etapa cria a estrutura inicial do banco. Ainda não ativa coleta do Instagram nem análises de IA.

## 1. Criar projeto
1. Entre em https://supabase.com/dashboard.
2. Crie um projeto chamado `valdiron-tracker`.
3. Guarde a senha do banco em local seguro.

## 2. Aplicar a migração
1. Abra o projeto no Supabase.
2. Entre em **SQL Editor** → **New query**.
3. Abra no GitHub o arquivo `supabase/migrations/202611020001_initial_schema.sql`.
4. Copie todo o SQL, cole no editor e clique em **Run**.
5. Em **Table Editor**, confirme a criação das tabelas.

## 3. Configurar as chaves no backend
Em **Project Settings → API**, copie:
- Project URL → `SUPABASE_URL`
- anon/public key → `SUPABASE_ANON_KEY`

Coloque esses valores somente nas variáveis de ambiente do serviço backend. Não publique valores secretos no GitHub nem dentro do APK. Nunca use a chave `service_role` no aplicativo.

## 4. Tabelas iniciais
`profiles`, `tracked_accounts`, `authorizations`, `account_snapshots`, `alerts`, `ai_analyses`, `investigations`, `reports` e `audit_logs`.

As políticas RLS limitam a leitura e alteração dos registros ao usuário autenticado. Registros de autorização, snapshots, alertas, análises e auditoria não podem ser gravados diretamente pelo cliente.

## 5. O que ainda falta
- Criar o projeto Supabase e executar a migração.
- Configurar as variáveis de ambiente no host do backend.
- Conectar autenticação no aplicativo.
- Validar consentimento e permissões oficiais antes de qualquer integração com Instagram/Meta.
- Implementar análises de IA somente com dados permitidos, mostrando fontes, incertezas e limitações.

**Não envie senhas, tokens ou chaves privadas aqui no chat.** Se precisar compartilhar configuração, use apenas nomes de variáveis e confirme quando o setup estiver concluído.
