# How to use

This is the ritual. If install was “turning the studio on”, this is the **work turn**.

## Pairing contract (Harness + Fullstack)

Harness `tasks.md` prefers **vertical slices**. Fullstack requires **one layer per task `Files`**. Together they mean:

| Phrase | What it means here |
| --- | --- |
| Vertical **feature** | One user path (login, checkout) — not “all schema, then all APIs, then all UI” as *phases* |
| Horizontal **tasks** | T1 frontend, T2 backend (or data / analytics / datascience), with `Depends on` when needed |
| One layer per task | Do **not** put `apps/web` and `apps/api` in the same `Files` list — the layer gate **FAIL**s |

The [Demo](Demo) login spec is the canonical split: T1 UI, T2 API. Mirror note on the Harness wiki: [Companion: Agentic Fullstack](https://github.com/luizssantiago92/spec-driven-harness/wiki/Companion-agentic-fullstack).

## Before Execute

1. Spec and tasks in Harness format (`spec.md`, `tasks.md`).
2. Each task has **Files** on a single floor (see [Layer registry](Layer-registry)).
3. Run the layer gate on the feature:

```bash
npx @luizsantiago/agentic-fullstack validate-layers my-feature
```

Equivalent:

```bash
python3 .specs/harness/scripts/validate_layer_routing.py my-feature
```

PASS with `ok T1 → layer frontend` (and another for backend, and so on) = you may execute. FAIL = split the task. Unmatched **docs** (`README.md`, `*.md`) = PASS with **warn**. Unmatched **code** (`*.ts`, `*.py`, …) = **FAIL** — fix `Files` or the map in `PROJECT.md`.

## During Execute (Harness + Fullstack together)

Think of two kinds of manual, not two competing skills:

| Piece | From | Role this turn |
| --- | --- | --- |
| `engineering-standards.md` + `references/implement.md` | Harness | The *cycle*: RED, Adequacy A–D, commit, what “done” means |
| **One** `*-engineering.md` skill | Fullstack | The *floor*: narrow test, a11y, HTTP contract, pipeline, model metric |

In the agent context, keep:

- Always: the two Harness files above
- **Plus one:** the floor skill (`frontend-engineering.md` *or* `backend-engineering.md` *or* data / analytics / datascience)
- Never: two Fullstack skills in the same turn

The agent **discovers** the framework API from the code — if it does not know, it stops and notes it in `STATE.md`. The layer skill does not replace the Harness; it only tightens Execute focus.

## After commit

Drop the layer skill from context. The next task may be another floor; do not let the frontend manual contaminate an API task.

## Verify (Harness only)

Do not load Fullstack skills. Use the Harness Verify stack: `validate.md`, `security-review.md`, and at most one of `appsec.md` or `qa-strategy.md`.

## Mental example (login)

- T1 Files under `apps/web/...` → **frontend** skill + Harness implement.
- Commit. Drop frontend.
- T2 Files under `apps/api/...` → **backend** skill + Harness implement.
- Feature closed → `/verify` with no Fullstack.

The example spec in this package is on [Demo](Demo).
