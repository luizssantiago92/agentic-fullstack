---
name: backend-engineering
description: Layer sister skill for backend Execute work. Load when task Files match backend globs in .specs/project/PROJECT.md. Application manual only — agent discovers framework knowledge from codebase, docs, and MCP. Triggers on API, routes, handlers, migrations, server paths.
---

# Backend Engineering

Lean application manual for **backend** tasks during Execute. Complements `engineering-standards.md` — does not replace harness gates or the Knowledge Verification Chain in `agent-architecture.md`.

**Token rule.** Load only when the current task's `Files` match a **backend** layer in `PROJECT.md` § Layer registry. Drop this file from the working set after the task commit. Never load with `frontend-engineering.md` in the same turn.

## When to Use

Load during **Execute** when the current task's `Files` match the **backend** globs in `.specs/project/PROJECT.md` (defaults: `apps/api/**`, `backend/**`, `apps/api/**/routes/**`, `**/migrations/**`).

## When NOT to Use

- Frontend-only tasks (components, pages, styles) — record: `Backend skill: skipped — frontend-only task`
- Verify OWASP depth — use `security-review.md` always; use `appsec.md` when attack surface triggers fire
- Task `Files` span frontend **and** backend — **STOP**; split the task or amend `tasks.md` per `fullstack-layer.mdc`

## Knowledge vs manual

| Agent discovers (harness chain) | This skill applies |
| --- | --- |
| ORM, router, middleware, queue APIs from codebase + docs + MCP | Input validation, authZ fail-closed, migration discipline, integration test runner |
| Service boundaries and existing patterns | Never invent endpoints or schemas — if unknown, stop and log in `STATE.md` |

## Procedure

### 1. Discover test command

Read `PROJECT.md` § Test commands (backend) and the task `Gate` field. Prefer integration or API tests that assert spec outcomes. Do not assume root `npm test` unless `PROJECT.md` says so.

### 2. Test first (RED)

- Derive tests from acceptance criteria (status codes, error shapes, persistence, idempotency when spec requires)
- Use parameterized queries / ORM safe patterns — never string-concat SQL
- Mock external services at boundaries; keep domain logic testable

### 3. Implement (smallest change)

- **Validate all inputs** at the boundary; reject with stable error shapes
- **AuthZ fail-closed** — deny by default; no permissive fallbacks on errors
- **Writes:** idempotent where the spec requires; document side effects in code only when non-obvious
- **Migrations:** one direction per task when applicable; reversible only when spec or project policy requires; no schema drive-by
- **Logs:** structured where supported; no secrets, tokens, or raw PII

### 4. Gate and commit

Run the task `Gate` command. Pass Adequacy A–D from `references/implement.md` before commit. Drop this skill from context after commit.

## Verify hook

When the feature touches auth, payments, PII, secrets, uploads, or network trust boundaries, defer depth to `appsec.md` during `/verify` (after `security-review.md`) — do not duplicate OWASP here.

## Output (optional note in commit body or STATE)

One line when skipped: `Backend skill: skipped — [reason]`

## Related

- `agent-architecture.md` — SDD hub, gates, Knowledge Verification Chain
- `references/implement.md` — per-task cycle, Adequacy A–D
- `engineering-standards.md` — secure coding, git, artifact language
- `security-review.md` — OWASP checklist on Verify
- `appsec.md` — conditional AppSec on Verify
- `.specs/project/PROJECT.md` — layer globs and test commands
