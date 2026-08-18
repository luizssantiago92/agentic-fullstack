# FAQ

## Qual é a diferença para o Harness?

Harness = processo SDD. Fullstack = em que andar a task vive. Leia [Por que Harness + Fullstack](Por-que-Harness-e-Fullstack).

## Posso carregar frontend e backend juntos “para ir mais rápido”?

Não. Esse é o anti-padrão que o produto existe para impedir. Parte a task.

## O `doctor` falhou depois de `--force`

Esperado. Instale o Harness e rode de novo o install Fullstack.

## O `install` não mudou o meu `PROJECT.md`

Normal. Use `--sync-registry` só para a tabela de camadas.

## O gate passou com `warn`

Zero andares. Os `Files` não estão no mapa. Não é vermelho, mas o Execute vai sem skill Fullstack — só `engineering-standards`.

## `npx` não encontra o comando neste repo do pacote

```bash
npm install
```

Ou `node index.js`.

## Cadê o app de exemplo?

Não há. A [Demo](Demo) é spec-only. O seu “hello world” é o primeiro login (ou o primeiro modelo) **no repo da empresa**.

## `**/etl/**` não casava no meu CI antigo

Bug de globstar, corrigido no **0.3.2**. Atualize e reinstale o gate.

## Um `.tsx` em `apps/api` — qual skill?

Backend, a partir do 0.3.2 (pasta ganha da extensão).
