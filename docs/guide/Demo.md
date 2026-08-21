# Demo

Git-only examples (not on npm). Two ways to validate:

## 1. Layer gates only (CI / quick)

Requires Seatbelt + Floor Map already installed in this checkout (CI does that).

```bash
npm run demo:validate
# → validate-layers for every .specs/features/demo-* feature
```

| Feature | Floors exercised |
| --- | --- |
| `demo-login` | frontend + backend |
| `demo-etl` | data |
| `demo-report` | analytics |
| `demo-model` | datascience |

## 2. Local sandbox demo (recommended for catalog confidence)

Creates `demo/workspace/`, installs Seatbelt + Floor Map, runs all layer gates, then **specialist smoke** (prompt → expected catalog skill via triggers/description scoring).

```bash
npm install
npm run demo:local
```

Artifacts in `demo/workspace/demo/`:

- `last-run.json` — pass/fail summary  
- `playbook.md` — manual agent Execute / Verify checklist  

Specialist fixtures: [`demo/fixtures/specialist-smoke.json`](../demo/fixtures/specialist-smoke.json).

Manual follow-up: [playbook.md](../demo/playbook.md).

### What this proves vs does not

| Automated | Manual playbook |
| --- | --- |
| Install + doctor + routing for five Floors | Agent actually loads 1 Floor + 1 specialist |
| Catalog skill ranks for sample prompts | End-to-end code quality from a skill |

Smoke is a **routing heuristic**, not an LLM eval.
