# Specialist catalog

Adapted from [jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills) (MIT). See [Credits](credits.md) and [NOTICE](../../NOTICE).

## Progressive disclosure

| Tier | What | Token cost |
| --- | --- | --- |
| Disk | ~67 folders after install | ~0 |
| `SKILL.md` | Role, when, MUST/MUST NOT, reference table | ~1–1.5k when loaded |
| `references/` | Deep guides | Only files you open (≤2 / turn) |

## Load rules

- Same Floor domain as the active layer skill  
- At most **one** `SKILL.md` per Execute turn  
- At most **two** reference files  
- **Never** on `/verify` (use Seatbelt sisters)  

## Typical Floor → specialists

| Floor | Examples |
| --- | --- |
| frontend | `react-expert`, `nextjs-developer`, `playwright-expert` |
| backend | `api-designer`, `fastapi-expert`, `postgres-pro` |
| data | `spark-engineer`, `database-optimizer` |
| analytics | `sql-pro`, `pandas-pro` |
| datascience | `ml-pipeline`, `rag-architect` |

Status triage: [catalog-status.md](catalog-status.md)
