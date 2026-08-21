# FAQ

**Do I need Spec Seatbelt?**  
For a green `doctor`, yes. `--force` installs Lane manuals + catalog without the hub; gates still need Seatbelt.

**Will Seatbelt wipe my Floor Map skills or Desks?**  
No. Extension-owned skills and catalog survive Seatbelt re-install. When Desks ship (0.5.0), `.specs/desks/` is also companion-owned — Seatbelt must not delete it.

**Floor vs Lane?**  
Same path-layer idea. Prefer **Lane** in new docs; “Floor” remains in 0.4.x transition text and some filenames.

**Why is the package large?**  
The specialist catalog (~67 skills) is intentional. Disk ≠ tokens — only loaded skills cost context.

**Can I load two specialists?**  
No — policy is one specialist `SKILL.md` per Execute turn (plus ≤2 craft refs). A Desk may *register* up to three specialists (planned); only one is loaded per turn.

**jeffallan/claude-skills shows multi-skill workflows. Why not here?**  
That guide is for the upstream Claude Code plugin. Floor Map is a **Seatbelt companion**: one Lane + one specialist per Execute turn. Use different specialists on **different** tasks/turns — never stack them in one turn.

**Does install mean the specialist will activate when I ask to “build a site”?**  
Only if the agent follows Lane + descriptions: Seatbelt task with `Files` on a frontend glob → load `frontend-engineering.md` → then optionally `react-expert`. Free-form chat without Seatbelt Execute does not guarantee a catalog load. See [product activation proof](product-activation-proof.md).

**What about security/QA skills in the catalog?**  
They stay on disk for completeness. On **Verify** use Seatbelt sisters (`security-review`, `appsec`, `qa-strategy`) — never catalog specialists. Five skills are tagged `verify-forbidden` ([catalog-status](catalog-status.md)).

**What are Desks?**  
Planned 0.5.0 work rooms with memory (INDEX + DESK.md + preferred + handoff). Not on npm yet. See [Companion-spec-seatbelt.md](Companion-spec-seatbelt.md).

**Which upstream version is the catalog?**  
Pinned in [`lib/catalog-pin.js`](../../lib/catalog-pin.js) and [catalog-status.md](catalog-status.md) (currently **0.4.16**).
