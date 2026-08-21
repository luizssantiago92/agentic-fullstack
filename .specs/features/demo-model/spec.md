# Demo Model

Minimal demo feature illustrating the **datascience** Floor (ml / training paths).

## Requirements

### REQ-001: Churn training entrypoint
The system SHALL expose a training script that fits a churn model and writes metrics.

- WHEN training completes THEN metrics MUST include at least accuracy or AUC.
- WHEN the dataset is below a documented minimum size THEN training MUST fail with a clear error.

## Assumptions

- Spec-only; no trained artifacts commit to this repository.

## Out of Scope

- Production model serving, feature stores, online inference.
