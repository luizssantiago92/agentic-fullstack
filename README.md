# Agentic Fullstack

[![npm version](https://img.shields.io/npm/v/@luizsantiago/agentic-fullstack.svg)](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Layer sister skills for the [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness). **Application manuals** for frontend, backend, and data-stack Execute work — the agent discovers framework knowledge; these skills say **how to apply it** per layer with low token cost.

npm package: [`@luizsantiago/agentic-fullstack`](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack)

## Install

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
```

Without harness (layer skills only — `doctor` will still fail until harness is installed):

```bash
npx @luizsantiago/agentic-fullstack install --force
```

Sync the Layer registry table in an existing `PROJECT.md` from package defaults (does not touch other sections):

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

Check health:

```bash
npx @luizsantiago/agentic-fullstack doctor
```

Re-running harness install **does not remove** extension skills. Re-run fullstack install to refresh extension files.

## What you get

| Artifact | Purpose |
| --- | --- |
| `.cursor/skills/frontend-engineering.md` | Frontend Execute manual |
| `.cursor/skills/backend-engineering.md` | Backend Execute manual |
| `.cursor/skills/data-engineering.md` | Data pipelines, dbt, ETL, warehouse |
| `.cursor/skills/analytics-engineering.md` | Analytics, EDA, SQL, dashboards, reports |
| `.cursor/skills/data-science-engineering.md` | ML experiments, training, model artifacts |
| `.cursor/rules/fullstack-layer.mdc` | Layer routing — one layer skill per task |
| `.specs/harness/scripts/validate_layer_routing.py` | Gate: task `Files` vs registry (max 1 layer) |
| `.specs/project/PROJECT.md` | Stack, layer registry, test/lint commands (created if missing) |

Same skills are copied to `.claude/skills/` for Claude Code.

## Layer registry

`PROJECT.md` § Layer registry maps layer id → skill file → globs. Shipped layers:

| Layer id | Skill | Focus |
| --- | --- | --- |
| `frontend` | `frontend-engineering.md` | Web UI, components, a11y |
| `backend` | `backend-engineering.md` | APIs, services, app migrations |
| `data` | `data-engineering.md` | Pipelines, dbt, ETL, warehouse |
| `analytics` | `analytics-engineering.md` | EDA, SQL analytics, reports |
| `datascience` | `data-science-engineering.md` | ML experiments, features, models |

**Rule:** at most **one** layer skill per task. If task `Files` match two layers, split the task or refine globs.

Validate routing before Execute:

```bash
python3 .specs/harness/scripts/validate_layer_routing.py demo-login
# or after install in this repo:
npm run demo:validate
```

## Scope

| Works well | Limited |
| --- | --- |
| Web fullstack + data/analytics/ML monorepos | Mobile native, CLI-only, embedded |
| Monorepos with configurable globs in `PROJECT.md` | Framework tutorials (agent uses codebase + docs) |
| FE-only, BE-only, or data-only projects | Projects without harness installed |

## Knowledge vs manual

| Who | Role |
| --- | --- |
| Harness | SDD process, gates, Verify, Knowledge Verification Chain |
| Agent | Discover APIs, patterns, versions from code and docs |
| Layer skills | How to execute on the right layer: tests, a11y, API validation, pipelines |
| `PROJECT.md` | Where each layer lives in **your** repo |

## Token budget (chars ÷ 4)

Each layer skill stays under ~700 tokens; the routing rule under ~600. Progressive loading avoids dumping all harness sisters every turn.

## Demo features

Spec-only demos (no application code in this repo). CI runs `npm run demo:validate` against both:

| Feature | Tasks | Layers |
| --- | --- | --- |
| `.specs/features/demo-login/` | T1, T2 | frontend, backend |
| `.specs/features/demo-data-routing/` | T1, T2, T3 | data, analytics, datascience |

## Releases

Publishing is automated via GitHub Actions (`.github/workflows/publish.yml`).

| Trigger | When to use |
| --- | --- |
| **Actions → Publish to npm → Run workflow → `none`** | Publish the current `package.json` version |
| **Run workflow → `patch` / `minor` / `major`** | Bump version, publish, push tag to `main` |
| **GitHub Release published** | Publishes the version in `package.json` at release time |

Requires repository secret **`NPM_TOKEN`** (npm automation token with write access to `@luizsantiago/*`).

**Important:** the token must be an **Automation** or **Granular** token with **Bypass 2FA for automation** enabled. Classic tokens with 2FA will fail in CI with `npm error code EOTP`.

Compatible with `@luizsantiago/agentic-harness` **0.7.x** (optional npm peer; required for harness gates and a passing `doctor`).

## Development

Clone, install once (links the local CLI so `npx` works in this repo), then use the same commands as end users:

```bash
npm install
npm test
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack install --sync-registry   # refresh registry table only
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate
```

Run `npm install` first in this repo: `prepare` links `node_modules/.bin/agentic-fullstack` so `npx` resolves the local package. Without that step you get `agentic-fullstack: not found`.

## Compatibility

- Requires `@luizsantiago/agentic-harness` 0.7.x for gates and a passing `doctor` (optional npm peer; use `install --force` for layer skills only)
- Node.js 18+
- Python 3.10+ recommended (harness gates + layer routing gate)

## License

MIT
