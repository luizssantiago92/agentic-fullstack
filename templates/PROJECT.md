# Project Configuration

Configure stack, layer globs, and test commands for your repository. The agent reads this file during Execute to route layer sister skills.

## Stack

Describe your stack in one short paragraph (frameworks, monorepo layout, package manager). Example:

- Frontend: React 19 + Vite in `apps/web`
- Backend: Fastify + Prisma in `apps/api`
- Package manager: pnpm workspaces

## Layer registry

One layer skill per row. Task `Files` must match **at most one** layer per task.

Keep the **feature** vertical (one user path). Split **tasks** by layer — mixed `apps/web` + `apps/api` in one `Files` list fails the layer gate.

| Layer id | Skill file | Path globs (match any) |
| --- | --- | --- |
| frontend | `frontend-engineering.md` | `apps/web/**`, `frontend/**`, `**/*.tsx`, `**/*.jsx`, `**/*.vue`, `**/*.svelte` |
| backend | `backend-engineering.md` | `apps/api/**`, `backend/**`, `apps/api/**/routes/**`, `apps/api/**/migrations/**`, `backend/**/migrations/**` |
| data | `data-engineering.md` | `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**` |
| analytics | `analytics-engineering.md` | `analytics/**`, `reports/**`, `**/sql/analytics/**`, `notebooks/explore/**` |
| datascience | `data-science-engineering.md` | `experiments/**`, `ml/**`, `models/**`, `training/**`, `notebooks/training/**` |

Future layers (not shipped by default): add a row + install `{layer}-engineering.md` — e.g. `mobile`, `cli`, `embedded`.

If the app is not under `apps/web` / `apps/api`, add globs such as `src/app/**`, `src/pages/**`, or `packages/web/**` to the matching layer. Do not add extra always-on `**/*` globs.

## Test commands

Discover from this section before each task. Prefer the narrowest command the task `Gate` names.

| Scope | Command | Notes |
| --- | --- | --- |
| frontend | `pnpm --filter web test` | Adjust to your workspace |
| backend | `pnpm --filter api test` | Integration/API tests |
| data | `dbt test` or project pipeline test command | Data quality / transforms |
| analytics | `pytest analytics/` or notebook smoke | Reports / EDA |
| datascience | `pytest ml/` or experiment runner | Model training / evaluation |
| full | `pnpm test` | Run before closing Execute |

## Lint commands

| Scope | Command |
| --- | --- |
| frontend | `pnpm --filter web lint` |
| backend | `pnpm --filter api lint` |
| data | configure per stack (sqlfluff / dbt) |
| analytics | configure per stack |
| datascience | configure per stack (ruff / pytest lint) |
| full | `pnpm lint` |

## Constraints

- Artifacts remain in English (harness rule).
- Layer tasks must not share the same file in parallel (harness `validate_tasks.py`).
- When globs overlap, refine paths in this file or split tasks.
- Vertical **feature**, horizontal **tasks**: one layer per task `Files`.
