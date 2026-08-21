# Local demo playbook (manual)

Use after `npm run demo:local` creates `demo/workspace/`. Open that folder in Cursor (or keep this repo open and treat paths as product-repo examples).

For a **separate product repository** proof, prefer [docs/guide/product-activation-proof.md](../docs/guide/product-activation-proof.md).

## What automated demo already proved

- Seatbelt + Floor Map install + doctor
- Layer gate on `demo-login`, `demo-etl`, `demo-report`, `demo-model`
- Specialist smoke (trigger/description scoring vs fixtures)

## Manual Execute checks (agent)

For each row: start an Execute-style turn, load Seatbelt implement + **one** Floor skill, then **one** specialist.

| Prompt (paste) | Floor skill | Expected specialist |
| --- | --- | --- |
| Implement REQ-001 login form in `apps/web/src/components/LoginForm.tsx` | `frontend-engineering.md` | `react-expert` |
| Implement POST login in `apps/api/src/routes/login.ts` | `backend-engineering.md` | `api-designer` or `fastapi-expert` |
| Add dbt model `dbt/models/marts/daily_active_users.sql` | `data-engineering.md` | data/ML specialist (e.g. `spark-engineer`) |
| Explore weekly revenue in `notebooks/explore/weekly_revenue.ipynb` | `analytics-engineering.md` | `pandas-pro` or `sql-pro` |
| Train churn in `ml/training/train_churn.py` | `data-science-engineering.md` | `ml-pipeline` |

### Pass criteria

1. Agent loads **exactly one** `*-engineering.md` matching task `Files`.
2. Agent loads **at most one** catalog `SKILL.md` (optional) with domain allowed for that Floor.
3. Agent opens **≤2** `references/` files.
4. On a `/verify` turn, agent loads **neither** Floor nor catalog skills.

## Activation failure modes

| Symptom | Likely cause |
| --- | --- |
| Floor loaded, no specialist | Prompt too vague; ask for the named skill or name the framework |
| Two specialists loaded | Policy violation — stop and drop one |
| Specialist on `/verify` | Wrong phase — unload catalog; use Seatbelt Verify |
| Skill missing on disk | Re-run `npx @luizsantiago/fullstack-floor-map install` |

## Verify-only check

Ask: “Run /verify for demo-login.” Confirm no `catalog/*/SKILL.md` and no `*-engineering.md` Floor manuals are loaded.
