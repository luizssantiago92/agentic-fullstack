# Companion Sync Prompt — Desks v3 (planned)

**Copy everything below the line into a Spec Seatbelt–only agent chat.**

Floor Map status: Desks are **agreed / planned for 0.5.0**, not shipped on npm yet. Seatbelt should prepare companion docs so both packages work as one system when Desks land. Do not assume `.specs/desks/` exists until Floor Map publishes Desks.

---

Title: Align Spec Seatbelt companion docs with Full Stack Floor Map Desks (planned 0.5.0)

**Repo:** `luizssantiago92/spec-seatbelt` only. Do not edit `fullstack-floor-map` unless asked.

### Context

You maintain Spec Seatbelt. The companion npm package is `@luizsantiago/fullstack-floor-map` (display name: **Full Stack Floor Map**). Today (0.4.x) it ships:

- Five path-layer manuals (`*-engineering.md`) + `validate_layer_routing.py` + specialist catalog (~67 skills)
- Pairing: one path layer per task `Files`; Execute may load one specialist; **Verify = Seatbelt only**

A **planned v3 (0.5.0)** redesign is agreed but **not shipped yet**. Update Seatbelt companion docs so that when both packages are installed, agents treat them as one harmonious system. Prefer Lego-fit docs/links; only change Seatbelt core skills/gates if pairing wording would otherwise conflict.

### Planned Floor Map model (Desks)

- **Desk** = work room with memory (`.specs/desks/<id>/DESK.md`), not named frontend/backend. Unlimited desks; max **3 specialists** registered per desk; **preferred** specialist for continuity; **handoff** section when preferred switches (still **one** specialist loaded per turn).
- **INDEX** = `.specs/desks/INDEX.md` — lookup desks / specialists / last touched before creating a new desk.
- **Lane** = today’s path-layer concept (globs + `*-engineering.md` + `validate-layers`). Renamed in narrative only; keeps filesystem safety (do not mix `apps/web` and `apps/api` in one task `Files`).
- **references/** on specialists = deep craft for the *current* skill, **not** a router to other specialists.
- Rejected forever on Floor Map side: multi-specialist load in one turn; catalog on Verify; auto-evict of specialists; typed FE/BE desks; Floor Map-owned sub-agent runtime.

### Ownership (harmony)

| Piece | Owner |
| --- | --- |
| Spec, tasks, gates, loop-plan, Verify | Seatbelt |
| Lane + `validate-layers` | Floor Map |
| Desk + INDEX + handoff | Floor Map (when shipped) |
| Specialist catalog | Floor Map |
| Verify sisters | Seatbelt only |

### What to change in Seatbelt

1. Find companion doc(s) (e.g. `docs/guide/Companion-agentic-fullstack.md` or Floor Map companion). Update display name to **Full Stack Floor Map** and npm `@luizsantiago/fullstack-floor-map` (retire `agentic-fullstack` naming in docs).
2. Document install order:

```bash
npx @luizsantiago/spec-seatbelt install
npx @luizsantiago/fullstack-floor-map install
npx @luizsantiago/fullstack-floor-map doctor
```

3. Describe the harmony loop:
   - Specify/Tasks (Seatbelt) with one **Lane** per task `Files`
   - `npx @luizsantiago/fullstack-floor-map validate-layers <feature>`
   - Execute: Seatbelt implement set + **one Lane manual** + Desk lookup when Desks exist (`INDEX` → `DESK.md` → preferred specialist) + at most one catalog `SKILL.md` (≤2 craft refs)
   - After Execute: Floor Map may append Desk log / handoff / INDEX under `.specs/desks/` (companion-owned)
   - **/verify**: Seatbelt Verify sisters only — no Lane manuals, no catalog, no desk staffing skills
4. Note Desks paths as **companion-owned**; Seatbelt reinstall must **not** delete `.specs/desks/` (same spirit as not wiping Floor Map skills / catalog).
5. If `agent-architecture` / Execute text mentions only “fullstack floors”: add a short pointer that Floor Map may add Desk memory + specialist continuity without changing Seatbelt Verify ownership.
6. Do **not** implement Desk runtime, INDEX writers, or catalog install inside Seatbelt. Docs + non-destructive coexistence only.
7. Commit, push, open/update a PR. If companion docs are already correct aside from rename, reply with **no Seatbelt change needed** and cite files checked.

### Acceptance

- Companion doc states Desk vs Lane vs Seatbelt ownership clearly (mark Desks as planned until Floor Map 0.5.0)
- Verify remains Seatbelt-only
- An agent reading both guides can run a feature with both packages without conflicting load rules
- Code and docs in English; match existing Seatbelt guide style

### Optional after Floor Map ships Desks

When `@luizsantiago/fullstack-floor-map` publishes Desks, expect a follow-up Companion Sync prompt (“Desks shipped”) with real paths and version — update “planned” language to shipped and link Floor Map guide pages.
