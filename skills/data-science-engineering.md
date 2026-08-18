---
name: data-science-engineering
description: Layer sister skill for data science Execute work. Load when task Files match datascience globs in .specs/project/PROJECT.md. Application manual for ML experiments, training, evaluation — not dbt pipelines or BI dashboards.
---

# Data Science Engineering

Lean application manual for **data science / ML experiment** tasks during Execute. Complements `engineering-standards.md`.

**Token rule.** Load only when task `Files` match the **datascience** layer in `PROJECT.md`. Drop after commit. One layer skill per turn.

## When to Use

Load when task `Files` match **datascience** globs (defaults: `experiments/**`, `ml/**`, `models/**`, `training/**`, `notebooks/training/**`). Explore notebooks stay on **analytics** (`notebooks/explore/**`).

## When NOT to Use

- dbt/warehouse pipelines — `data-engineering.md`
- EDA or static reports — `analytics-engineering.md`
- Production API serving models — often `backend-engineering.md`; split tasks if both
- Cross-layer task — **STOP**; split per `fullstack-layer.mdc`

## Knowledge vs manual

| Agent discovers | This skill applies |
| --- | --- |
| Framework APIs, feature store, metrics from repo | Reproducible splits, seeds, evaluation protocol, artifact versioning |
| Data access patterns | No training on test holdout; document leakage checks |

## Procedure

### 1. Discover test command

Read `PROJECT.md` § Test commands (datascience) and task `Gate` (pytest metric threshold, eval script).

### 2. Test first (RED)

- Fix seed / data split per spec; test metric improves or meets threshold in test harness
- Fail loudly on shape mismatches and NaN metrics

### 3. Implement (smallest change)

- **Reproducibility:** record seed, data version, hyperparams in code or run config
- **Evaluation:** match spec metric; no cherry-picked subsets
- **Artifacts:** save model/checkpoint paths predictable; no huge binaries in git unless project policy allows

### 4. Gate and commit

Run task `Gate`. Adequacy A–D. Drop skill after commit.

## Verify hook

Production model deployment, PII features, or adversarial inputs → `security-review.md` / `appsec.md` on `/verify`.

## Output (optional)

`Data science skill: skipped — [reason]`

## Related

- `agent-architecture.md`, `references/implement.md`, `engineering-standards.md`
- `.specs/project/PROJECT.md`
