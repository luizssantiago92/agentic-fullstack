# Layer routing gate

Script: `.specs/harness/scripts/validate_layer_routing.py` (copied from `gates/` on install).

```bash
python3 .specs/harness/scripts/validate_layer_routing.py demo-login
python3 .specs/harness/scripts/validate_layer_routing.py .specs/features/demo-login/tasks.md
```

In this git repo: `npm run demo:validate` (runs the gate on [Demo](Demo) `demo-login` only).

## Contract

| Situation | Result |
| --- | --- |
| Task `Files` match **one** layer | PASS (`ok` line with layer id) |
| Task `Files` match **two or more** layers | **FAIL** (exit 1) |
| Task `Files` match **zero** layers | PASS with **warn** (refine globs or `PROJECT.md`) |
| Missing `PROJECT.md` or empty registry | FAIL |
| Missing `tasks.md` | Exit **2** (usage) |

When two layers would match the **same file**, the matcher keeps the layer whose glob has the **longest literal prefix** (extension globs like `**/*.tsx` lose to `apps/api/**`). Remaining true overlaps still FAIL.

## Harness `_common.py`

If the harness is installed, the gate uses harness `Report` / `resolve_artifact`. Without it, a small fallback Report is used (same PASS/FAIL/warn shape).

## Tests

`test/gate.test.js` covers happy path, multi-layer fail, zero-layer warn, nested globstars, and path-vs-extension preference. That is the regression suite — not extra demo apps.
