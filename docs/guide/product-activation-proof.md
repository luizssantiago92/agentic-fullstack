# Product activation proof

Prove that Floor Map brings a **specialist into context** on a real product repo — not only that files exist on disk.

This is a **manual** checklist for an agent session. Automated smoke (`npm run demo:local`) only scores trigger/description routing.

## Setup (separate product repo)

```bash
mkdir my-demo-site && cd my-demo-site
git init
# optional: scaffold a minimal apps/web + apps/api layout matching PROJECT.md globs

npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
# to test a local Floor Map checkout instead of npm:
#   npm install /path/to/fullstack-floor-map
#   npx fullstack-floor-map install

npx @luizsantiago/fullstack-floor-map doctor
# expect: All checks passed + Specialist catalog: 67 skills
```

Confirm on disk:

- `.cursor/skills/frontend-engineering.md`
- `.cursor/skills/react-expert/SKILL.md`
- `.cursor/rules/fullstack-layer.mdc`

## Spec a single frontend task

Copy or write a feature under `.specs/features/demo-login/` with a task whose **Files** match the frontend Floor only, for example:

`apps/web/src/components/LoginForm.tsx`

Then:

```bash
npx @luizsantiago/fullstack-floor-map validate-layers demo-login
# expect: T1 → layer frontend
```

## Execute checklist

In Cursor (or Claude), run an Execute-style turn for that task. Pass criteria:

| # | Check | Pass? |
| --- | --- | --- |
| 1 | Agent (or you) load Seatbelt implement + `engineering-standards` | |
| 2 | Loads **exactly one** Floor manual: `frontend-engineering.md` | |
| 3 | Loads **at most one** specialist, e.g. `react-expert` | |
| 4 | Opens **≤2** files under `react-expert/references/` | |
| 5 | Does **not** also load `backend-engineering` or a second specialist | |

If step 3 fails: the catalog is installed but not selected — tighten the prompt (“use the react-expert skill”) or confirm `description` triggers match the stack. That is an activation issue, not a missing file.

## Verify checklist

Ask for `/verify` on the same feature.

| # | Check | Pass? |
| --- | --- | --- |
| 1 | No `*-engineering.md` Floor manuals loaded | |
| 2 | No `catalog/*/SKILL.md` (including `test-master`, `security-reviewer`) | |
| 3 | Seatbelt Verify sisters only | |

## Related

- [Demo](Demo.md) — automated gates + specialist smoke in this package  
- [specialist-catalog.md](specialist-catalog.md) — install ≠ load  
- [demo/playbook.md](../../demo/playbook.md) — prompts for the local sandbox  
