# FAQ

## How is this different from the Harness?

Harness = SDD process. Fullstack = which floor the task lives on. Read [Why Harness + Fullstack](Why-Harness-and-Fullstack).

## Can I load frontend and backend together “to go faster”?

No. That is the anti-pattern this product exists to stop. Split the task.

## `doctor` failed after `--force`

Expected. Install the Harness and run Fullstack install again.

## `install` did not change my `PROJECT.md`

Normal. Use `--sync-registry` only for the layer table.

## The gate passed with `warn`

Zero floors on **docs** paths (`README.md`, `*.md`). It is not red, but Execute will run without a Fullstack skill — `engineering-standards` only. Unmatched **code** (`*.ts`, `*.py`, …) is a **FAIL** — fix `Files` or the Layer registry.

## Can I put UI and API in one Harness “vertical slice” task?

Not with Fullstack installed. Keep the **feature** vertical; split **tasks** by floor. See [How to use](How-to-use).

## `npx` cannot find the command in this package repo

```bash
npm install
```

Or `node index.js`.

## Where is the sample app?

There is none. [Demo](Demo) is spec-only. Your “hello world” is the first login (or the first model) **in the company repo**.

## `**/etl/**` did not match in my old CI

Globstar bug, fixed in **0.3.2**. Upgrade and reinstall the gate.

## A `.tsx` under `apps/api` — which skill?

Backend, from 0.3.2 (folder wins over extension).
