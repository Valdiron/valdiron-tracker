# Valdiron Tracker

Aplicativo Android em Expo/React Native para análise demonstrativa de perfis e monitoramento responsável de informações públicas ou autorizadas.

## Estado atual

Esta é uma versão inicial de interface. Os dados são demonstrativos; integrações com Meta/Instagram, Supabase e IA ainda precisam ser configuradas no backend.

## Requisitos

- Node.js LTS
- Expo CLI via `npx expo`
- EAS CLI para gerar APK

## Executar

```bash
npm install
npx expo start
```

## APK de teste

```bash
npm install -g eas-cli
eas build --platform android --profile preview
```

## Privacidade e segurança

Não use para acessar contas privadas sem autorização, contornar controles de privacidade, ler mensagens privadas ou coletar senhas. Integrações futuras devem usar APIs oficiais, consentimento explícito, controles de acesso e conformidade com a LGPD.
