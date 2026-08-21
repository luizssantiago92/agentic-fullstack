# Concepts

## Lanes (path layers)

A **Lane** is a stack path layer: frontend, backend, data, analytics, or datascience. The Layer registry in `PROJECT.md` maps globs → a lean Execute manual (`*-engineering.md`). Older docs say **Floor** — same thing.

**Rule:** at most **one** Lane skill per Execute task. Mixed `Files` fail `validate-layers`.

## Pairing with Spec Seatbelt

| Phrase | Meaning |
| --- | --- |
| Vertical **feature** | One user path (login, checkout) |
| Horizontal **tasks** | T1 UI, T2 API (or data / ML), with `Depends on` |
| One Lane per task | Do not put two lanes in the same `Files` list |

## Specialist catalog

Specialists are framework/domain experts under `.cursor/skills/<id>/SKILL.md`. **Install ≠ load** — having 67 skills on disk costs ~0 tokens until the agent opens one.

| Policy | Limit |
| --- | --- |
| Lane manuals | 1 |
| Specialist `SKILL.md` | 0 or 1 |
| `references/` files | ≤ 2 per turn (craft for the **current** specialist — not a router to others) |
| Verify | 0 companion skills |

## Desks (planned 0.5.0)

A **Desk** is a work room with memory (`.specs/desks/<id>/DESK.md`), not a typed FE/BE label. Unlimited desks; ≤3 specialists registered; **preferred** for continuity; **handoff** when preferred switches; still one specialist loaded per turn. **INDEX** (`.specs/desks/INDEX.md`) lists desks before creating a new one. Not on npm until 0.5.0.

## Authority order

1. Spec Seatbelt (spec, Gate, evidence)  
2. Lane manual (discover APIs from the repo)  
3. Specialist (craft; examples are illustrative)  

Specialists never override `Gate` or `PROJECT.md` test commands.

Full ownership table: [Companion-spec-seatbelt.md](Companion-spec-seatbelt.md).
