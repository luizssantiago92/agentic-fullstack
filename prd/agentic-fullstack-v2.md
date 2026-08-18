# PRD: Agentic Fullstack v2

## Summary

Extend `@luizsantiago/agentic-fullstack` with CLI registry sync, three data sister skills (engineering, analytics, data science), layer routing gate, and spec-only demo validation — without breaking v1 FE/BE routing or harness coexistence.

## Goals

- Single source of truth for layer registry (`DEFAULT_LAYERS` → generated `PROJECT.md`)
- Opt-in `--sync-registry` for existing projects
- Ship `data-engineering`, `analytics-engineering`, `data-science-engineering` as separate ~900-token manuals
- Enforce at most one layer per task via `validate_layer_routing.py`
- Keep demo-login as **spec/tasks documentation**; validate routing via gate (no example app required)

## Non-goals (v2)

- Mobile, CLI, embedded layer skills
- Framework tutorials inside skills
- Overwriting user `PROJECT.md` on normal install
- Merging analytics and data science into one skill

## Layer model

| Layer id | Skill | Scope |
| --- | --- | --- |
| frontend | frontend-engineering.md | UI, components, web client |
| backend | backend-engineering.md | API, app ORM migrations under app paths |
| data | data-engineering.md | dbt, ETL, warehouse, batch pipelines |
| analytics | analytics-engineering.md | EDA, SQL analytics, reports, explore notebooks |
| datascience | data-science-engineering.md | ML experiments, training, evaluation |

**Routing rule:** one layer skill per Execute task. STOP if task `Files` match two or more layers.

## Acceptance criteria

### Fase 1 — CLI

- [ ] `install` creates `PROJECT.md` from `renderProjectTemplate(DEFAULT_LAYERS)`
- [ ] `install --sync-registry` updates only § Layer registry
- [ ] Doctor logs glob drift warning (non-blocking)

### Fase 2 — PRD

- [ ] This document in `prd/`

### Fase 3 — FE/BE

- [ ] Task shape tables added; token budget tests pass

### Fase 4–6 — Data skills

- [ ] Three new skills in `SKILL_ASSETS`
- [ ] Backend default globs narrowed (app migrations only)
- [ ] Rule lists all extension-owned assets

### Fase 7 — Gate

- [ ] `validate_layer_routing.py` installed to `.specs/harness/scripts/`
- [ ] Doctor checks `layer_gate_missing`
- [ ] `npm run demo:validate` exits 0 on demo-login

### Fase 8 — Demo

- [ ] Spec-only demo retained; CI runs layer gate (no example app code)

## Token budget

Each layer skill: `<2800` chars/4 (~700 tokens target, 2800 hard cap). Rule: `<600` chars/4.

## Compatibility

- Requires `@luizsantiago/agentic-harness` >=0.7.0 for full doctor + harness gates
- Extension gate requires Python 3 and harness `_common.py` (installed with harness)
