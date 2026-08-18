# Five skills

Five sister manuals. Same shape, different floors. **One per turn.**

## Frontend — `frontend-engineering.md`

**What it is for:** screens, components, accessibility, tests for what a person *sees*.

**When to load:** `Files` hit frontend globs (`apps/web/**`, `frontend/**`, `**/*.tsx`, …).

**What it asks of the agent:** the narrowest test from `PROJECT.md` / the Gate field; spec states (empty, error, loading); accessible names on controls; surgical diff.

**What it is not:** a React tutorial. Do not load it during Verify (use `qa-strategy.md` if the flow is long).

## Backend — `backend-engineering.md`

**What it is for:** HTTP, services, **app** migrations (`apps/api/**/migrations/**`).

**When to load:** API / `backend/**` paths.

**What it asks:** contract test (status and body); validate input at the boundary; authZ fail-closed; logs with no secrets.

**What it is not:** dbt or model training. Warehouse migrations live on the **data** floor.

## Data — `data-engineering.md`

**What it is for:** production pipelines, dbt, ETL, quality, warehouse.

**When to load:** `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**`.

**What it is not:** an exploration notebook (analytics) or ML `experiments/`.

## Analytics — `analytics-engineering.md`

**What it is for:** data analysis, analytic SQL, reports, EDA under `notebooks/explore/**`.

**What it is not:** deploying a batch pipeline or training a model.

## Data science — `data-science-engineering.md`

**What it is for:** experiments, seeds, splits, metrics, artifacts under `experiments/**`, `ml/**`, `training/**`, `notebooks/training/**`.

**What it is not:** a BI dashboard or dbt.

## How to choose in 10 seconds

Look at the task **Files** field. `apps/web` → frontend. `apps/api` → backend. `dbt` or `etl` → data. Ad-hoc report / explore → analytics. Training / `metrics.json` → datascience. Two floors in the same Files → **STOP** and split the task (see [How to use](How-to-use)).
