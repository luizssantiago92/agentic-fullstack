# Agentic Fullstack

Your team already has an agent that writes code. The failure mode is not “not smart enough” — it is **mixing floors in the same turn**: UI, API, dbt, and model training in the same `tasks.md`, the same context, the same commit.

**Agentic Fullstack** is the extension that teaches the agent to **work one floor at a time**, on top of the [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness).

- The **Harness** is the method: spec, tasks, gates, Verify, engineering standards.
- **Fullstack** is the building map: frontend, backend, data, analytics, data science.

npm package: [`@luizsantiago/agentic-fullstack`](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack) (currently **0.3.3**, MIT).

## Promise

Less wasted context, PRs a human can review, and a clear STOP when a task spans two layers. The agent still **discovers** React, Fastify, dbt, or sklearn in *your* repo — these skills are not framework tutorials. They are the **execution manual** for that floor.

## The kit (what each tool is for)

| Tool | Purpose |
| --- | --- |
| `install` | Copies the 5 skills, the routing rule, and the gate into *your* repo |
| `doctor` | Checks that Harness + Fullstack sit on the same ground |
| `--sync-registry` | Updates only the floor map in `PROJECT.md` |
| `validate_layer_routing.py` | Traffic light: did this task hit **one** floor? |
| `*-engineering.md` skills | Execute manual for that floor (one per turn) |
| `fullstack-layer.mdc` | The rule: at most one layer skill per task |

## Start in three steps

1. [Install](Install) — Harness first, Fullstack second.
2. [How to use](How-to-use) — the Execute + Verify ritual (Harness + **one** skill).
3. [Five skills](Five-skills) — what to load (and what *not* to load).

If you read only one extra page: [Why Harness + Fullstack](Why-Harness-and-Fullstack).
