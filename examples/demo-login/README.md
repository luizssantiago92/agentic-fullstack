# Demo Login (minimal code)

Runnable counterpart to [`.specs/features/demo-login/`](../../.specs/features/demo-login/). Layer routing still lives in the spec/tasks + `validate_layer_routing.py`. This folder is a tiny in-process implementation of REQ-001 / REQ-002 so CI can prove the documented split against real modules.

## Paths (match demo tasks)

| Task | File |
| --- | --- |
| T1 frontend | `apps/web/src/components/LoginForm.js` |
| T2 backend | `apps/api/src/routes/login.js` |

No extra npm dependencies. From the repository root:

```bash
npm run demo:example
```

Valid credentials used by the demo only: `demo@example.com` / `demo-pass`.
