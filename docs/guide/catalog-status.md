# Catalog status

Triage for the specialist catalog ported from jeffallan/claude-skills.

| Status | Meaning |
| --- | --- |
| `ported` | Copied with Floors/Seatbelt banner |
| `adapted` | Banner + metadata tweaks (e.g. `verify-forbidden`) |
| `needs-review` | Open for human content review |

Default after import: all skills are **ported** (or **adapted** if `phase: verify-forbidden`). Structural CI validates frontmatter and reference paths; content review is incremental by domain.

When you deeply edit a skill, set its row here to `adapted` or clear `needs-review`.
