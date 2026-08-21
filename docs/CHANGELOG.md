# Changelog

## 0.4.1

- Catalog pin to jeffallan/claude-skills **0.4.16** (`lib/catalog-pin.js`, NOTICE, catalog-status)
- `scripts/sync-catalog-from-upstream.mjs` — re-apply Floors banner + `verify-forbidden`
- Hardened `validate:skills` (sibling refs, absolute-path ban, related-skills warns)
- Generated [catalog-index.md](guide/catalog-index.md); activation docs + [product-activation-proof.md](guide/product-activation-proof.md)
- Local demo sandbox (`demo:local`) with layer gates + specialist smoke

## 0.4.0

- **Rename:** `@luizsantiago/fullstack-floor-map` / CLI `fullstack-floor-map` (bin alias `agentic-fullstack` kept); GitHub `luizssantiago92/fullstack-floor-map`
- Spec Seatbelt 2.2 compatibility: gates install to `.specs/seatbelt/scripts/` with legacy harness fallback
- Peer dependency `@luizsantiago/spec-seatbelt` >= 2.2.0
- Specialist catalog (~67 skills) adapted from jeffallan/claude-skills
- Load policy: one Floor + one specialist + ≤2 refs; Verify = Seatbelt only
- Docs moved to `docs/guide/`; wiki removed
- Credits + NOTICE
