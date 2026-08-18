# Desenvolvimento

Isto é para quem mexe no **código do pacote** (`agentic-fullstack`), não no app do cliente.

```bash
npm install
npm test
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate
```

`npm install` é obrigatório aqui: o `prepare` cria o bin local. Sem isso, `npx` responde `not found`. Alternativa: `node index.js doctor`.

Testes: `test/install.test.js` (install, doctor, token budget, symlinks) e `test/gate.test.js` (routing). A pasta `test/` **não** vai para o npm.

Runtime do Harness (`.cursor/`, `.specs/harness/`, `.specs/project/`) está no gitignore — instala-se na máquina de quem desenvolve.
