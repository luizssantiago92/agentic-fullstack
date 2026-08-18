# As cinco skills

Cinco manuais irmãos. Mesmo formato, andares diferentes. **Uma por turno.**

## Frontend — `frontend-engineering.md`

**Para quê:** telas, componentes, acessibilidade, testes do que a pessoa *vê*.

**Quando carregar:** `Files` batem nos globs de frontend (`apps/web/**`, `frontend/**`, `**/*.tsx`, …).

**O que pede ao agente:** teste mais estreito do `PROJECT.md` / campo Gate; estados do spec (vazio, erro, loading); nomes acessíveis nos controlos; diff cirúrgico.

**Não é:** tutorial de React. Não carregar em Verify (aí é `qa-strategy.md` se o fluxo for longo).

## Backend — `backend-engineering.md`

**Para quê:** HTTP, serviços, migrations **da app** (`apps/api/**/migrations/**`).

**Quando carregar:** paths de API / `backend/**`.

**O que pede:** teste de contrato (status e body); validar input na fronteira; authZ fail-closed; logs sem segredo.

**Não é:** dbt nem treino de modelo. Migrations de warehouse são andar **data**.

## Data — `data-engineering.md`

**Para quê:** pipelines de produção, dbt, ETL, qualidade, warehouse.

**Quando carregar:** `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**`.

**Não é:** notebook de exploração (analytics) nem `experiments/` de ML.

## Analytics — `analytics-engineering.md`

**Para quê:** análise de dados, SQL analítico, relatórios, EDA em `notebooks/explore/**`.

**Não é:** deploy de pipeline batch nem treino de modelo.

## Ciência de dados — `data-science-engineering.md`

**Para quê:** experimentos, seeds, splits, métricas, artefatos em `experiments/**`, `ml/**`, `training/**`, `notebooks/training/**`.

**Não é:** dashboard de BI nem dbt.

## Como escolher em 10 segundos

Olhe o campo **Files** da task. Se está em `apps/web`, é frontend. Se está em `apps/api`, é backend. Se está em `dbt` ou `etl`, é data. Relatório ad hoc / explore → analytics. Treino / `metrics.json` → datascience. Dois andares no mesmo Files → **STOP** e parte a task (veja [Como usar](Como-usar)).
