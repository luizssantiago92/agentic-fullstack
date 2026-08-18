# Development

This is for people who change the **package code** (`agentic-fullstack`), not the customer app.

```bash
npm install
npm test
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
npm run demo:validate
```

`npm install` is required here: `prepare` creates the local bin. Without it, `npx` answers `not found`. Alternative: `node index.js doctor`.

Tests: `test/install.test.js` (install, doctor, token budget, symlinks) and `test/gate.test.js` (routing). The `test/` folder **does not** ship on npm.

Harness runtime (`.cursor/`, `.specs/harness/`, `.specs/project/`) is gitignored — each developer machine installs it.
