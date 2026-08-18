# Demo Data Routing — Tasks

### T1: Add staging events dbt model
- **Requirement**: REQ-001
- **Files**: dbt/models/staging/stg_events.sql
- **Depends on**: —
- **Tests**: dbt/tests/staging/stg_events.yml
- **Gate**: dbt test --select stg_events
- **Done when**: stg_events selects typed event_id and occurred_at and drops null event_id per REQ-001
- [ ] complete

### T2: Add daily active users report query
- **Requirement**: REQ-002
- **Files**: analytics/reports/daily_active_users.sql
- **Depends on**: T1
- **Tests**: analytics/reports/daily_active_users.test.sql
- **Gate**: pytest analytics/reports
- **Done when**: query returns one row per day with dau and omits empty days per REQ-002
- [ ] complete

### T3: Train baseline churn experiment
- **Requirement**: REQ-003
- **Files**: experiments/churn_baseline/train.py
- **Depends on**: —
- **Tests**: experiments/churn_baseline/test_train.py
- **Gate**: pytest experiments/churn_baseline
- **Done when**: train writes metrics.json with accuracy and seed; same seed is reproducible per REQ-003
- [ ] complete

## Test Coverage Matrix

| Requirement | Task | Tests | Notes |
| --- | --- | --- | --- |
| REQ-001 | T1 | dbt/tests/staging/stg_events.yml | typed columns + drop null ids |
| REQ-002 | T2 | analytics/reports/daily_active_users.test.sql | one row per day, no zero-fill |
| REQ-003 | T3 | experiments/churn_baseline/test_train.py | metrics + seed |

## Gate Check Commands

| Level | Command |
| --- | --- |
| Task T1 | dbt test --select stg_events |
| Task T2 | pytest analytics/reports |
| Task T3 | pytest experiments/churn_baseline |
| Feature | python3 .specs/harness/scripts/validate_layer_routing.py demo-data-routing |
