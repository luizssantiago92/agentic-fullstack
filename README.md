# Agentic Fullstack

Layer sister skills for the [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness). **Application manuals** for frontend and backend Execute work — the agent discovers framework knowledge; these skills say **how to apply it** per layer with low token cost.

## Install

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
```

Check health:

```bash
npx @luizsantiago/agentic-fullstack doctor
```

Re-running harness install **does not remove** extension skills. Re-run fullstack install to refresh extension files.

## What you get

| Artifact | Purpose |
| --- | --- |
| `.cursor/skills/frontend-engineering.md` | Frontend Execute manual (conditional by task `Files`) |
| `.cursor/skills/backend-engineering.md` | Backend Execute manual (conditional by task `Files`) |
| `.cursor/rules/fullstack-layer.mdc` | Layer routing — one layer skill per task |
| `.specs/project/PROJECT.md` | Stack, layer registry, test/lint commands (created if missing) |

Same files are copied to `.claude/skills/` for Claude Code.

## Scope

| Works well | Limited in v1 |
| --- | --- |
| Web fullstack (FE + BE tasks split by layer) | Mobile native, CLI, embedded, data pipelines |
| Monorepos with configurable globs in `PROJECT.md` | Framework tutorials (agent uses codebase + docs + MCP) |
| FE-only or BE-only projects (one skill triggers) | Projects without harness installed |

Configure paths and commands in `.specs/project/PROJECT.md` § Layer registry.

## Knowledge vs manual

| Who | Role |
| --- | --- |
| Harness | SDD process, gates, Verify, Knowledge Verification Chain |
| Agent | Discover APIs, patterns, versions from code and docs |
| Layer skills | How to execute on the right layer: tests, a11y, API validation, migrations |
| `PROJECT.md` | Where each layer lives in **your** repo |

## Token budget (chars ÷ 4)

Measured from shipped files in this package:

| Asset | Chars | ~Tokens |
| --- | ---: | ---: |
| `frontend-engineering.md` | 3,450 | ~863 |
| `backend-engineering.md` | 3,630 | ~908 |
| `fullstack-layer.mdc` | 1,856 | ~464 |
| **Execute turn (typical)** | — | ~6k with hub phase ref + `engineering-standards` + one layer skill |

Progressive loading avoids dumping all harness sisters every turn (~70–80% savings vs naive full reload — see harness wiki).

## Layer registry (extensibility)

`PROJECT.md` § Layer registry maps layer id → skill file → globs. v1 ships **frontend** and **backend**. Future layers (mobile, cli, data, embedded): add a row + `{layer}-engineering.md` skill.

## Demo feature

See `.specs/features/demo-login/` — two tasks (T1 frontend, T2 backend) showing layer split. Spec-only demo; no application code in this repo.

## Development

```bash
npm test
node index.js install
node index.js doctor
```

## Compatibility

- Requires `@luizsantiago/agentic-harness` 0.7.x
- Node.js 18+
- Python 3.10+ recommended (harness gates)

## License

MIT
