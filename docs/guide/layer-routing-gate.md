# Layer routing gate

Fullstack-owned Python gate. Seatbelt re-install must not delete it.

```bash
npx @luizsantiago/agentic-fullstack validate-layers my-feature
# same as:
python3 .specs/seatbelt/scripts/validate_layer_routing.py my-feature
```

After Seatbelt 2.2, scripts live under `.specs/seatbelt/scripts/`. Legacy `.specs/harness/scripts/` is still resolved as a fallback until Seatbelt 3.0.

Exit ≠ 0 when a task `Files` list matches two or more Floors.
