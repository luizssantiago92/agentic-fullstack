# CLI

The binary is `agentic-fullstack`. In the company app you call it via `npx`. Recommended order lives on [Install](Install) — this page is flags and doctor codes.

## Flags

```bash
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack install --force
npx @luizsantiago/agentic-fullstack install --sync-registry
```

- Default `install` requires Harness, copies skills (Cursor + Claude), the routing rule, the Python gate, and creates `PROJECT.md` if missing.
- `--force` skips the Harness check. `doctor` still fails until Harness exists.
- `--sync-registry` rewrites only the **Layer registry** table (keeps Stack / test commands).

Install refuses to write outside the repo, into a symlink file, or under a directory that is a symlink.

```bash
npx @luizsantiago/agentic-fullstack doctor
npx @luizsantiago/agentic-fullstack --version
npx @luizsantiago/agentic-fullstack --help
```

Doctor exit 0 only if the Harness hub, five skills, rule, `PROJECT.md`, Harness gates, and the layer gate are present. Codes: `harness_missing`, `gates_missing`, `layer_gate_missing`, `skill_missing:…`, `registry_unknown_skill:…`. Glob drift vs package defaults **does not fail** doctor. Missing Python does not fail either (the gate degrades).

If `npx` cannot find the command **in this package git**, run `npm install` first (links the local CLI), or use `node index.js install` / `node index.js doctor`.
