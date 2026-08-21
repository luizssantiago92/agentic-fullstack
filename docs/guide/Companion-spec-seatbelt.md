# Companion: Spec Seatbelt

Spec Seatbelt stays the seatbelt (spec, tasks, gates, Verify). This package is the optional **Full Stack Floor Map** companion: **Lanes** (path layers), specialist catalog, and — planned for **0.5.0** — **Desks** (specialist memory).

They are **two packages**. Re-installing Seatbelt must **not** delete Floor Map skills, the specialist catalog, `validate_layer_routing.py`, or `.specs/desks/` (when present).

> **Desks (planned 0.5.0):** agreed pairing is documented here and on Seatbelt; **not shipped on npm yet** (0.4.x = Lane + catalog only). Do not scaffold `.specs/desks/` until this package publishes 0.5.0.

Mirror (Seatbelt): [Companion-fullstack-floor-map.md](https://github.com/luizssantiago92/spec-seatbelt/blob/cursor/companion-desks-v3-docs-29db/docs/guide/Companion-fullstack-floor-map.md) (merge to `main` with [PR #80](https://github.com/luizssantiago92/spec-seatbelt/pull/80)).

## Install order (product repo)

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
```

## Ownership (harmony)

| Piece | Owner | Notes |
| --- | --- | --- |
| Spec, tasks, gates, loop-plan, Verify | **Spec Seatbelt** | `.specs/features/`, `.specs/seatbelt/scripts/` |
| **Lane** + `validate-layers` | **Floor Map** | One `*-engineering.md` per task `Files`; no mixed `apps/web` + `apps/api` |
| **Desk** + INDEX + handoff | **Floor Map** (planned 0.5.0) | `.specs/desks/<id>/DESK.md`, `.specs/desks/INDEX.md` |
| Specialist catalog | **Floor Map** | One `SKILL.md` per Execute turn; `references/` = craft for **current** skill only |
| Verify sisters | **Seatbelt only** | No Lane manuals, no catalog, no desk staffing on `/verify` |

**Lane** = today’s path-layer (globs + manuals + gate). Docs may still say “Floor” in 0.4.x; prefer **Lane** in new text.

**Desk** (planned) = work room with memory — unlimited desks, ≤**3** specialists registered, **preferred** for continuity, **handoff** when preferred switches; still **one** specialist loaded per turn.

## Harmony loop

1. **Specify / Tasks (Seatbelt)** — one **Lane** per task `Files`  
2. **Layer gate:** `npx @luizsantiago/fullstack-floor-map validate-layers <feature>`  
3. **Execute** — Seatbelt implement set + **one** Lane manual + (when Desks exist) INDEX → DESK → preferred specialist + ≤1 catalog `SKILL.md` (≤2 craft refs)  
4. **After Execute** — drop Lane + specialist; Floor Map may append `.specs/desks/` log / handoff / INDEX  
5. **`/verify`** — Seatbelt Verify only  

Authority: Seatbelt (spec / Gate / evidence) → Lane manual → specialist craft. Specialists never override `Gate` or `PROJECT.md` test commands.

## Pairing contract

| Phrase | Meaning |
| --- | --- |
| Vertical **feature** | One user path |
| Horizontal **tasks** | T1 UI, T2 API, … with `Depends on` |
| One **Lane** per `Files` | Mixed path layers fail `validate-layers` |

## Coexistence on re-install

Seatbelt `install` must preserve Floor Map–owned assets. Floor Map `install` must not wipe Seatbelt hub/gates. When Desks ship, `.specs/desks/` is companion-owned — Seatbelt must not delete it.

## Rejected forever (this package)

- Multi-specialist load in one turn  
- Catalog or Lane manuals on Verify  
- Auto-evict of specialists  
- Typed FE/BE desks  
- Floor Map–owned sub-agent runtime  

## Companion Sync

Process and prompts for keeping both guides in sync: [Companion-sync.md](Companion-sync.md).  
Ack of Seatbelt PR #80: this page.
