# AGENTS.md

## Cursor Cloud specific instructions

### What this repository is

npm extension package `@luizsantiago/agentic-fullstack` — layer sister skills (frontend + backend) for the Spec-Driven Harness. Not an application repo; primary deliverable is skills + CLI installer.

### Install (fresh clone)

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

`install` fails without harness unless you pass `--force` (layer skills only; `doctor` still requires harness + gates).

For development from this repo (same `package.json` name breaks `npx @luizsantiago/agentic-fullstack` here — use the local CLI):

```bash
node index.js install
node index.js install --force
node index.js doctor
```

Published npm version (check with `npm view @luizsantiago/agentic-fullstack version`). CI publish uses GitHub secret `NPM_TOKEN` (Automation token with bypass 2FA).

### Test

```bash
npm test
```

Uses Node built-in test runner; no external test dependencies.

### Publish

Requires GitHub secret **`NPM_TOKEN`**.

Use an npm **Automation** token (or Granular with **Bypass 2FA for automation**). Classic publish tokens with 2FA fail in CI with `EOTP`.

After updating the secret:

1. Actions → **Publish to npm** → Run workflow → bump **`none`** (or recreate GitHub Release `v0.1.0`)
2. Confirm: `npm view @luizsantiago/agentic-fullstack version`

CI runs on push/PR to `main` (`.github/workflows/ci.yml`).

### Re-install safety

- Harness install overwrites only its catalog skills — `frontend-engineering.md` and `backend-engineering.md` survive.
- Fullstack install refreshes extension skills and `fullstack-layer.mdc`; does not overwrite existing `.specs/project/PROJECT.md`.

### Key paths

| Path | Role |
| --- | --- |
| `skills/` | Source skills copied on install |
| `rules/fullstack-layer.mdc` | Layer routing rule |
| `templates/PROJECT.md` | Default project config template |
| `.specs/features/demo-login/` | Demo spec/tasks for layer split |
| `.github/workflows/` | CI and npm publish |

### Harness integration

Do not edit harness-owned files expecting them to persist (`agent-architecture.md`, gates under `.specs/harness/scripts/`). Extend via this package only.
