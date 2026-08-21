# Rename / publish handoff

## Status (2026-08-21)

| Step | Status |
| --- | --- |
| GitHub repo → `fullstack-floor-map` | Done |
| Code/CLI/docs rename on `main` | Done |
| Publish `@luizsantiago/fullstack-floor-map@0.4.0` | **Done** (on npm) |
| Deprecate `@luizsantiago/agentic-fullstack` | **Pending — you run with npm token** |
| Update Spec Seatbelt companion docs | **Pending — needs PR on seatbelt repo** |

---

## 1. Publish (already done)

Verified:

```bash
npm view @luizsantiago/fullstack-floor-map version
# → 0.4.0
```

Install path:

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
```

Future publishes: GitHub Actions → **Publish to npm** on `main` (`workflow_dispatch` or release tag `v*`).

---

## 2. Deprecate the old package (you)

This cloud agent has **no npm login**. On a machine with your npm token (owner of `@luizsantiago`):

```bash
npm login   # or: export NODE_AUTH_TOKEN=…

# Point every published version at the new package
npm deprecate "@luizsantiago/agentic-fullstack" \
  "Package renamed to @luizsantiago/fullstack-floor-map. Use: npx @luizsantiago/fullstack-floor-map install"

# Optional — deprecate only 0.4.0 if you want older versions silent:
# npm deprecate "@luizsantiago/agentic-fullstack@0.4.0" "Renamed to @luizsantiago/fullstack-floor-map@0.4.0"
```

Check:

```bash
npm view @luizsantiago/agentic-fullstack deprecated
```

Do **not** unpublish unless you accept the npm unpublish rules; deprecate is enough.

---

## 3. Spec Seatbelt companion (PR on that repo)

This agent **cannot push** to `luizssantiago92/spec-seatbelt` (no write permission). Fix there:

### Files to update

| File | Change |
| --- | --- |
| `docs/guide/Companion-agentic-fullstack.md` | Rename → `Companion-fullstack-floor-map.md` **or** keep filename and rewrite body (see below) |
| `docs/guide/README.md` | Link/title → Full Stack Floor Map |
| `docs/guide/Home.md` | Link/title → Full Stack Floor Map |

### Body for companion (replace content)

Use package `@luizsantiago/fullstack-floor-map`, CLI `fullstack-floor-map`, repo `https://github.com/luizssantiago92/fullstack-floor-map`, display **Full Stack Floor Map**. Mention Floors + optional specialist catalog; Verify still Seatbelt-only; install order as above.

Suggested title: `# Companion: Full Stack Floor Map`

If you rename the file, update all links from `Companion-agentic-fullstack.md`.

### Quick local flow (on your machine)

```bash
git clone https://github.com/luizssantiago92/spec-seatbelt.git
cd spec-seatbelt
# edit docs/guide/Companion-*.md + README.md + Home.md
git checkout -b docs/companion-fullstack-floor-map
git commit -am "docs: companion Full Stack Floor Map rename"
git push -u origin HEAD
# open PR against main
```

---

## CLI alias note

`fullstack-floor-map` ships a bin alias `agentic-fullstack` for migration. After deprecate + Seatbelt docs, you can drop the alias in a later minor if desired.
