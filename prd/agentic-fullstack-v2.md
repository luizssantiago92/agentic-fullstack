# PRD: Agentic Fullstack v2

## Summary

Extend `@luizsantiago/fullstack-floor-map` with CLI registry sync, three data sister skills (engineering, analytics, data science), layer routing gate, and spec-only demo validation — without breaking v1 FE/BE routing or harness coexistence.

## Shipped in 0.2.3

v2 shipped as a single npm release (**0.2.3**) rather than incremental 0.1.6 → 0.2.3 publishes. Functionally complete for Fases 1–7.

Documented deviations from the original incremental plan:

- **Monolithic release:** one PR/version instead of one PR per phase.
- **Datascience globs:** `experiments/**`, `ml/**`, `models/**`, `training/**` — not a catch-all `**/*.ipynb` (training notebooks belong under those prefixes so they do not steal analytics explore notebooks).
- **Fase 8 (example app code):** not shipped. Demo remains spec/tasks only (`demo-login`); routing for other layers is covered by gate unit tests.

## Goals

- Single source of truth for layer registry (`DEFAULT_LAYERS` → generated `PROJECT.md`)
- Opt-in `--sync-registry` for existing projects
- Ship `data-engineering`, `analytics-engineering`, `data-science-engineering` as separate manuals under the skill token cap (`<2800` chars÷4)
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

- [x] `install` creates `PROJECT.md` from `renderProjectTemplate(DEFAULT_LAYERS)`
- [x] `install --sync-registry` updates only § Layer registry
- [x] Doctor logs glob drift warning (non-blocking)

### Fase 2 — PRD

- [x] This document in `prd/`

### Fase 3 — FE/BE

- [x] Task shape tables added; token budget tests pass

### Fase 4–6 — Data skills

- [x] Three new skills in `SKILL_ASSETS`
- [x] Backend default globs narrowed (app migrations only)
- [x] Rule lists all extension-owned assets

### Fase 7 — Gate

- [x] `validate_layer_routing.py` installed to `.specs/seatbelt/scripts/` (Seatbelt 2.2+)
- [x] Doctor checks `layer_gate_missing`
- [x] `npm run demo:validate` exits 0 on demo-login

### Fase 8 — Demo

- [x] Spec-only demo retained; CI runs layer gate (no example app code)

## Token budget

Each layer skill: `<2800` chars/4 (~700 tokens target, 2800 hard cap). Rule: `<600` chars/4.

## Compatibility

- Requires `@luizsantiago/spec-seatbelt` >=2.2.0 for full doctor + Seatbelt gates
- Extension gate installs to `.specs/seatbelt/scripts/` (legacy `.specs/harness/scripts/` still resolved)
- Extension gate requires Python 3 and Seatbelt `_common.py` (installed with Seatbelt)
- Specialist catalog adapted from jeffallan/claude-skills (MIT) — see NOTICE / docs/guide/credits.md
