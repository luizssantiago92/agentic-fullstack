# Companion: Spec Seatbelt

Optional **floor map** for the same agent loop. Spec Seatbelt stays the seatbelt (spec, tasks, gates, Verify). This package adds **which Floor** a task lives on and optional specialist depth.

## Install order

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

## Pairing contract

| Phrase | Meaning |
| --- | --- |
| Vertical **feature** | One user path |
| Horizontal **tasks** | T1 UI, T2 API, … |
| One Floor per `Files` | Mixed floors fail `validate-layers` |

## Execute vs Verify

- **Execute:** Seatbelt standards + implement reference + **one** Floors skill + optional **one** specialist (≤2 refs)  
- **Verify:** Seatbelt only — no Floors, no catalog  

Mirror on Seatbelt: [Companion-agentic-fullstack.md](https://github.com/luizssantiago92/spec-seatbelt/blob/main/docs/guide/Companion-agentic-fullstack.md)
