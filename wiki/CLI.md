# CLI

The binary is `agentic-fullstack`. In the company project you call it via `npx`.

## install — put the pieces on disk

```bash
npx @luizsantiago/agentic-fullstack install
```

Copies skills (Cursor and Claude), the routing rule, the Python gate, and creates `PROJECT.md` if missing.

```bash
npx @luizsantiago/agentic-fullstack install --force
```

Same, without requiring Harness. Doctor will still complain — the complete product needs both.

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

Rewrites only the **Layer registry** table. Use after upgrading the package if you want the new globs without losing the Stack section.

Install refuses to write outside the repo, into a symlink file, or under a directory that is a symlink (path protection).

## doctor — the check-up

```bash
npx @luizsantiago/agentic-fullstack doctor
```

Exit 0 if the Harness hub, the five skills, the rule, `PROJECT.md`, Harness gates, and the layer gate are present. Codes you will see: `harness_missing`, `gates_missing`, `layer_gate_missing`, `skill_missing:…`, `registry_unknown_skill:…`.

A glob-diff warning vs the package **does not fail** doctor. Missing Python does not fail either (it only degrades the gate).

## version / help

```bash
npx @luizsantiago/agentic-fullstack --version
npx @luizsantiago/agentic-fullstack --help
```

## If `npx` cannot find the command *in this package git*

Then you are developing the **npm package itself**, not the customer app. Run `npm install` at the root (`prepare` links the local bin) or use `node index.js install`. Details: [Development](Development).
