---
name: frontend-engineering
description: Layer sister skill for frontend Execute work. Load when task Files match frontend globs in .specs/project/PROJECT.md. Application manual only — agent discovers framework knowledge from codebase, docs, and MCP. Triggers on React, Next, UI, components, tsx, jsx, vue, svelte paths.
---

# Frontend Engineering

Lean application manual for **frontend** tasks during Execute. Complements `engineering-standards.md` — does not replace harness gates or the Knowledge Verification Chain in `agent-architecture.md`.

**Token rule.** Load only when the current task's `Files` match a **frontend** layer in `PROJECT.md` § Layer registry. Drop this file from the working set after the task commit. Never load with `backend-engineering.md` in the same turn.

## When to Use

Load during **Execute** when the current task's `Files` match the **frontend** globs in `.specs/project/PROJECT.md` (defaults: `apps/web/**`, `frontend/**`, `**/*.tsx`, `**/*.jsx`, `**/*.vue`, `**/*.svelte`).

## When NOT to Use

- Backend-only tasks (API, migrations, server handlers) — record: `Frontend skill: skipped — backend-only task`
- Verify phase — use `qa-strategy.md` for multi-step UI walkthrough, not this skill
- Task `Files` span frontend **and** backend — **STOP**; split the task or amend `tasks.md` per `fullstack-layer.mdc`

## Knowledge vs manual

| Agent discovers (harness chain) | This skill applies |
| --- | --- |
| Component APIs, hooks, router, styling system from codebase + docs + MCP | Which test command to run, a11y minimum, spec UI states, surgical diff rules |
| Framework syntax and version-specific behavior | Never invent APIs — if unknown, stop and log in `STATE.md` |

## Procedure

### 1. Discover test command

Read `PROJECT.md` § Test commands (frontend) and the task `Gate` field. Prefer the **narrowest** command (single package, single test file). Do not assume root `npm test` unless `PROJECT.md` says so.

### 2. Test first (RED)

- Derive the test from the spec acceptance criterion and task `Done when`
- Assert **user-visible behavior** (text, state, navigation, disabled/enabled) — not implementation details unless the spec requires them
- Cover loading, empty, and error states when the spec constrains them

### 3. Implement (smallest change)

- Follow existing component and styling conventions in the codebase
- **Accessibility minimum:** interactive controls have accessible names; focus order is not broken; images have alt when they convey information
- **Surgical UI:** no drive-by visual refactors, renames, or layout changes outside the task `Files` and `Done when`

### 4. Gate and commit

Run the task `Gate` command. Pass Adequacy A–D from `references/implement.md` before commit. Drop this skill from context after commit.

## Verify hook

If the feature is Complex or has a multi-step user-facing flow, defer walkthrough depth to `qa-strategy.md` during `/verify` — do not duplicate Interactive UAT here.

## Output (optional note in commit body or STATE)

One line when skipped: `Frontend skill: skipped — [reason]`

## Related

- `agent-architecture.md` — SDD hub, gates, Knowledge Verification Chain
- `references/implement.md` — per-task cycle, Adequacy A–D
- `engineering-standards.md` — secure coding, git, artifact language
- `qa-strategy.md` — conditional QA on Verify
- `.specs/project/PROJECT.md` — layer globs and test commands
