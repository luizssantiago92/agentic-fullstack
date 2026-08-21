# Specialist catalog

Adapted from [jeffallan/claude-skills@0.4.16](https://github.com/Jeffallan/claude-skills) (MIT). See [Credits](credits.md), [NOTICE](../../NOTICE), and [catalog-status.md](catalog-status.md).

## Install ≠ load

| Surface | Cost | When it matters |
| --- | --- | --- |
| Disk after `install` | ~67 folders under `.cursor/skills/` | ~0 tokens until opened |
| Floors `*-engineering.md` | ~1 manual | Task `Files` match **one** layer |
| Specialist `SKILL.md` | ~1–1.5k tokens | **0 or 1** per Execute turn |
| `references/` | Deep guides | **≤2** files opened |

Having `react-expert` installed does **not** mean it is in context. The agent must choose it after the Floor manual.

## Authority order (Execute)

1. **Spec Seatbelt** — spec, `tasks.md`, `Gate`, evidence  
2. **Floors** — one `*-engineering.md` for the matching layer  
3. **Specialist** — one catalog `SKILL.md` for craft (framework/domain)  

Specialists never override `Gate` or `PROJECT.md` test commands. Examples in skills are illustrative — discover APIs from the repo.

## Progressive disclosure

| Tier | What |
| --- | --- |
| Disk | Catalog folders |
| `SKILL.md` | Role, when, MUST/MUST NOT, reference table |
| `references/` | Topic deep-dives (open only what you need) |

## Load rules (hard)

- Same Floor allow-list as `metadata.domain` (see [catalog-index](catalog-index.md))  
- At most **one** specialist `SKILL.md` per Execute turn  
- At most **two** reference files  
- **Never** on `/verify` — use Seatbelt sisters  

## Pick one specialist (decision trees)

Unlike upstream claude-skills guides, **do not** chain Feature Forge → Architecture → Fullstack Guardian → Test Master in one turn. Across Seatbelt phases you may use different skills on different turns; each Execute turn still loads at most one.

### Frontend Floor

| If the task is… | Prefer |
| --- | --- |
| React components / hooks / RSC | `react-expert` |
| Next.js App Router / Server Actions | `nextjs-developer` |
| Vue 3 + TS | `vue-expert` |
| Playwright E2E for the UI | `playwright-expert` |

### Backend Floor

| If the task is… | Prefer |
| --- | --- |
| REST/OpenAPI shapes | `api-designer` |
| FastAPI / Nest / Django / Rails / … | matching `*-expert` |
| Postgres indexes / EXPLAIN | `postgres-pro` |

### Data / analytics / datascience Floors

| If the task is… | Prefer |
| --- | --- |
| Spark / parquet pipelines | `spark-engineer` |
| pandas EDA | `pandas-pro` |
| Analytics SQL | `sql-pro` |
| Training / MLflow | `ml-pipeline` |
| RAG / embeddings | `rag-architect` |

Full list: [catalog-index.md](catalog-index.md).

## Sync from upstream

```bash
# after bumping lib/catalog-pin.js
node scripts/sync-catalog-from-upstream.mjs --from /path/to/claude-skills --write-index
npm run validate:skills
```
