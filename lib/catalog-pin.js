/**
 * Upstream catalog pin + Floors adaptations for jeffallan/claude-skills.
 * Kept in sync with docs/guide/catalog-status.md and NOTICE.
 */
export const UPSTREAM_REPO = "https://github.com/Jeffallan/claude-skills";

/** Pinned upstream release (content sync target). */
export const UPSTREAM_VERSION = "0.4.16";

/** Short SHA of the clone used when this pin was recorded (optional audit). */
export const UPSTREAM_COMMIT = "882ef55e377dbf9a4dbe496bb41ac6ccd0e555cf";

export const EXPECTED_SKILL_COUNT = 67;

/**
 * Skills that carry Floors/Seatbelt metadata beyond the banner.
 * Do not load on /verify — Seatbelt Verify sisters own that phase.
 */
export const VERIFY_FORBIDDEN_SKILLS = [
  "feature-forge",
  "fullstack-guardian",
  "secure-code-guardian",
  "test-master",
  "the-fool",
];

/** Injected after YAML frontmatter on every catalog SKILL.md. */
export const FLOORS_BANNER = `> **Full Stack Floor Map / Spec Seatbelt:** Load only during **Execute**, after the Floors layer manual for the matching \`Files\` layer. Do not invent APIs — discover them from the repo; unknowns go in \`STATE.md\`. Do not override task \`Gate\` or \`PROJECT.md\` test commands. On **/verify**, do **not** load this skill — use Spec Seatbelt Verify sisters instead. Examples below are illustrative.`;

/**
 * Catalog metadata.domain → Floors allowed (mirrors fullstack-layer.mdc).
 * @type {Record<string, string[]>}
 */
export const DOMAIN_TO_FLOORS = {
  frontend: ["frontend"],
  backend: ["backend"],
  "api-architecture": ["backend"],
  "data-ml": ["data", "analytics", "datascience"],
  language: ["frontend", "backend", "data", "analytics", "datascience"],
  quality: ["frontend", "backend", "data", "analytics", "datascience"],
  infrastructure: ["backend", "data"],
  devops: ["backend", "data"],
  security: ["frontend", "backend"],
  platform: ["frontend", "backend"],
  specialized: ["frontend", "backend", "data", "analytics", "datascience"],
  workflow: ["frontend", "backend", "data", "analytics", "datascience"],
};
