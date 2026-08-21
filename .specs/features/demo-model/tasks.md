# Demo Model — Tasks

### T1: Add churn training script
- **Requirement**: REQ-001
- **Files**: ml/training/train_churn.py
- **Depends on**: —
- **Tests**: ml/tests/test_train_churn.py
- **Gate**: echo ok
- **Done when**: Training writes metrics and handles small datasets per REQ-001
- [ ] complete

## Test Coverage Matrix

| Requirement | Task | Tests | Notes |
| --- | --- | --- | --- |
| REQ-001 | T1 | ml/tests/test_train_churn.py | metrics + min-size error |

## Gate Check Commands

| Level | Command |
| --- | --- |
| Task T1 | echo ok |
| Feature | echo ok |
