# Install

Install into **your product repository** (the company app), not into thin air. Method first, then the map.

## 1. Harness

```bash
npx @luizsantiago/agentic-harness install
```

This places the hub (`agent-architecture.md`), process skills, and gates under `.specs/harness/scripts/`.

## 2. Fullstack

```bash
npx @luizsantiago/agentic-fullstack install
```

Copies the five skills, the `fullstack-layer.mdc` rule, the layer gate, and creates `.specs/project/PROJECT.md` **only if it does not already exist**.

## 3. Check

```bash
npx @luizsantiago/agentic-fullstack doctor
```

If you see “All checks passed”, the site and the floor plan are on the same ground.

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

The first refreshes skills, rule, and gate. The second updates **only** the Layer registry table in `PROJECT.md` (it does not touch Stack or the test commands you customized).

## Requirements

Node.js 18+. Python 3.10+ for the gates. Re-installing the Harness **does not delete** Fullstack skills.

Next: [How to use](How-to-use).
