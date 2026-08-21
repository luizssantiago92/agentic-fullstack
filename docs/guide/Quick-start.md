# Quick start

## 1. Install (product repo)

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/agentic-fullstack install
npx @luizsantiago/agentic-fullstack doctor
```

Done when doctor prints `All checks passed`.

## 2. Adjust Floors (if needed)

Edit `.specs/project/PROJECT.md` § **Layer registry** and § **Stack** if your paths are not `apps/web`, `apps/api`, `dbt`, etc.

After upgrading this package with new default globs:

```bash
npx @luizsantiago/agentic-fullstack install --sync-registry
```

## 3. Before Execute

```bash
npx @luizsantiago/agentic-fullstack validate-layers your-feature
```

## 4. During Execute

1. Seatbelt: hub + `references/implement.md` + `engineering-standards.md`  
2. Load **one** Floors skill matching task `Files`  
3. Optionally load **one** specialist whose domain matches that Floor; open **≤2** references for the topic  
4. After commit, drop layer + specialist  

On `/verify`, load **no** companion skills — Seatbelt Verify only.

More: [How it works](How-it-works.md) · [Specialist catalog](specialist-catalog.md)
