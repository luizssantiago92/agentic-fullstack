# CLI

Binary: `agentic-fullstack` (npm package `@luizsantiago/agentic-fullstack`).

```text
Usage: agentic-fullstack [command]

Commands:
  install [--force] [--sync-registry]   Install layer skills, rule, and PROJECT template
  doctor              Check harness + layer skills installation health
  --help              Show this message
  --version           Print the package version
```

## install

| Flag | Effect |
| --- | --- |
| *(none)* | Requires harness hub `.cursor/skills/agent-architecture.md`. Copies skills, rule, gate. Creates `PROJECT.md` if missing. |
| `--force` | Same copies without harness. Doctor will still report `harness_missing` / `gates_missing`. |
| `--sync-registry` | Requires existing `PROJECT.md`. Replaces only `## Layer registry` from package `DEFAULT_LAYERS`. |

Install **refuses** to write outside the project root, through a **symlink file**, or under a **symlink parent directory**.

## doctor

Exit `0` if no issues; `1` otherwise.

Typical issues:

| Code | Meaning |
| --- | --- |
| `harness_missing` | No `agent-architecture.md` hub |
| `gates_missing` | No harness `validate_spec.py` |
| `layer_gate_missing` | No `validate_layer_routing.py` |
| `skill_missing:…` | A shipped skill is absent |
| `rule_missing` | No `fullstack-layer.mdc` |
| `project_missing` | No `PROJECT.md` |
| `layer_registry_missing` | No `## Layer registry` heading |
| `registry_unknown_skill:…` | Registry names a skill this package does not ship |
| `registry_invalid_skill:…` | Skill basename failed validation |

Glob **drift** vs package defaults is logged as a warning (`run install --sync-registry`) and does **not** fail doctor.

Missing Python 3 is logged as degraded gate mode; it does not fail doctor by itself.

## npx in this git repo

When the current directory **is** the package, `npx @luizsantiago/agentic-fullstack` resolves to the local folder. Run `npm install` first so `prepare` links `node_modules/.bin/agentic-fullstack`. Fallback: `node index.js install`.
