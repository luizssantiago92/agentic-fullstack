# Concepts

## Floors

A **Floor** is a stack layer: frontend, backend, data, analytics, or datascience. The Layer registry in `PROJECT.md` maps globs → a lean Execute manual (`*-engineering.md`).

**Rule:** at most **one** Floor skill per Execute task. Mixed `Files` fail `validate-layers`.

## Pairing with Spec Seatbelt

| Phrase | Meaning |
| --- | --- |
| Vertical **feature** | One user path (login, checkout) |
| Horizontal **tasks** | T1 UI, T2 API (or data / ML), with `Depends on` |
| One Floor per task | Do not put two floors in the same `Files` list |

## Specialist catalog

Specialists are framework/domain experts under `.cursor/skills/<id>/SKILL.md`. **Install ≠ load** — having 67 skills on disk costs ~0 tokens until the agent opens one.

| Policy | Limit |
| --- | --- |
| Layer manuals | 1 |
| Specialist `SKILL.md` | 0 or 1 (same Floor domain) |
| `references/` files | ≤ 2 per turn |
| Verify | 0 companion skills |

## Authority order

1. Spec Seatbelt (spec, Gate, evidence)  
2. Floors layer manual (discover APIs from the repo)  
3. Specialist (craft; examples are illustrative)  

Specialists never override `Gate` or `PROJECT.md` test commands.
