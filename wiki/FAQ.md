# FAQ

## `npx @luizsantiago/agentic-fullstack: not found` in this repo

Run `npm install` in the package root so `prepare` can link `node_modules/.bin/agentic-fullstack`. Or use `node index.js`.

## `doctor` fails after `--force`

Expected. `--force` installs skills without the harness. Install `@luizsantiago/agentic-harness` and re-run fullstack `install`, then `doctor`.

## `install` did not change my `PROJECT.md`

Normal install never overwrites it. Use `install --sync-registry` to refresh **only** the Layer registry table.

## Doctor warns that globs differ from defaults

Non-blocking. Either customize on purpose or run `--sync-registry`.

## Gate PASSes but prints `warn` for a task

That task’s `Files` matched **zero** layers. Refine paths in `tasks.md` or globs in `PROJECT.md`. Two-or-more layers is a **FAIL**, not a warn.

## Can I load frontend and backend skills together?

No. Split the task. The rule is **one layer skill per Execute turn**.

## Where is the example login app?

There isn’t one. See [Demo](Demo).

## Why did `**/etl/**` not match my file on old versions?

Before **0.3.2**, a pattern ending in `/**` was treated as a literal prefix, so nested globstars did not work. Upgrade and re-install the gate.

## `apps/api/foo.tsx` — frontend or backend?

**Backend** (longer path prefix `apps/api/**` wins over `**/*.tsx`), as of 0.3.2.
