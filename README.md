# Agentic Fullstack

[![npm version](https://img.shields.io/npm/v/@luizsantiago/agentic-fullstack.svg)](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Layer sister skills for the [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness). The Harness is the SDD method. This package is the **floor map**: frontend, backend, data, analytics, data science — one Execute manual per layer.

npm: [`@luizsantiago/agentic-fullstack`](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack)

## Install

Run these in **your product repository** (the company app). Node.js 18+. Python 3.10+ for gates.

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

Done when doctor prints `All checks passed`. Then edit `.specs/project/PROJECT.md` if your folders are not `apps/web`, `apps/api`, `dbt`, and so on.

| Command | When |
| --- | --- |
| `install --force` | Skills only, no Harness yet (`doctor` still fails until Harness is installed) |
| `install --sync-registry` | Refresh **only** the Layer registry table after a package upgrade (keeps your Stack / test commands) |

Re-running Harness install **does not delete** Fullstack skills. Re-run Fullstack `install` to refresh skills, the rule, and the layer gate.

## Use with the Harness

1. Write spec/tasks as usual (Harness).
2. Keep each task `Files` on **one** floor.
3. Before Execute:

```bash
python3 .specs/harness/scripts/validate_layer_routing.py your-feature
```

4. During Execute load `engineering-standards.md` + `references/implement.md` **and one** layer skill (`frontend-engineering.md` *or* `backend-engineering.md` *or* data / analytics / datascience). Never two layer skills in the same turn.
5. After commit, drop the layer skill. On `/verify`, load **no** Fullstack skills.

How to pick a skill and the daily ritual: [wiki — How to use](wiki/How-to-use.md).

## What you get

| Artifact | Purpose |
| --- | --- |
| `.cursor/skills/*-engineering.md` | Five Execute manuals (also copied to `.claude/skills/`) |
| `.cursor/rules/fullstack-layer.mdc` | At most one layer skill per task |
| `.specs/harness/scripts/validate_layer_routing.py` | Gate: task `Files` vs the registry |
| `.specs/project/PROJECT.md` | Your stack + layer map (created if missing, never overwritten on a normal install) |

| Layer | Skill | Typical paths |
| --- | --- | --- |
| `frontend` | `frontend-engineering.md` | `apps/web/**`, `**/*.tsx` |
| `backend` | `backend-engineering.md` | `apps/api/**`, `backend/**` |
| `data` | `data-engineering.md` | `dbt/**`, `**/etl/**`, `warehouse/**` |
| `analytics` | `analytics-engineering.md` | `analytics/**`, `notebooks/explore/**` |
| `datascience` | `data-science-engineering.md` | `experiments/**`, `ml/**`, `training/**` |

Skills are application manuals, not framework tutorials. The agent still discovers React, Fastify, dbt, or sklearn from **your** repo. Token budget: each skill `<2800` chars÷4; the routing rule `<600`.

Peer: `@luizsantiago/agentic-harness` **≥ 0.7.0** (optional on npm; required for a green `doctor`).

## This repository (package contributors)

`npx` only works here after `npm install` (`prepare` links the local bin). Then:

```bash
npm install
npm test
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate
```

`demo:validate` is **this git only** (spec-only `demo-login`). In a product repo, pass your feature name to `validate_layer_routing.py`.

## Releases

GitHub Actions (`.github/workflows/publish.yml`). Secret **`NPM_TOKEN`** must be an npm **Automation** or **Granular** token with **Bypass 2FA**. Details: [wiki — Publishing](wiki/Publishing.md).

## Wiki

Product playbook (why, skills, registry, FAQ): [`wiki/`](wiki/). Enable GitHub Wikis, then copy those files (see `wiki/README.md`).

## License

MIT
