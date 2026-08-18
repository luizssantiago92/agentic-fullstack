# Publishing

For maintainers of the GitHub/npm package.

Secret **`NPM_TOKEN`**: npm **Automation** (or Granular) token with **Bypass 2FA**. A classic token with 2FA breaks CI (`EOTP`).

| Trigger | What happens |
| --- | --- |
| Actions → Publish → bump **`none`** | Publishes the `package.json` version and creates tag `vX.Y.Z` if missing |
| bump **patch / minor / major** | Bumps version, publishes, pushes the tag |
| GitHub Release published | Publishes the `package.json` version at that tag |

If the version is already on npm, publish is skipped. CI on push/PR to `main` (Node 18, 20, 22). Peer: Harness ≥ 0.7.0 (optional on npm, required for a green `doctor`).
