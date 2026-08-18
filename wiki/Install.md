# Install

Install into **your product repository** (the company app), not this npm git. Node.js 18+. Python 3.10+ for gates.

```bash
npx @luizsantiago/agentic-harness install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

1. **Harness** — hub (`agent-architecture.md`), process skills, and gates under `.specs/harness/scripts/`.
2. **Fullstack** — five skills, `fullstack-layer.mdc`, the layer gate, and `.specs/project/PROJECT.md` **only if it does not already exist**.
3. **Doctor** — “All checks passed” means both packages landed.

Flags and doctor codes: [CLI](CLI). Daily ritual: [How to use](How-to-use).

## Without Harness (manuals only)

```bash
npx @luizsantiago/agentic-fullstack install --force
```

Useful for a trial. `doctor` **keeps failing** until the Harness exists — on purpose: the complete product is the pair.

## After a package upgrade

```bash
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack install --sync-registry
```

The first refreshes skills, rule, and gate. The second updates **only** the Layer registry table in `PROJECT.md` (does not touch Stack or test commands you customized).

Re-installing the Harness **does not delete** Fullstack skills.
