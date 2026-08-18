# Install

Install **harness first**, then this extension.

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

Requires Node.js **18+**. Python **3.10+** is recommended for harness gates and the layer routing gate.

## What install copies

| Destination | Artifact |
| --- | --- |
| `.cursor/skills/` and `.claude/skills/` | Five `*-engineering.md` skills |
| `.cursor/rules/fullstack-layer.mdc` | Always-on routing rule |
| `.specs/harness/scripts/validate_layer_routing.py` | Layer gate (extension-owned) |
| `.specs/project/PROJECT.md` | Created **only if missing** (not overwritten on a normal install) |

Re-running harness install **does not delete** extension skills. Re-run fullstack `install` to refresh extension files from the package.

## Without harness

```bash
npx @luizsantiago/agentic-fullstack install --force
```

Skills and the rule are installed. `doctor` still **fails** until the harness hub and harness gates are present.

## After upgrading the package

```bash
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack install --sync-registry
```

`--sync-registry` rewrites **only** the `## Layer registry` table in an existing `PROJECT.md`. Stack, test commands, and lint tables are left alone.

See [CLI](CLI) and [Layer registry](Layer-registry).
