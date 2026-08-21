# AGENTS.md

## Cursor Cloud specific instructions

### What this repository is

npm extension package `@luizsantiago/fullstack-floor-map` — **Full Stack Floor Map** companion for Spec Seatbelt: Floors layer sister skills (frontend, backend, data, analytics, data science) + specialist catalog. Primary deliverable is skills + CLI installer + layer routing gate. Display name: **Full Stack Floor Map**. See `docs/guide/rename-handoff.md` for publish/deprecation notes.

### Install (fresh clone)

```bash
npm install # links local CLI bin — required in this repo before npx fullstack works
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
npm run demo:validate # validate-layers for every .specs/features/demo-*
npm run demo:local    # sandbox: install + gates + specialist smoke → demo/workspace/
```

`install` fails without Seatbelt unless you pass `--force` (layer skills only; `doctor` still requires Seatbelt + gates).

`install --sync-registry` rewrites only the `## Layer registry` table in `.specs/project/PROJECT.md` from package defaults.

`doctor` is a subcommand of `@luizsantiago/fullstack-floor-map` — not a separate package.

Why `npm install` here: when the cwd is this package, `npx @luizsantiago/fullstack-floor-map` resolves to the local folder but npm does not create `node_modules/.bin/fullstack-floor-map` until `prepare` runs (`scripts/link-local-bin.mjs`).

Fallback: `node index.js install` / `node index.js doctor` / `node index.js validate-layers`.

### Test

```bash
npm install
npm test
node scripts/validate-layer-skills.mjs
```

Uses Node built-in test runner. CI (Node 22) also runs Seatbelt install + `npm run demo:validate`.

### CI

Push/PR to `main`: `.github/workflows/ci.yml` (lint workflows, `npm test`, pack checks).

### Re-install safety

- Seatbelt install overwrites only its catalog skills — extension skills (`*-engineering.md` + `catalog/`) survive.
- Fullstack install refreshes extension skills, catalog, `fullstack-layer.mdc`, and `validate_layer_routing.py`; does not overwrite existing `.specs/project/PROJECT.md` unless `--sync-registry`.

### Key paths

| Path | Role |
| --- | --- |
| `skills/` | Floors layer manuals (legacy Execute) |
| `catalog/` | Specialist skills (`SKILL.md` + `references/`) |
| `rules/fullstack-layer.mdc` | Floor + specialist load policy |
| `gates/validate_layer_routing.py` | Layer gate → `.specs/seatbelt/scripts/` |
| `lib/project-template.js` | Generates `PROJECT.md` from `DEFAULT_LAYERS` |
| `docs/guide/` | User guide (no wiki) |
| `docs/guide/catalog-index.md` | Generated specialist index (domain → Floor) |
| `docs/guide/product-activation-proof.md` | Manual proof in a product repo |
| `.specs/features/demo-*/` | Spec-only Floor examples (git only; not on npm) |
| `demo/` | Local sandbox (`demo:local`), smoke fixtures, playbook |
| `lib/catalog-pin.js` | Upstream pin + verify-forbidden list |
| `docs/guide/Companion-sync.md` | Seatbelt companion sync process |
| `docs/guide/Companion-sync-prompt-desks-v3.md` | Copy-paste prompt for Seatbelt agent (Desks planned) |
| `prd/agentic-fullstack-v2.md` | PRD for v2 layers |

### Seatbelt integration

Do not edit Seatbelt-owned files expecting them to persist (`agent-architecture.md`, core gates). Extend via this package only. `validate_layer_routing.py` is extension-owned and refreshed on fullstack install.

When a change affects **pairing** (Execute/Verify load rules, `.specs/` ownership, install order, companion naming): emit or update a **Companion Sync** prompt under `docs/guide/Companion-sync-prompt-*.md`, log it in `docs/guide/Companion-sync.md`, and include it in the PR body so it can be pasted into a Spec Seatbelt–only agent chat. If Seatbelt needs no change, log **Lego only — no Seatbelt sync**.

| Path | Role |
| --- | --- |
| `docs/guide/Companion-sync.md` | Sync process + log |
| `docs/guide/Companion-sync-prompt-desks-v3.md` | Desks v3 (planned) prompt for Seatbelt |
