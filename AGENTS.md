# AGENTS.md

## Cursor Cloud specific instructions

### What this repository is

npm extension package `@luizsantiago/agentic-fullstack` — layer sister skills (frontend + backend) for the Spec-Driven Harness. Not an application repo; primary deliverable is skills + CLI installer.

### Install (fresh clone)

```bash
npx @luizsantiago/agentic-harness install
node index.js install
node index.js doctor
```

Or after publish: `npx @luizsantiago/agentic-fullstack install`

### Test

```bash
npm test
```

Uses Node built-in test runner; no external test dependencies.

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

### Harness integration

Do not edit harness-owned files expecting them to persist (`agent-architecture.md`, gates under `.specs/harness/scripts/`). Extend via this package only.
