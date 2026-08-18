# Layer routing gate

A deliberately picky tool: it reads each task **Files** list and the map in `PROJECT.md`. It is the traffic light before Execute.

```bash
python3 .specs/harness/scripts/validate_layer_routing.py my-feature
```

In this package repository:

```bash
npm run demo:validate
```

(that only runs the [Demo](Demo) spec.)

## How to read the result

| What happened | Light |
| --- | --- |
| Each task hit **one** floor | PASS — execute |
| One task hit **two** floors | FAIL — split the task |
| Files hit **no** floor | PASS with **warn** — fix paths or globs |
| Missing `tasks.md` | exit code 2 (usage) |

The file lives at `.specs/harness/scripts/validate_layer_routing.py` after install. It is **Fullstack-owned**, not part of the Harness catalog: re-installing Harness should not delete it; re-installing Fullstack updates it.

Automated proof lives in `test/gate.test.js` (1 layer, 2 layers, 0 layers, globstar). We do not need a fake app for that.
