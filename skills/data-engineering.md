---
name: data-engineering
description: Layer sister skill for data pipeline Execute work. Load when task Files match data globs in .specs/project/PROJECT.md. Application manual for dbt, ETL, warehouse, batch quality — agent discovers stack from codebase and docs.
---

# Data Engineering

Lean application manual for **data pipeline** tasks during Execute. Complements `engineering-standards.md` — does not replace harness gates.

**Token rule.** Load only when task `Files` match the **data** layer in `PROJECT.md` § Layer registry. Drop after commit. Never load with another layer skill in the same turn.

## When to Use

Load when task `Files` match **data** globs in `PROJECT.md` (defaults: `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**`).

## When NOT to Use

- App API routes or ORM migrations under `apps/api/**` — use `backend-engineering.md`
- EDA notebooks or BI reports — use `analytics-engineering.md`
- ML training experiments — use `data-science-engineering.md`
- Task spans two layers — **STOP**; split task per `fullstack-layer.mdc`

## Knowledge vs manual

| Agent discovers | This skill applies |
| --- | --- |
| dbt/Airflow/Spark APIs from repo + docs | Idempotent runs, data tests, schema change discipline, PII handling in logs |
| Source/target schemas | Never invent columns — log unknowns in `STATE.md` |

## Procedure

### 1. Discover test command

Read `PROJECT.md` § Test commands (data) and task `Gate`. Prefer narrowest (`dbt test -s model`, pipeline unit test).

### 2. Test first (RED)

- Assert row counts, keys, null rates, or business rules from spec — not just "job runs"
- Add or extend data quality tests before changing transforms

### 3. Implement (smallest change)

- **Idempotent** batch jobs where spec requires; document backfills
- **Schema changes:** one direction per task; no unrelated model refactors
- **PII:** mask or hash in logs and non-prod fixtures

### 4. Gate and commit

Run task `Gate`. Pass Adequacy A–D from `references/implement.md`. Drop this skill after commit.

## Verify hook

PII, cross-system trust, or production pipeline promotion → defer to `security-review.md` on `/verify`.

## Output (optional)

`Data skill: skipped — [reason]`

## Related

- `agent-architecture.md`, `references/implement.md`, `engineering-standards.md`
- `.specs/project/PROJECT.md`
