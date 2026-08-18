# Home

**Agentic Fullstack** (`@luizsantiago/agentic-fullstack`) is an npm **extension** of the [Spec-Driven Harness](https://github.com/luizssantiago92/spec-driven-harness). It ships **layer sister skills** — short application manuals for Execute — plus a routing rule and a Python gate.

The agent still **discovers** APIs, frameworks, and versions from your codebase, docs, and MCP. These skills say **how to apply** that knowledge on the right layer (tests, a11y, API validation, pipelines) at low token cost.

Current npm version: **0.3.3**. License: MIT.

## Start here

1. [Install](Install) — harness first, then fullstack
2. [CLI](CLI) — `install`, `doctor`, `--sync-registry`
3. [Layer skills](Layer-skills) — five sisters
4. [Layer registry](Layer-registry) — `PROJECT.md` globs
5. [Routing](Routing) — one layer per task, STOP if two
6. [Layer routing gate](Layer-routing-gate) — `validate_layer_routing.py`

## What this package is not

- Not an application (no login app, no example service)
- Not a framework tutorial
- Not a replacement for harness gates, `engineering-standards.md`, or Verify sisters

## Pages

| Page | Use when |
| --- | --- |
| [Install](Install) | First setup in a product repo |
| [CLI](CLI) | Flags and doctor issues |
| [Layer skills](Layer-skills) | Which skill to load |
| [Layer registry](Layer-registry) | Custom globs / `--sync-registry` |
| [Routing](Routing) | Execute vs Verify, STOP rule |
| [Layer routing gate](Layer-routing-gate) | CI / pre-Execute check |
| [Demo](Demo) | Spec-only `demo-login` |
| [Development](Development) | Working in this git repo |
| [Publishing](Publishing) | npm + git tags |
| [FAQ](FAQ) | Common pitfalls |
