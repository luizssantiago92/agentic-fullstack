# Layer routing gate

A deliberately picky tool: it reads each task **Files** list and the map in `PROJECT.md`. It is the traffic light before Execute.

Preferred (same toolkit as `install` / `doctor`):

```bash
npx @luizsantiago/agentic-fullstack validate-layers my-feature
```

Direct Python (installed script):

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
| Files hit **no** floor, and they look like **docs** (`README.md`, `*.md`) | PASS with **warn** — fix paths or globs |
| Files hit **no** floor, and they look like **code** (`*.ts`, `*.py`, …) | FAIL — amend `Files` or `PROJECT.md` |
| Missing `tasks.md` | exit code 2 (usage) |

The file lives at `.specs/harness/scripts/validate_layer_routing.py` after install. It is **Fullstack-owned**, not part of the Harness catalog: re-installing Harness should not delete it; re-installing Fullstack updates it.

Automated proof lives in `test/gate.test.js` (1 layer, 2 layers, 0-layer docs warn, 0-layer code fail, globstar, CLI parity). We do not need a fake app for that.
