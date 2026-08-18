# Layer registry

Source of truth for **your** repo: `.specs/project/PROJECT.md` § **Layer registry**.

Package defaults live in `DEFAULT_LAYERS` (`lib/constants.js`) and are rendered into `templates/PROJECT.md`. A **new** `PROJECT.md` is generated from that template on first install.

## Default globs (0.3.3)

| Layer | Globs (match any) |
| --- | --- |
| frontend | `apps/web/**`, `frontend/**`, `**/*.tsx`, `**/*.jsx`, `**/*.vue`, `**/*.svelte` |
| backend | `apps/api/**`, `backend/**`, `apps/api/**/routes/**`, `apps/api/**/migrations/**`, `backend/**/migrations/**` |
| data | `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**` |
| analytics | `analytics/**`, `reports/**`, `**/sql/analytics/**`, `notebooks/explore/**` |
| datascience | `experiments/**`, `ml/**`, `models/**`, `training/**`, `notebooks/training/**` |

Notes:

- App ORM migrations stay on **backend** (`apps/api/**/migrations/**`), not a catch-all `**/migrations/**`.
- Explore notebooks (`notebooks/explore/**`) are **analytics**. Training notebooks (`notebooks/training/**`) are **datascience** — not a catch-all `**/*.ipynb`.
- Nested globstars such as `**/etl/**` and `apps/api/**/migrations/**` are real globstars (not a literal prefix `**/etl`).
- If an extension glob (`**/*.tsx`) and a path prefix (`apps/api/**`) both match, the gate **prefers the longer literal prefix** (so `apps/api/**/*.tsx` routes to **backend**).

## Updating an existing project

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

This replaces **only** the Layer registry section. Customize rows after sync if your layout differs.

Normal `install` **never** overwrites an existing `PROJECT.md`.

## Future layers

Not shipped: `mobile`, `cli`, `embedded`. Add a registry row **and** a `{layer}-engineering.md` skill; this package will not recognize unknown skill filenames in doctor (`registry_unknown_skill`).
