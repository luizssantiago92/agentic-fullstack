# Development

Clone this repository (the npm package source), not a product app.

```bash
npm install    # required: prepare links local bin for npx
npm test
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate
```

Without `npm install`, `npx @luizsantiago/agentic-fullstack` in this folder often fails with `agentic-fullstack: not found`. Fallback: `node index.js <command>`.

## Tests

Node built-in runner (`node --test`):

- `test/install.test.js` — install, doctor, checksums, token budget, symlink safety, `--sync-registry`
- `test/gate.test.js` — layer routing gate

No extra npm test dependencies. `test/` is **not** published on npm.

## Layout (source)

| Path | Role |
| --- | --- |
| `skills/` | Skill sources copied on install |
| `rules/fullstack-layer.mdc` | Routing rule |
| `gates/validate_layer_routing.py` | Gate source |
| `lib/` | CLI (`install`, `doctor`, `DEFAULT_LAYERS`) |
| `templates/PROJECT.md` | Generated from `DEFAULT_LAYERS` |
| `.specs/features/demo-login/` | Spec-only demo |

Harness runtime (`.cursor/`, `.claude/`, `.specs/harness/`, `.specs/project/`) is gitignored; install it locally.

See [Publishing](Publishing) for npm.
