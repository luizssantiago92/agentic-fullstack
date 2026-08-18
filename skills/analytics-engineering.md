---
name: analytics-engineering
description: Layer sister skill for analytics Execute work. Load when task Files match analytics globs in .specs/project/PROJECT.md. Application manual for EDA, SQL analytics, dashboards, reports — not ML training.
---

# Analytics Engineering

Lean application manual for **data analysis** tasks during Execute. Complements `engineering-standards.md`.

**Token rule.** Load only when task `Files` match the **analytics** layer in `PROJECT.md`. Drop after commit. One layer skill per turn.

## When to Use

Load when task `Files` match **analytics** globs (defaults: `analytics/**`, `reports/**`, `**/sql/analytics/**`, `notebooks/explore/**`).

## When NOT to Use

- Production ETL/dbt pipelines — `data-engineering.md`
- Model training / experiment tracking — `data-science-engineering.md`
- App UI or API — frontend/backend skills
- Cross-layer task — **STOP**; split per `fullstack-layer.mdc`

## Knowledge vs manual

| Agent discovers | This skill applies |
| --- | --- |
| SQL dialect, BI tool, notebook env from repo | Reproducible queries, metric definitions, sensible aggregations, export safety |
| Source tables | Do not invent metrics — align with spec acceptance criteria |

## Procedure

### 1. Discover test command

Read `PROJECT.md` § Test commands (analytics) and task `Gate` (SQL snapshot test, notebook smoke, report diff).

### 2. Test first (RED)

- Encode expected metric values, filters, or chartable states from spec
- Snapshot SQL or golden CSV when project already uses that pattern

### 3. Implement (smallest change)

- **Reproducible:** pinned filters, documented date ranges, no hidden manual steps
- **Readable:** name CTEs and metrics; avoid SELECT * in committed artifacts
- **Safe exports:** no raw PII in report outputs unless spec requires controls

### 4. Gate and commit

Run task `Gate`. Adequacy A–D. Drop skill after commit.

## Verify hook

External-facing dashboards or regulated metrics → `security-review.md` on `/verify` if PII/compliance applies.

## Output (optional)

`Analytics skill: skipped — [reason]`

## Related

- `agent-architecture.md`, `references/implement.md`, `engineering-standards.md`
- `.specs/project/PROJECT.md`
