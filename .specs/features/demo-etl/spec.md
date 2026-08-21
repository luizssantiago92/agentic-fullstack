# Demo ETL

Minimal demo feature illustrating the **data** Floor (dbt / pipeline paths).

## Requirements

### REQ-001: Daily active users model
The pipeline SHALL materialize a daily active users table from raw events.

- WHEN the dbt model runs THEN rows MUST aggregate unique users per day.
- WHEN source events are empty THEN the model MUST succeed with zero rows.

## Assumptions

- Spec-only; no warehouse or dbt project ships in this repository.

## Out of Scope

- Production scheduling, warehouse credentials, incremental strategies beyond the demo task.
