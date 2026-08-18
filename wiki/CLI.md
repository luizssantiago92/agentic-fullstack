# CLI

O binário chama-se `agentic-fullstack`. No projeto da empresa você usa via `npx`.

## install — pôr as peças no disco

```bash
npx @luizsantiago/agentic-fullstack install
```

Copia skills (Cursor e Claude), a regra de routing, o gate Python, e cria `PROJECT.md` se faltar.

```bash
npx @luizsantiago/agentic-fullstack install --force
```

Igual, sem exigir Harness. O doctor ainda vai reclamar — o produto completo precisa dos dois.

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

Só reescreve a tabela **Layer registry**. Use depois de atualizar o pacote, se quiser os globs novos sem perder a seção Stack.

O install recusa escrever fora do repo, em arquivo symlink, ou debaixo de uma pasta que seja symlink (proteção de caminho).

## doctor — o check-up

```bash
npx @luizsantiago/agentic-fullstack doctor
```

Sai 0 se o hub do Harness, as cinco skills, a regra, o `PROJECT.md`, os gates do Harness e o gate de camadas estão lá. Códigos que você vai ver: `harness_missing`, `gates_missing`, `layer_gate_missing`, `skill_missing:…`, `registry_unknown_skill:…`.

Aviso de globs diferentes do pacote **não falha** o doctor. Python em falta também não (só degrada o gate).

## version / help

```bash
npx @luizsantiago/agentic-fullstack --version
npx @luizsantiago/agentic-fullstack --help
```

## Se `npx` não acha o comando *neste* git do pacote

Aí você está a desenvolver o **próprio** npm, não o app do cliente. Rode `npm install` na raiz (o `prepare` liga o bin local) ou use `node index.js install`. Detalhe em [Desenvolvimento](Desenvolvimento).
