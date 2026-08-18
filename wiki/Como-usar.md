# Como usar no dia a dia

Este é o ritual. Se a instalação foi o “ligar o estúdio”, isso é o **turno de trabalho**.

## Antes de Execute

1. Spec e tasks no formato do Harness (`spec.md`, `tasks.md`).
2. Cada task tem **Files** em um único andar (veja [Onde cada camada mora](Onde-cada-camada-mora)).
3. Rode o gate de camadas na feature:

```bash
python3 .specs/harness/scripts/validate_layer_routing.py minha-feature
```

PASS com um `ok T1 → layer frontend` (e outro para backend, etc.) = pode executar. FAIL = parte a task. WARN de 0 layers = os paths não bateram no mapa; ajuste `Files` ou o `PROJECT.md`.

## Durante Execute (juntar Harness + Fullstack)

Pense em duas camadas de manual, não em duas skills concorrentes:

| Peça | De onde | Papel no turno |
| --- | --- | --- |
| `engineering-standards.md` + `references/implement.md` | Harness | O *ciclo*: RED, Adequacy A–D, commit, o que é “done” |
| **Uma** skill `*-engineering.md` | Fullstack | O *andar*: teste estreito, a11y, contrato HTTP, pipeline, métrica de modelo |

No contexto do agente, deixe:

- Sempre: os dois arquivos do Harness acima
- **Mais uma:** a skill do andar (`frontend-engineering.md` *ou* `backend-engineering.md` *ou* data / analytics / datascience)
- Nunca: duas skills Fullstack no mesmo turno

O agente **descobre** a API do framework no código — se não souber, para e anota no `STATE.md`. A skill não substitui o Harness; ela só aperta o foco do Execute.

## Depois do commit

Tire a skill de camada do contexto. A próxima task pode ser outro andar; não deixe o manual de frontend contaminar a task de API.

## Verify (Harness só)

Não carregue skills Fullstack. Use a stack de Verify do Harness: `validate.md`, `security-review.md`, e no máximo um de `appsec.md` ou `qa-strategy.md`.

## Exemplo mental (login)

- T1 Files em `apps/web/...` → skill **frontend** + Harness implement.
- Commit. Soltar frontend.
- T2 Files em `apps/api/...` → skill **backend** + Harness implement.
- Feature fechada → `/verify` sem Fullstack.

O spec de exemplo no pacote está em [Demo](Demo).
