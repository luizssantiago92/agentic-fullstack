# Full Stack Floor Map

[![npm version](https://img.shields.io/npm/v/@luizsantiago/fullstack-floor-map.svg)](https://www.npmjs.com/package/@luizsantiago/fullstack-floor-map)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Full Stack Floor Map** companion for [Spec Seatbelt](https://github.com/luizssantiago92/spec-seatbelt) — map the stack into **Lanes** (frontend, backend, data, analytics, data science), load **one layer manual per Execute task**, and optionally call **one specialist** from a 67-skill catalog (plus ≤2 craft references). Specialists enter only when called. **Desks** (specialist memory under `.specs/desks/`) are planned for **0.5.0** — not shipped yet.

npm: [`@luizsantiago/fullstack-floor-map`](https://www.npmjs.com/package/@luizsantiago/fullstack-floor-map) **0.4.1**  

---

## Install

In **your product repository** (Node.js 18+. Python 3.10+ for gates):

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
```

### What install does

| Lands in your project | Purpose |
| --- | --- |
| `.cursor/skills/*-engineering.md` (+ `.claude/`) | Lane manuals (path layers; docs may say “Floors”) |
| `.cursor/skills/<specialist>/` | Specialist catalog (`SKILL.md` + `references/`) |
| `.cursor/rules/fullstack-layer.mdc` | One Lane + at most one specialist |
| `.specs/seatbelt/scripts/validate_layer_routing.py` | Layer gate (Floor Map–owned) |
| `.specs/project/PROJECT.md` | Stack + Layer registry (created if missing) |

Re-run Seatbelt install anytime — it does **not** delete Floor Map skills, catalog, the layer gate script, or (when Desks ship) `.specs/desks/`. Re-run Fullstack `install` to refresh lanes, rule, gate, and catalog.

| Need | Command |
| --- | --- |
| Skills without Seatbelt yet | `install --force` |
| Refresh registry globs only | `install --sync-registry` |
| Check health | `doctor` |
| Check task `Files` vs lanes | `validate-layers <feature>` |

---

## How the pieces fit together

| Idea | Package | Role |
| --- | --- | --- |
| **Seatbelt** | `@luizsantiago/spec-seatbelt` | Spec, tasks, gates, Verify |
| **Lane** | this package | Which path layer a task lives on |
| **Specialists** | catalog in this package | Framework craft — load on demand |
| **Desk** | this package (planned 0.5.0) | Specialist memory / continuity |

**Pairing:** keep the **feature** vertical (one user path). Split **tasks** by Lane — never mix `apps/web` and `apps/api` in one `Files` list.

**Execute load:** Seatbelt working set + **one** `*-engineering.md` + **at most one** specialist `SKILL.md` + **≤2** craft `references/`.  
**Verify:** Seatbelt only — no Lane manuals, no catalog specialists.

Ownership and harmony loop: [Companion: Spec Seatbelt](docs/guide/Companion-spec-seatbelt.md).

---

## Documentation

| Guide | Topic |
| --- | --- |
| [Quick start](docs/guide/Quick-start.md) | Install → registry → validate-layers → Execute |
| [Concepts](docs/guide/concepts.md) | Floors, pairing, load policy |
| [Five floors](docs/guide/five-skills.md) | Layer manuals |
| [Specialist catalog](docs/guide/specialist-catalog.md) | 67 skills, install ≠ load |
| [Layer routing gate](docs/guide/layer-routing-gate.md) | Gate paths & CLI |
| [Companion: Spec Seatbelt](docs/guide/Companion-spec-seatbelt.md) | Pairing contract / ownership |
| [Companion Sync](docs/guide/Companion-sync.md) | Keep Seatbelt docs in sync |
| [CLI](docs/guide/CLI.md) | Commands |
| [FAQ](docs/guide/FAQ.md) | Common questions |
| [Credits](docs/guide/credits.md) | Attribution |

---

## Credits

This package adapts open ideas; Floors layer routing is original here.

| Source | License | How we use it |
| --- | --- | --- |
| [jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills) | MIT | Specialist catalog (`SKILL.md` + `references/`) |
| [spec-seatbelt](https://github.com/luizssantiago92/spec-seatbelt) | MIT | Companion pairing, guide shape, Verify ownership |

Extended attribution: [docs/guide/credits.md](docs/guide/credits.md) · [NOTICE](NOTICE)

## License

MIT
