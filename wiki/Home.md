# Agentic Fullstack

Seu time já tem um agente que escreve código. O problema não é “falta de inteligência” — é **misturar andares no mesmo turno**: UI, API, dbt e treino de modelo no mesmo `tasks.md`, no mesmo contexto, no mesmo commit.

**Agentic Fullstack** é a extensão que ensina o agente a **trabalhar um andar de cada vez**, em cima do [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness).

- O **Harness** é o método: spec, tasks, gates, Verify, padrão de engenharia.
- O **Fullstack** é o mapa do prédio: frontend, backend, dados, analytics, ciência de dados.

Pacote npm: [`@luizsantiago/agentic-fullstack`](https://www.npmjs.com/package/@luizsantiago/agentic-fullstack) (hoje **0.3.3**, MIT).

## Promessa

Menos contexto desperdiçado, PRs que um humano consegue revisar, e um STOP claro quando a task mistura camadas. O agente continua a **descobrir** React, Fastify, dbt ou sklearn no *seu* repo — as skills não são tutorial de framework. São o **manual de execução** daquele andar.

## O kit (o que cada ferramenta faz)

| Ferramenta | Para quê |
| --- | --- |
| `install` | Copia as 5 skills, a regra de routing e o gate para o *seu* repo |
| `doctor` | Confere se Harness + Fullstack estão no mesmo terreno |
| `--sync-registry` | Atualiza só o mapa de andares no `PROJECT.md` |
| `validate_layer_routing.py` | Semáforo: a task bateu em **um** andar? |
| Skills `*-engineering.md` | Manual de Execute daquele andar (uma por turno) |
| `fullstack-layer.mdc` | A regra: no máximo uma skill de camada por task |

## Comece em três passos

1. [Instalar](Instalar) — Harness primeiro, Fullstack depois.
2. [Como usar no dia a dia](Como-usar) — o ritual Execute + Verify (Harness + **uma** skill).
3. [As cinco skills](As-cinco-skills) — o que carregar (e o que *não* carregar).

Se só puder ler uma página além desta: [Por que Harness + Fullstack](Por-que-Harness-e-Fullstack).
