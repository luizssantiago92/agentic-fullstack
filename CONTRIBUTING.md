# Contributing

Maintainer docs for this npm package repository. End users install into **their product repo** — see [README](README.md). Product playbook: [`wiki/`](wiki/).

## Development setup

Node.js 18+. Python 3.10+ for gates. Harness runtime (`.cursor/`, `.specs/harness/`, `.specs/project/`) is gitignored — install locally after clone.

```bash
npm install   # required: prepare links node_modules/.bin/agentic-fullstack
npm test
npx @luizsantiago/agentic-harness@0.7 install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate
```

Without `npm install` first, `npx @luizsantiago/agentic-fullstack` fails with `not found`. Fallback: `node index.js install` / `node index.js doctor`.

Tests: `test/install.test.js` (install, doctor, token budget, symlinks) and `test/gate.test.js` (routing). The `test/` folder does not ship on npm.

## Pull requests

- CI runs on PRs to `main`: workflow lint, `npm test` on Node 18/20/22, pack checks (`.github/workflows/ci.yml`).
- Docs and skills stay in English.
- Do not commit harness runtime or secrets.

## Publishing to npm

Publishing runs only from [`.github/workflows/publish.yml`](.github/workflows/publish.yml). It does **not** run on pull requests.

### Repository secret

Add **`NPM_TOKEN`** in GitHub **Settings → Secrets and variables → Actions**.

Use an npm **Automation** token (or Granular publish token) scoped to `@luizsantiago/*` with **Bypass 2FA for automation** enabled. Classic publish tokens with account 2FA fail in CI with `npm error code EOTP`.

Never commit token values, `.npmrc` with auth, or paste tokens into issues, wiki, or PR comments.

### GitHub Environment (recommended)

Configure an environment named **`npm`** on the repository with required reviewers before the publish job runs. The workflow declares `environment: npm` so only approved maintainers can publish.

### Triggers

| Trigger | What happens |
| --- | --- |
| **Actions → Publish to npm → Run workflow → `none`** | Runs tests, publishes the current `package.json` version with provenance, creates tag `vX.Y.Z` if missing |
| **Run workflow → `patch` / `minor` / `major`** | Bumps version, publishes, pushes commit and tag to `main` |
| **GitHub Release published** | Validates tag matches `package.json`, runs tests, publishes that version |

If the version is already on npm, publish is skipped.

Manual dispatch must be started from **`main`**.

## Key paths

| Path | Role |
| --- | --- |
| `skills/` | Layer skills copied on install |
| `rules/fullstack-layer.mdc` | Layer routing rule |
| `gates/validate_layer_routing.py` | Layer gate (installed to `.specs/harness/scripts/`) |
| `lib/` | CLI install/doctor logic |
| `.github/workflows/` | CI and publish |
