# Onde cada camada mora

O mapa não está “no npm”. Está no **seu** repo: `.specs/project/PROJECT.md`, seção **Layer registry**. É isso que o agente e o gate leem.

Na primeira instalação o arquivo é criado. Depois **não é sobrescrito** — o seu stack e os comandos de teste são seus. Para puxar só a tabela de camadas de uma versão nova do pacote:

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

## Mapa padrão (0.3.3)

| Andar | Onde costuma viver |
| --- | --- |
| frontend | `apps/web/**`, `frontend/**`, arquivos `tsx`/`jsx`/`vue`/`svelte` |
| backend | `apps/api/**`, `backend/**`, routes e migrations *da app* |
| data | `dbt/**`, `pipelines/**`, `**/etl/**`, `warehouse/**`, `spark/**` |
| analytics | `analytics/**`, `reports/**`, `**/sql/analytics/**`, `notebooks/explore/**` |
| datascience | `experiments/**`, `ml/**`, `models/**`, `training/**`, `notebooks/training/**` |

Ajuste as linhas se o monorepo for diferente. Globs que se sobrepõem de propósito (dois andares no mesmo path) fazem o gate falhar — isso é o produto protegendo o turno.

## Detalhes que evitam surpresa

- Migrations **da API** ficam no backend, não um `**/migrations/**` global (para não roubar o dbt).
- Notebook de **explore** é analytics; notebook de **treino** é datascience.
- Um `.tsx` dentro de `apps/api/` conta como **backend** (o prefixo de pasta ganha da extensão). Exige pacote **0.3.2+**.

Camadas futuras (mobile, CLI, embedded) não vêm no pacote: seria uma skill nova + uma linha na tabela.
