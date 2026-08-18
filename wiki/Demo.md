# Demo

Este pacote **não** é um produto de login. A demo existe só para **mostrar o split** de tasks — spec e tasks, zero código de app.

## O que vem no npm

Pasta `.specs/features/demo-login/`:

- **T1** — `apps/web/src/components/LoginForm.tsx` → andar frontend  
- **T2** — `apps/api/src/routes/login.ts` → andar backend  

No spec: formulário com email, password e submit; API 200 com token / 401 com erro estável. É o “olá, mundo” do *routing*, não um serviço para rodar.

```bash
npm run demo:validate
```

Deve dizer T1 → frontend e T2 → backend.

## O que não existe (de propósito)

Não há `examples/` com servidor. Não há demo de dbt/ML no pacote: isso está coberto pelos testes do gate. No **seu** produto, copie o formato dos campos (Requirement, Files, Tests, Gate, Done when) e aponte para os paths reais.
