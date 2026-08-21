# Companion Sync (Spec Seatbelt)

Process for keeping **Full Stack Floor Map** and **Spec Seatbelt** harmonious without merging the repos.

Seatbelt owns: spec, tasks, gates, loop-plan, Verify.  
Floor Map owns: Lanes (path layers), specialist catalog, and (planned) Desks memory.

## When to emit a sync update

After a Floor Map change that affects **pairing**, ownership of paths under `.specs/`, Execute/Verify load rules, install order, or companion naming:

1. Decide: does Seatbelt need a doc or coexistence change?  
2. **Yes** → add `docs/guide/Companion-sync-prompt-<topic>.md` and log a row below. Paste the prompt into a Seatbelt-only agent chat.  
3. **No** → log **Lego only — no Seatbelt sync** (companion still fits as an add-on).  
4. Mention the prompt (or “Lego only”) in the Floor Map PR body under **Companion Sync**.

## Prompt template (new topics)

```markdown
# Companion Sync Update — <topic>

**Target repo:** luizssantiago92/spec-seatbelt only.
**Floor Map version / branch:** <version or PR>
**Status:** planned | shipped

## What changed in Floor Map
- …

## What Seatbelt should do
1. …
2. Prefer docs/Lego-fit; do not implement Floor Map runtime inside Seatbelt.
3. Verify remains Seatbelt-only.

## Acceptance
- …
```

## Sync log

| Date | Topic | Prompt / note | Action |
| --- | --- | --- | --- |
| 2026-08-21 | Desks v3 (planned 0.5.0) | [Companion-sync-prompt-desks-v3.md](Companion-sync-prompt-desks-v3.md) | Sent to Seatbelt → [PR #80](https://github.com/luizssantiago92/spec-seatbelt/pull/80) |
| 2026-08-21 | Ack Seatbelt PR #80 | Floor Map docs aligned to companion contract | This repo — Lane/ownership/Desks planned; no runtime yet |

## Related

- [Companion: Spec Seatbelt](Companion-spec-seatbelt.md)  
- Seatbelt mirror: [Companion-fullstack-floor-map.md](https://github.com/luizssantiago92/spec-seatbelt/blob/cursor/companion-desks-v3-docs-29db/docs/guide/Companion-fullstack-floor-map.md)
