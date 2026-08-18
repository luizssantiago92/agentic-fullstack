# AGENTS.md

## Cursor Cloud specific instructions

### What this repository is

npm extension package `@luizsantiago/agentic-fullstack` — layer sister skills (frontend, backend, data, analytics, data science) for the Spec-Driven Harness. Not an application repo; primary deliverable is skills + CLI installer + layer routing gate.

### Install (fresh clone)

```bash
npm install   # links local CLI bin — required in this repo before npx fullstack works
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate   # wraps: node index.js validate-layers demo-login

```

`install` fails without harness unless you pass `--force` (layer skills only; `doctor` still requires harness + gates).

`install --sync-registry` rewrites only the `## Layer registry` table in `.specs/project/PROJECT.md` from package defaults — use after upgrading the extension when new layers ship.

`doctor` is a subcommand of `@luizsantiago/agentic-fullstack` — not a separate package.

Why `npm install` here: when the cwd is this package, `npx @luizsantiago/agentic-fullstack` resolves to the local folder but npm does not create `node_modules/.bin/agentic-fullstack` until `prepare` runs (`scripts/link-local-bin.mjs`). Without that step you get `agentic-fullstack: not found`.

Fallback: `node index.js install` / `node index.js doctor` / `node index.js validate-layers`.

Published npm version: `npm view @luizsantiago/agentic-fullstack version`.

### Test

```bash
npm install
npm test
```

Uses Node built-in test runner; no external test dependencies. CI (Node 22) also runs harness install + `npm run demo:validate`.

### CI

Push/PR to `main`: `.github/workflows/ci.yml` (lint workflows, `npm test`, pack checks).

### Re-install safety

- Harness install overwrites only its catalog skills — extension skills (`*-engineering.md`) survive.
- Fullstack install refreshes extension skills, `fullstack-layer.mdc`, and `validate_layer_routing.py`; does not overwrite existing `.specs/project/PROJECT.md` unless `--sync-registry`.

### Key paths

| Path | Role |
| --- | --- |
| `skills/` | Source skills copied on install (5 layer sisters) |
| `rules/fullstack-layer.mdc` | Layer routing rule |
| `gates/validate_layer_routing.py` | Layer routing gate (copied to `.specs/harness/scripts/`) |
| `lib/project-template.js` | Generates `PROJECT.md` from `DEFAULT_LAYERS` |
| `templates/PROJECT.md` | Default project config (generated from constants) |
| `.specs/features/demo-login/` | Spec-only FE/BE routing example (git repo only; not on npm, not copied by install) |
| `prd/agentic-fullstack-v2.md` | PRD for v2 layers and boundaries |

### Harness integration

Do not edit harness-owned files expecting them to persist (`agent-architecture.md`, core gates under `.specs/harness/scripts/`). Extend via this package only. `validate_layer_routing.py` is extension-owned and refreshed on fullstack install.
