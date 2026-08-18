# Wiki — how to publish on GitHub

English **end-user** playbook only (install, Execute ritual, skills, registry, FAQ).

- npm install: **repository [README](https://github.com/luizssantiago92/agentic-fullstack/blob/main/README.md)** (three `npx` commands).

## Enable the wiki

**Settings → Features → Wikis** → enable.

## Sync pages from `wiki/` in the repo

For each file in this folder, create or edit a GitHub Wiki page. The **filename without `.md`** is the page title/slug (e.g. `How-to-use.md` → page **How-to-use**).

Copy `_Sidebar.md` contents into the wiki **Sidebar** (edit sidebar in the wiki UI).

## Remove obsolete pages

If you copied an older version of this wiki, **delete** these pages from the GitHub Wiki — they are intentionally **not** in the repo anymore:

- **Publishing** (removed — not public end-user docs)
- **Development** (removed — not public end-user docs)

After sync, the sidebar should match `_Sidebar.md` (10 product pages + FAQ, no Publishing or Development).

## What ships on npm

This `wiki/` folder is **not** included in the npm package. It is source for GitHub Wiki only.
