# Project Configuration

Configure stack, layer globs, and test commands for your repository. The agent reads this file during Execute to route layer sister skills.

## Stack

Describe your stack in one short paragraph (frameworks, monorepo layout, package manager). Example:

- Frontend: React 19 + Vite in `apps/web`
- Backend: Fastify + Prisma in `apps/api`
- Package manager: pnpm workspaces

## Layer registry

One layer skill per row. Task `Files` must match **at most one** layer per task.

| Layer id | Skill file | Path globs (match any) |
| --- | --- | --- |
| frontend | `frontend-engineering.md` | `apps/web/**`, `frontend/**`, `**/*.tsx`, `**/*.jsx`, `**/*.vue`, `**/*.svelte` |
| backend | `backend-engineering.md` | `apps/api/**`, `backend/**`, `**/routes/**`, `**/handlers/**`, `**/migrations/**` |

Future layers (not in v1): add a row + install `{layer}-engineering.md` — e.g. `mobile`, `cli`, `data`, `embedded`.

## Test commands

Discover from this section before each task. Prefer the narrowest command the task `Gate` names.

| Scope | Command | Notes |
| --- | --- | --- |
| frontend | `pnpm --filter web test` | Adjust to your workspace |
| backend | `pnpm --filter api test` | Integration/API tests |
| full | `pnpm test` | Run before closing Execute |

## Lint commands

| Scope | Command |
| --- | --- |
| frontend | `pnpm --filter web lint` |
| backend | `pnpm --filter api lint` |
| full | `pnpm lint` |

## Constraints

- Artifacts remain in English (harness rule).
- Layer tasks must not share the same file in parallel (harness `validate_tasks.py`).
- When globs overlap, refine paths in this file or split tasks.
