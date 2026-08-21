---
name: backend-engineering
description: Backend Execute manual. Load when task Files match backend globs in PROJECT.md. Agent discovers framework APIs from the codebase.
---

# Backend Engineering

Application manual for **backend** Execute. Complements `engineering-standards.md`. Does not replace Seatbelt gates.

**Token rule.** Load only when task `Files` match the **backend** layer. Drop after commit. Never load with another layer skill in the same turn.

## When to Use

Load when `Files` match backend globs (`apps/api/**`, `backend/**`, `apps/api/**/routes/**`, `apps/api/**/migrations/**`, `backend/**/migrations/**`).

## Task shapes

New route: contract test for status/body; validate at the boundary. App migration: one per task; reversible only when the spec requires. Monorepo: task `Gate` + `PROJECT.md` filter.

## When NOT to Use

- Frontend-only, dbt, analytics, or ML experiment paths — matching layer skill instead
- Verify OWASP depth — `security-review.md`; `appsec.md` when attack-surface triggers fire
- Files span two layers — **STOP**; split the task

## Knowledge vs manual

Agent discovers ORM, router, middleware. This skill applies input validation, authZ fail-closed, migration discipline, integration tests. Never invent endpoints — unknown → log in `STATE.md`.

## Procedure

1. **Test command.** `PROJECT.md` § Test commands (backend) + task `Gate`. Prefer API/integration tests.
2. **RED.** Tests from acceptance criteria (status, error shape, persistence). ORM/parameterized queries only. Mock externals at boundaries.
3. **Implement.** Validate inputs; deny by default; one migration per task; structured logs with no secrets/PII.
4. **Gate.** Run `Gate`. Adequacy A–D. Drop this skill after commit.

## Verify hook

Auth, payments, PII, secrets, uploads, or trust boundaries → `appsec.md` on `/verify` after `security-review.md`.

## Output

`Backend skill: loaded — [task id]`
`Backend skill: skipped — [reason]`

## Related

`agent-architecture.md`, `references/implement.md`, `engineering-standards.md`, `security-review.md`, `appsec.md`, `.specs/project/PROJECT.md`
