# Routing

The Cursor rule `fullstack-layer.mdc` (`alwaysApply: true`) tells the agent which layer skill to load during **Execute**.

## One layer per task

Read `PROJECT.md` § Layer registry. Compare the current task **`Files`** to globs:

| Match | Load | Do not load |
| --- | --- | --- |
| **One** layer | That layer’s skill | Other layer skills |
| **Zero** layers | Neither — `engineering-standards.md` only | Layer skills |
| **Two or more** layers | **STOP** | All layer skills |

STOP means: split the task or amend `tasks.md` / globs. Do not load two layer skills in one turn.

Always keep `engineering-standards.md` and the current phase reference (`references/implement.md`). Layer skills are **additive**.

Run the [layer routing gate](Layer-routing-gate) before Execute when the script is installed:

```bash
python3 .specs/harness/scripts/validate_layer_routing.py <feature-id>
```

## After commit

Drop the layer skill from the working set before the next task (same idea as conditional Verify sisters).

## Verify

Do **not** load layer skills on `/verify`.
