# Agentic Fullstack

[![npm version](https://img.shields.io/npm/v/@luizsantiago/agentic-fullstack.svg)](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Layer sister skills for the [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness). **Application manuals** for frontend and backend Execute work — the agent discovers framework knowledge; these skills say **how to apply it** per layer with low token cost.

npm package: [`@luizsantiago/agentic-fullstack`](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack)

## Install

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
```

Without harness (layer skills only — `doctor` will still fail until harness is installed):

```bash
npx @luizsantiago/agentic-fullstack install --force
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
| `backend-engineering.md` | 3,621 | ~905 |
| `fullstack-layer.mdc` | 1,856 | ~464 |
| **Execute turn (typical)** | — | ~6k with hub phase ref + `engineering-standards` + one layer skill |

Progressive loading avoids dumping all harness sisters every turn (~70–80% savings vs naive full reload — see harness wiki).

## Layer registry (extensibility)

`PROJECT.md` § Layer registry maps layer id → skill file → globs. v1 ships **frontend** and **backend**. Future layers (mobile, cli, data, embedded): add a row + `{layer}-engineering.md` skill.

## Demo feature

See `.specs/features/demo-login/` — two tasks (T1 frontend, T2 backend) showing layer split. Spec-only demo; no application code in this repo.

## Releases

Publishing is automated via GitHub Actions (`.github/workflows/publish.yml`).

| Trigger | When to use |
| --- | --- |
| **Actions → Publish to npm → Run workflow → `none`** | Publish the current `package.json` version (first release or republish after version fix) |
| **Run workflow → `patch` / `minor` / `major`** | Bump version, publish, push tag to `main` |
| **GitHub Release published** | Publishes the version in `package.json` at release time |

Requires repository secret **`NPM_TOKEN`** (npm automation token with write access to `@luizsantiago/*`).

**Important:** the token must be an **Automation** or **Granular** token with **Bypass 2FA for automation** enabled. Classic tokens with 2FA will fail in CI with `npm error code EOTP`. Create at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/~youruser/tokens) → Generate New Token → Automation (recommended for CI).

Compatible with `@luizsantiago/agentic-harness` **0.7.x** (optional npm peer; required for harness gates and a passing `doctor`).

## Development

Clone, install once (links the local CLI so `npx` works in this repo), then use the same commands as end users:

```bash
npm install
npm test
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

Run `npm install` first in this repo: `prepare` links `node_modules/.bin/agentic-fullstack` so `npx` resolves the local package (same name as `package.json`). Without that step you get `agentic-fullstack: not found`. `doctor` is a subcommand of this package — no separate npm token.

## Compatibility

- Requires `@luizsantiago/agentic-harness` 0.7.x for gates and a passing `doctor` (optional npm peer; use `install --force` for layer skills only)
- Node.js 18+
- Python 3.10+ recommended (harness gates)

## License

MIT
