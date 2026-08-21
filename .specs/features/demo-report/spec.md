# Demo Report

Minimal demo feature illustrating the **analytics** Floor (reports / explore notebooks).

## Requirements

### REQ-001: Weekly revenue notebook
The system SHALL provide an explore notebook that summarizes weekly revenue.

- WHEN the notebook runs against sample data THEN it MUST output weekly totals.
- WHEN a week has no orders THEN that week MUST appear with zero revenue or be omitted consistently.

## Assumptions

- Spec-only; no live warehouse connection in this repository.

## Out of Scope

- BI tool dashboards, scheduled email delivery.
