# FAQ

**Do I need Spec Seatbelt?**  
For a green `doctor`, yes. `--force` installs Floors + catalog without the hub; gates still need Seatbelt.

**Will Seatbelt wipe my Floors skills?**  
No. Extension-owned skills survive Seatbelt re-install.

**Why is the package large?**  
The specialist catalog (~67 skills) is intentional. Disk ≠ tokens — only loaded skills cost context.

**Can I load two specialists?**  
No — policy is one specialist `SKILL.md` per Execute turn (plus ≤2 refs).

**jeffallan/claude-skills shows multi-skill workflows (Feature Forge → … → Test Master). Why not here?**  
That guide is for the upstream Claude Code plugin. Floor Map is a **Seatbelt companion**: one Floor + one specialist per Execute turn keeps gates and token budgets honest. Use different specialists on **different** tasks/turns if needed — never stack them in one turn.

**Does install mean the specialist will activate when I ask to “build a site”?**  
Only if the agent follows Floors + descriptions: Seatbelt task with `Files` on a frontend glob → load `frontend-engineering.md` → then optionally `react-expert` (or similar). A free-form chat with no Seatbelt Execute context does not guarantee a catalog load. See [product activation proof](product-activation-proof.md).

**What about security/QA skills in the catalog?**  
They stay on disk for completeness. On **Verify** use Seatbelt sisters (`security-review`, `appsec`, `qa-strategy`) — never catalog specialists. Five skills are tagged `verify-forbidden` ([catalog-status](catalog-status.md)).

**Which upstream version is the catalog?**  
Pinned in [`lib/catalog-pin.js`](../../lib/catalog-pin.js) and [catalog-status.md](catalog-status.md) (currently **0.4.16**).
