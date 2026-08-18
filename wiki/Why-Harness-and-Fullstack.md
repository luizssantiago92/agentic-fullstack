# Why Harness + Fullstack

## Positioning

| Role | Analogy | What it does |
| --- | --- | --- |
| **Spec-Driven Harness** | The construction site | Spec in English, atomic tasks, Python gates, Verify, `engineering-standards.md` |
| **Agentic Fullstack** | The floor plan | Says *which floor* the task lives on and loads only that floor’s manual |

Without the Harness, Fullstack is just a stack of manuals. Without Fullstack, the Harness treats frontend and warehouse as the same kind of Execute. **Together** is the product: SDD process + layer routing.

## Strategy (why this sells)

1. **Tokens are budget.** Lean sister skills (hard cap `<2800` chars÷4; routing rule `<600`) instead of dumping the whole Harness catalog every turn.
2. **Human review.** A login-form PR should not drag a warehouse migration with it.
3. **Explicit STOP.** If task `Files` hit two layers, the agent **stops** and splits the task — it does not guess.
4. **Extension, not a fork.** Re-installing the Harness **does not delete** Fullstack skills. You stack; you do not replace.

## How they fit the SDD flow

```text
Discuss / Specify     →  Harness (spec.md, requirements)
Tasks                 →  Harness + Fullstack (split Files by layer)
Execute               →  Harness (implement.md, engineering-standards)
                         + ONE Fullstack skill (the floor)
Commit                →  drop the layer skill from context
Verify                →  Harness (validate, security-review, qa/appsec)
                         NO Fullstack skills
```

Golden rule: **one layer skill per Execute turn.** The Harness still owns spec/tasks/state gates. Fullstack adds `validate_layer_routing.py` for `Files` vs the map in `PROJECT.md`.

## What this product is not

Not a login app. Not a Next.js course. It does not replace `engineering-standards.md` or Harness Verify. It is the **map + floor manuals** for the agent you already use.
