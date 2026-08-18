# Layer skills

Five **sister** manuals. Load **at most one** per Execute task. They complement `engineering-standards.md`; they do not replace harness gates or the Knowledge Verification Chain.

| Layer id | Skill file | Use for | Do not use for |
| --- | --- | --- | --- |
| `frontend` | `frontend-engineering.md` | UI, components, a11y, client tests | API/migrations, pipelines, ML |
| `backend` | `backend-engineering.md` | APIs, services, **app** migrations under `apps/api/**` or `backend/**` | dbt/ETL, EDA, model training |
| `data` | `data-engineering.md` | dbt, ETL, warehouse, batch quality | Explore notebooks, ML training, app ORM migrations |
| `analytics` | `analytics-engineering.md` | EDA, SQL analytics, reports, `notebooks/explore/**` | Production pipelines, MLOps training |
| `datascience` | `data-science-engineering.md` | Experiments, features, training, eval artifacts, `notebooks/training/**` | dbt/warehouse, BI dashboards |

## Knowledge vs manual

| Who | Role |
| --- | --- |
| Harness | SDD process, gates, Verify |
| Agent | Discover APIs, patterns, versions from code and docs |
| Layer skill | How to execute on that layer (narrow test command, spec states, surgical diff) |
| `PROJECT.md` | Where each layer lives **in your repo** |

After the task commit, **drop** the layer skill from context before the next task.

On **/verify**, do **not** load layer skills. Use harness Verify (`validate.md`, `security-review.md`, then at most one of `appsec.md` or `qa-strategy.md`).

## Token budget

Hard cap in tests: each skill `< 2800` chars÷4; rule `< 600` chars÷4. Skills are kept lean so Execute does not dump every harness sister every turn.

See [Routing](Routing) for STOP rules and [Layer registry](Layer-registry) for globs.
