---
name: frontend-engineering
description: Frontend Execute manual. Load when task Files match frontend globs in PROJECT.md. Agent discovers framework APIs from the codebase.
---

# Frontend Engineering

Application manual for **frontend** Execute. Complements `engineering-standards.md`. Does not replace harness gates.

**Token rule.** Load only when task `Files` match the **frontend** layer. Drop after commit. Never load with another layer skill in the same turn.

## When to Use

Load when `Files` match frontend globs (`apps/web/**`, `frontend/**`, `**/*.tsx`, `**/*.jsx`, `**/*.vue`, `**/*.svelte`).

## Task shapes

Form/page: spec UI states + a11y names. Client state: test behavior. SSR/RSC: test at a stable page/e2e boundary. Monorepo: task `Gate` + `PROJECT.md` filter.

## When NOT to Use

- Backend-only, data, analytics, or ML paths — matching layer skill instead
- Verify — `qa-strategy.md` for multi-step UI walkthrough
- Files span two layers — **STOP**; split the task

## Knowledge vs manual

Agent discovers component APIs, hooks, router, styling. This skill applies test command, a11y minimum, spec states, surgical diffs. Never invent APIs — unknown → log in `STATE.md`.

## Procedure

1. **Test command.** `PROJECT.md` § Test commands (frontend) + task `Gate`. Prefer the narrowest command.
2. **RED.** Test from acceptance criteria / `Done when`. Assert user-visible behavior. Cover loading/empty/error when the spec constrains them.
3. **Implement.** Follow existing conventions. Controls have accessible names; no drive-by visual refactors outside `Files`.
4. **Gate.** Run `Gate`. Adequacy A–D in `references/implement.md`. Drop this skill after commit.

## Verify hook

Complex or multi-step UI → `qa-strategy.md` on `/verify`. Do not duplicate Interactive UAT here.

## Output

`Frontend skill: loaded — [task id]`
`Frontend skill: skipped — [reason]`

## Related

`agent-architecture.md`, `references/implement.md`, `engineering-standards.md`, `qa-strategy.md`, `.specs/project/PROJECT.md`
