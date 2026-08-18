# Publishing

Automated via `.github/workflows/publish.yml`.

Requires GitHub secret **`NPM_TOKEN`**: an npm **Automation** (or Granular) token with **Bypass 2FA for automation**. Classic tokens with 2FA fail in CI (`EOTP`).

| Trigger | What it does |
| --- | --- |
| Actions → **Publish to npm** → bump **`none`** | Publishes current `package.json` version; creates git tag `vX.Y.Z` if missing |
| Bump **`patch` / `minor` / `major`** | `npm version`, publish, push commit + tags to `main` |
| **GitHub Release** published | Publishes the version in `package.json` at that tag (tag must match) |

If the version is **already** on npm, publish is skipped.

CI (`.github/workflows/ci.yml`) runs on push/PR to `main` (Node 18/20/22, pack contents, `demo:validate` on Node 22).

## Compatibility

- `@luizsantiago/agentic-harness` **≥ 0.7.0** (optional npm peer; required for a passing `doctor` and harness gates)
- Node.js 18+
- Python 3.10+ recommended
