# Demo

This package is **not** a login product. The demo exists only to **show the task split** — spec and tasks, zero application code.

## What ships on npm

Folder `.specs/features/demo-login/`:

- **T1** — `apps/web/src/components/LoginForm.tsx` → frontend floor
- **T2** — `apps/api/src/routes/login.ts` → backend floor

In the spec: a form with email, password, and submit; API 200 with a token / 401 with a stable error. It is the “hello world” of *routing*, not a service you run.

```bash
npm run demo:validate
```

It should report T1 → frontend and T2 → backend.

## What is missing (on purpose)

No `examples/` with a server. No dbt/ML demo in the package: that is covered by the gate tests. In **your** product, copy the field shape (Requirement, Files, Tests, Gate, Done when) and point at real paths.
