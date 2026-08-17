# AGENTS.md

## Cursor Cloud specific instructions

### What this repository is

npm extension package `@luizsantiago/agentic-fullstack` — layer sister skills (frontend + backend) for the Spec-Driven Harness. Not an application repo; primary deliverable is skills + CLI installer.

### Install (fresh clone)

```bash
npm install   # links local CLI bin — required in this repo before npx fullstack works
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

`install` fails without harness unless you pass `--force` (layer skills only; `doctor` still requires harness + gates).

`doctor` is a subcommand of `@luizsantiago/agentic-fullstack` — not a separate package and not a separate npm token.

Why `npm install` here: when the cwd is this package, `npx @luizsantiago/agentic-fullstack` resolves to the local folder but npm does not create `node_modules/.bin/agentic-fullstack` until `prepare` runs (`scripts/link-local-bin.mjs`). Without that step you get `agentic-fullstack: not found`.

Fallback: `node index.js install` / `node index.js doctor`.

Published npm version (check with `npm view @luizsantiago/agentic-fullstack version`). CI publish uses GitHub secret `NPM_TOKEN` (Automation token with bypass 2FA).

### Test

```bash
npm install
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
