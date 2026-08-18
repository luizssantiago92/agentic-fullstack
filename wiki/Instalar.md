# Instalar

Instale no **repositório do seu produto** (o app da empresa), não “no ar”. Primeiro o método, depois o mapa.

## 1. Harness

```bash
npx @luizsantiago/agentic-harness install
```

Isso coloca o hub (`agent-architecture.md`), as skills de processo e os gates em `.specs/harness/scripts/`.

## 2. Fullstack

```bash
npx @luizsantiago/agentic-fullstack install
```

Copia as cinco skills, a regra `fullstack-layer.mdc`, o gate de camadas, e cria `.specs/project/PROJECT.md` **só se ainda não existir**.

## 3. Conferir

```bash
npx @luizsantiago/agentic-fullstack doctor
```

Se sair “All checks passed”, o canteiro e a planta estão no mesmo terreno.

## Sem Harness (só os manuais)

```bash
npx @luizsantiago/agentic-fullstack install --force
```

Útil para experimentar. O `doctor` **continua a falhar** até o Harness existir — de propósito: o produto completo é a dupla.

## Depois de um upgrade do pacote

```bash
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack install --sync-registry
```

O primeiro atualiza skills, regra e gate. O segundo atualiza **apenas** a tabela Layer registry no `PROJECT.md` (não mexe em Stack nem nos comandos de teste que você personalizou).

## Requisitos

Node.js 18+. Python 3.10+ para os gates. Reinstalar o Harness **não apaga** as skills Fullstack.

Próximo: [Como usar no dia a dia](Como-usar).
