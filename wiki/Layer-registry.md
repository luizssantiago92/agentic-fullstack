# Layer registry

The map is not “on npm”. It lives in **your** repo: `.specs/project/PROJECT.md`, **Layer registry** section. That is what the agent and the gate read.

On first install the file is created. After that it is **not overwritten** — your stack and test commands stay yours. To pull only the layer table from a newer package version:

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

## Default map

| Floor | Where it usually lives |
| --- | --- |
| frontend | `apps/web/**`, `frontend/**`, `tsx` / `jsx` / `vue` / `svelte` files |
| backend | `apps/api/**`, `backend/**`, routes and *app* migrations |
| data | `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**` |
| analytics | `analytics/**`, `reports/**`, `**/sql/analytics/**`, `notebooks/explore/**` |
| datascience | `experiments/**`, `ml/**`, `models/**`, `training/**`, `notebooks/training/**` |

Edit the rows if your monorepo is different. If the app lives under `src/app`, `src/pages`, or `packages/web`, add those globs to the matching layer — do not add extra always-on `**/*` globs. Globs that overlap on purpose (two floors on the same path) make the gate fail — that is the product protecting the turn.

## Details that avoid surprises

- **API** migrations stay on backend, not a global `**/migrations/**` (so they do not steal dbt).
- An **explore** notebook is analytics; a **training** notebook is datascience.
- A `.tsx` under `apps/api/` counts as **backend** (path prefix beats the extension glob). Requires package **0.3.2+**.

Future floors (mobile, CLI, embedded) are not in the package: that would be a new skill plus a new table row.
