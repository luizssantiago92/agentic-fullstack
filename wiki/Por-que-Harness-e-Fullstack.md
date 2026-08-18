# Por que Harness + Fullstack

## O posicionamento

| Papel | Analogia | O que faz |
| --- | --- | --- |
| **Spec-Driven Harness** | O canteiro de obras | Spec em inglês, tasks atômicas, gates Python, Verify, `engineering-standards.md` |
| **Agentic Fullstack** | A planta do edifício | Diz em *qual andar* a task mora e carrega só o manual daquele andar |

Sem o Harness, o Fullstack é só um conjunto de manuais. Sem o Fullstack, o Harness trata frontend e warehouse como o mesmo tipo de Execute. **Os dois juntos** é o produto: processo SDD + routing por camada.

## Estratégia (por que isso vende)

1. **Token é orçamento.** Skills irmãs magras (~500–1000 tokens) em vez de despejar o catálogo inteiro do Harness a cada turno.
2. **Revisão humana.** Um PR de formulário de login não deveria trazer migration de warehouse.
3. **STOP explícito.** Se os `Files` da task batem em duas camadas, o agente **para** e parte a task — em vez de “adivinhar”.
4. **Extensão, não fork.** Reinstalar o Harness **não apaga** as skills Fullstack. Você empilha, não substitui.

## Como encaixam no fluxo SDD

```text
Discuss / Specify     →  Harness (spec.md, requisitos)
Tasks                 →  Harness + Fullstack (partir Files por camada)
Execute               →  Harness (implement.md, engineering-standards)
                         + UMA skill Fullstack (a do andar)
Commit                →  soltar a skill de camada do contexto
Verify                →  Harness (validate, security-review, qa/appsec)
                         SEM skills Fullstack
```

A regra de ouro: **uma skill de camada por turno de Execute.** O Harness continua dono dos gates de spec/tasks/state. O Fullstack acrescenta o gate `validate_layer_routing.py` para os `Files` vs o mapa em `PROJECT.md`.

## O que o produto não é

Não é um app de login. Não é um curso de Next.js. Não substitui `engineering-standards.md` nem o Verify do Harness. É o **mapa + manuais de andar** para o mesmo agente que você já usa.
