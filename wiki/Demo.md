# Demo

This package is **not** a login product. The demo exists only to **show the task split** — spec and tasks, zero application code. It lives in this **git repository** (not copied by `install`, not shipped on npm).

## Spec-only split

Folder `.specs/features/demo-login/` in the package git:

- **T1** — `apps/web/src/components/LoginForm.tsx` → frontend floor
- **T2** — `apps/api/src/routes/login.ts` → backend floor

In the spec: a form with email, password, and submit; API 200 with a token / 401 with a stable error. It is the “hello world” of *routing*, not a service you run.

```bash
npx @luizsantiago/agentic-fullstack validate-layers demo-login
```

(or `npm run demo:validate` in this repo)

It should report T1 → frontend and T2 → backend.

That split is the pairing contract: vertical **feature**, horizontal **tasks**. See [How to use](How-to-use).

## What is missing (on purpose)

No `examples/` with a server. No dbt/ML demo in the package: that is covered by the gate tests. In **your** product, copy the field shape (Requirement, Files, Tests, Gate, Done when) and point at real paths.
