# Demo ETL — Tasks

### T1: Add daily active users dbt model
- **Requirement**: REQ-001
- **Files**: dbt/models/marts/daily_active_users.sql
- **Depends on**: —
- **Tests**: dbt/tests/assert_daily_active_users.sql
- **Gate**: echo ok
- **Done when**: Model aggregates unique users per day per REQ-001
- [ ] complete

## Test Coverage Matrix

| Requirement | Task | Tests | Notes |
| --- | --- | --- | --- |
| REQ-001 | T1 | dbt/tests/assert_daily_active_users.sql | empty + happy path |

## Gate Check Commands

| Level | Command |
| --- | --- |
| Task T1 | echo ok |
| Feature | echo ok |
