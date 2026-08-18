# Demo

This package is a **CLI + skills** repo, not an app. The only shipped demo is **spec-only**.

## demo-login

Path: `.specs/features/demo-login/`

| Task | Files | Layer |
| --- | --- | --- |
| T1 | `apps/web/src/components/LoginForm.tsx` | frontend |
| T2 | `apps/api/src/routes/login.ts` | backend |

There is **no** application code and **no** `examples/` tree. CI runs `npm run demo:validate` against this feature.

## What is not shipped

- No `examples/demo-login` runnable app
- No `demo-data-routing` spec — data / analytics / datascience routing is covered by `test/gate.test.js`

Copy the task shape (Requirement, Files, Tests, Gate, Done when) into **your** product repo after install.
