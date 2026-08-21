# Companion: Spec Seatbelt

Optional **floor map** for the same agent loop. Spec Seatbelt stays the seatbelt (spec, tasks, gates, Verify). This package adds **which Lane** (path layer) a task lives on and optional specialist depth. **Desks** (specialist rooms + memory) are planned for Floor Map 0.5.0 — see [Companion Sync](Companion-sync.md).

## Install order

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
```

## Pairing contract (today — 0.4.x)

| Phrase | Meaning |
| --- | --- |
| Vertical **feature** | One user path |
| Horizontal **tasks** | T1 UI, T2 API, … |
| One **Lane** per `Files` | Mixed path layers fail `validate-layers` (docs may still say “Floor”) |

## Execute vs Verify

- **Execute:** Seatbelt standards + implement reference + **one** Lane manual (`*-engineering.md`) + optional **one** specialist (≤2 craft refs)  
- **Verify:** Seatbelt only — no Lane manuals, no catalog  

## Planned: Desks (0.5.0)

When shipped, Execute may also: consult `.specs/desks/INDEX.md` → open a Desk → load the **preferred** specialist for continuity; append log/handoff after the turn. Verify still Seatbelt-only.

Paste-ready Seatbelt agent prompt: [Companion-sync-prompt-desks-v3.md](Companion-sync-prompt-desks-v3.md).

Mirror on Seatbelt: [Companion-agentic-fullstack.md](https://github.com/luizssantiago92/spec-seatbelt/blob/main/docs/guide/Companion-agentic-fullstack.md) (update there via Companion Sync).
