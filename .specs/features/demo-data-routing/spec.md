# Demo Data Routing

Minimal spec-only demo illustrating data / analytics / data-science task split for layer sister skills.

## Requirements

### REQ-001: Staging events model
The warehouse SHALL expose a staging model that selects raw events into a typed table.

- WHEN dbt runs THEN `stg_events` MUST exist with `event_id` and `occurred_at`.
- WHEN a source row is missing `event_id` THEN the model MUST drop that row.

### REQ-002: Daily active report
The analytics layer SHALL compute daily active users from the staging events model.

- WHEN the report query runs THEN it MUST return one row per calendar day with `dau`.
- WHEN a day has no events THEN that day MUST be omitted (no zero-fill).

### REQ-003: Baseline churn experiment
The data-science layer SHALL train a baseline churn classifier and persist evaluation metrics.

- WHEN training finishes THEN `metrics.json` MUST contain `accuracy` and `seed`.
- WHEN the same seed is reused THEN reported accuracy MUST match the previous run.

## Assumptions

- Demo-only specs; no application or pipeline code in this repository.
- Paths follow `.specs/project/PROJECT.md` layer globs (`dbt/**`, `analytics/**`, `experiments/**`).

## Out of Scope

- Production warehouse, BI dashboards, model serving, MLOps deploy.
