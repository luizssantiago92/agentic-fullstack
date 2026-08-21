# Catalog status

Specialist catalog adapted from [jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills).

## Upstream pin

| Field | Value |
| --- | --- |
| Repo | https://github.com/Jeffallan/claude-skills |
| Version | **0.4.16** |
| Commit | `882ef55e377dbf9a4dbe496bb41ac6ccd0e555cf` |
| Skills | 67 |
| Source of truth | [`lib/catalog-pin.js`](../../lib/catalog-pin.js) |

Re-sync after an upstream release:

```bash
git clone --depth 1 --branch v0.4.16 https://github.com/Jeffallan/claude-skills.git /tmp/claude-skills
# bump UPSTREAM_* in lib/catalog-pin.js if the tag changed
node scripts/sync-catalog-from-upstream.mjs --from /tmp/claude-skills --write-index
npm test && npm run validate:skills
```

## Triage statuses

| Status | Meaning |
| --- | --- |
| `ported` | Copied with Floors/Seatbelt banner |
| `adapted` | Banner + metadata tweaks (e.g. `verify-forbidden`) |
| `needs-review` | Open for human content review |

**Default:** all skills are **ported** at the pin above.

## Adapted skills (`phase: verify-forbidden`)

These stay on disk for Execute craft, but must **not** load on `/verify` (Seatbelt Verify sisters own that phase):

| Skill | Why adapted |
| --- | --- |
| `feature-forge` | Spec/requirements — Seatbelt Specify owns planning artifacts |
| `fullstack-guardian` | Broad stack — use one Floor specialist instead on Execute |
| `secure-code-guardian` | Security craft on Execute only; Verify → Seatbelt `security-review` / `appsec` |
| `test-master` | Testing craft on Execute only; Verify → Seatbelt `qa-strategy` |
| `the-fool` | Challenge/reasoning — not a Verify owner |

Index: [catalog-index.md](catalog-index.md)

When you deeply edit a skill beyond the banner/`verify-forbidden`, keep it listed here as `adapted` or mark `needs-review`.
