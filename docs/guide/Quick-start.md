# Quick start

## 1. Install (product repo)

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
```

Done when doctor prints `All checks passed`.

## 2. Adjust Lanes (if needed)

Edit `.specs/project/PROJECT.md` § **Layer registry** and § **Stack** if your paths are not `apps/web`, `apps/api`, `dbt`, etc. (Lane = path layer; older docs say “Floor”.)

After upgrading this package with new default globs:

```bash
npx @luizsantiago/fullstack-floor-map install --sync-registry
```

## 3. Before Execute

```bash
npx @luizsantiago/fullstack-floor-map validate-layers your-feature
```

Each task’s `Files` must match **one Lane** only.

## 4. During Execute

1. Seatbelt: hub + `references/implement.md` + `engineering-standards.md`  
2. Load **one** Lane manual (`*-engineering.md`) matching task `Files`  
3. Optionally load **one** specialist; open **≤2** craft `references/` for that skill only (not to discover other specialists)  
4. After commit, drop Lane manual + specialist  

On `/verify`, load **no** companion skills — Seatbelt Verify only.

### Planned: Desks (0.5.0)

When shipped: consult `.specs/desks/INDEX.md` → `DESK.md` → **preferred** specialist for continuity; append log/handoff after Execute. Paths are Floor Map–owned; Seatbelt must not delete `.specs/desks/`.

More: [How it works](How-it-works.md) · [Companion](Companion-spec-seatbelt.md) · [Specialist catalog](specialist-catalog.md)
