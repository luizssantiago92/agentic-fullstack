# Five floors

Lean Execute manuals (not framework tutorials). Agent discovers APIs from **your** repo.

| Layer id | Skill | Typical paths |
| --- | --- | --- |
| `frontend` | `frontend-engineering.md` | `apps/web/**`, `**/*.tsx` |
| `backend` | `backend-engineering.md` | `apps/api/**`, `backend/**` |
| `data` | `data-engineering.md` | `dbt/**`, `**/etl/**`, `warehouse/**` |
| `analytics` | `analytics-engineering.md` | `analytics/**`, `notebooks/explore/**` |
| `datascience` | `data-science-engineering.md` | `experiments/**`, `ml/**`, `training/**` |

Token budget: each skill `<2800` chars÷4; routing rule `<600`.

When **not** to load a floor skill: Verify; Files span two layers (STOP); paths match zero layers (standards only).
