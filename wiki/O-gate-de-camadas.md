# O gate de camadas

Ferramenta chata de propósito: lê os **Files** de cada task e o mapa do `PROJECT.md`. É o semáforo antes do Execute.

```bash
python3 .specs/harness/scripts/validate_layer_routing.py minha-feature
```

Neste repositório do pacote:

```bash
npm run demo:validate
```

(isso corre só o spec [Demo](Demo).)

## Como ler o resultado

| O que aconteceu | Semáforo |
| --- | --- |
| Cada task bateu **um** andar | PASS — execute |
| Uma task bateu **dois** andares | FAIL — parte a task |
| Files não bateram em **nenhum** andar | PASS com **warn** — ajuste paths ou globs |
| Falta `tasks.md` | código 2 (uso) |

O arquivo vive em `.specs/harness/scripts/validate_layer_routing.py` depois do install. É **do Fullstack**, não do catálogo do Harness: reinstalar o Harness não deve apagá-lo; reinstalar o Fullstack atualiza-o.

A prova automática está em `test/gate.test.js` (1 camada, 2 camadas, 0 camadas, globstar). Não precisamos de um app falso para isso.
