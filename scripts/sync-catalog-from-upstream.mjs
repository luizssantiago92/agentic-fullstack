#!/usr/bin/env node
/**
 * Sync specialist catalog from jeffallan/claude-skills into catalog/.
 *
 * Usage:
 *   node scripts/sync-catalog-from-upstream.mjs --from /path/to/claude-skills
 *   node scripts/sync-catalog-from-upstream.mjs --from /path/to/claude-skills --write-index
 *
 * Does not clone network by default — pass a local checkout of the pinned tag.
 * Re-applies Floors/Seatbelt banner and verify-forbidden metadata.
 */
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  DOMAIN_TO_FLOORS,
  EXPECTED_SKILL_COUNT,
  FLOORS_BANNER,
  UPSTREAM_COMMIT,
  UPSTREAM_REPO,
  UPSTREAM_VERSION,
  VERIFY_FORBIDDEN_SKILLS,
} from "../lib/catalog-pin.js";
import { CATALOG_DIR, PACKAGE_ROOT } from "../lib/constants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { from: null, writeIndex: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--from") args.from = path.resolve(argv[++i]);
    else if (a === "--write-index") args.writeIndex = true;
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/sync-catalog-from-upstream.mjs --from <claude-skills-root> [--write-index] [--dry-run]

Pinned target: ${UPSTREAM_REPO} @ ${UPSTREAM_VERSION} (${UPSTREAM_COMMIT.slice(0, 7)})
`);
      process.exit(0);
    }
  }
  return args;
}

/**
 * @param {string} text
 */
function splitFrontmatter(text) {
  if (!text.startsWith("---\n")) {
    throw new Error("missing YAML frontmatter");
  }
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("unclosed YAML frontmatter");
  const fm = text.slice(4, end);
  const body = text.slice(end + 5);
  return { fm, body };
}

/**
 * Strip a previous Floors banner blockquote if present.
 * @param {string} body
 */
function stripBanner(body) {
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;
  if (i < lines.length && lines[i].startsWith(">")) {
    while (i < lines.length && (lines[i].startsWith(">") || lines[i].trim() === "")) {
      i += 1;
    }
  }
  return lines.slice(i).join("\n").replace(/^\n+/, "");
}

/**
 * Ensure metadata.phase: verify-forbidden for adapted skills.
 * @param {string} fm
 * @param {string} id
 */
function applyVerifyForbidden(fm, id) {
  const lines = fm.split("\n").filter((l) => !/^\s*phase:\s*verify-forbidden\s*$/.test(l));
  if (!VERIFY_FORBIDDEN_SKILLS.includes(id)) {
    return lines.join("\n");
  }
  // Insert after opening metadata: or after license if no metadata yet
  const out = [];
  let inserted = false;
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    if (!inserted && /^metadata:\s*$/.test(lines[i])) {
      out.push("  phase: verify-forbidden");
      inserted = true;
    }
  }
  if (!inserted) {
    out.push("metadata:");
    out.push("  phase: verify-forbidden");
  }
  return out.join("\n");
}

/**
 * @param {string} skillMd
 * @param {string} id
 */
function adaptSkillMd(skillMd, id) {
  const { fm, body } = splitFrontmatter(skillMd);
  const nextFm = applyVerifyForbidden(fm, id);
  const cleanBody = stripBanner(body);
  return `---\n${nextFm}\n---\n\n${FLOORS_BANNER}\n\n${cleanBody}`.replace(/\n+$/, "\n");
}

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  for (const entry of await fsp.readdir(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else if (entry.isFile()) {
      await fsp.copyFile(from, to);
    }
  }
}

/**
 * @param {string} catalogRoot
 */
function listSkillIds(catalogRoot) {
  return fs
    .readdirSync(catalogRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(catalogRoot, e.name, "SKILL.md")))
    .map((e) => e.name)
    .sort();
}

/**
 * Generate docs/guide/catalog-index.md from catalog frontmatter.
 * @param {string[]} ids
 * @param {string} catalogRoot
 */
function renderCatalogIndex(ids, catalogRoot) {
  /** @type {Map<string, { id: string, description: string, floors: string[], adapted: boolean }[]>} */
  const byDomain = new Map();
  for (const id of ids) {
    const text = fs.readFileSync(path.join(catalogRoot, id, "SKILL.md"), "utf8");
    const domain = text.match(/^\s*domain:\s*(.+)$/m)?.[1]?.trim() ?? "specialized";
    const description =
      text.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? "";
    const short =
      description.length > 120 ? description.slice(0, 117) + "…" : description;
    const floors = DOMAIN_TO_FLOORS[domain] ?? ["(see rule)"];
    const adapted = VERIFY_FORBIDDEN_SKILLS.includes(id);
    if (!byDomain.has(domain)) byDomain.set(domain, []);
    byDomain.get(domain).push({ id, description: short, floors, adapted });
  }

  const lines = [
    "# Specialist catalog index",
    "",
    `Generated from \`catalog/\` pinned to [jeffallan/claude-skills@${UPSTREAM_VERSION}](${UPSTREAM_REPO}/releases/tag/v${UPSTREAM_VERSION}) (\`${UPSTREAM_COMMIT.slice(0, 7)}\`).`,
    "",
    "**Load policy:** after the Floors layer manual, pick **at most one** specialist whose domain is allowed for the active Floor. Open **≤2** `references/`. Never on `/verify`.",
    "",
    "Do **not** chain multiple specialists in one Execute turn (unlike upstream multi-skill workflows).",
    "",
    "Regenerate: `node scripts/sync-catalog-from-upstream.mjs --from <upstream> --write-index`",
    "",
  ];

  for (const domain of [...byDomain.keys()].sort()) {
    const floors = DOMAIN_TO_FLOORS[domain]?.join(", ") ?? "see rule";
    lines.push(`## ${domain}`);
    lines.push("");
    lines.push(`Allowed Floors: \`${floors}\``);
    lines.push("");
    lines.push("| Skill | Notes |");
    lines.push("| --- | --- |");
    for (const row of byDomain.get(domain).sort((a, b) => a.id.localeCompare(b.id))) {
      const tag = row.adapted ? " _(adapted: verify-forbidden)_" : "";
      lines.push(`| \`${row.id}\` | ${row.description}${tag} |`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.from) {
    console.error("Missing --from <claude-skills-root>");
    process.exit(2);
  }
  const upstreamSkills = path.join(args.from, "skills");
  if (!fs.existsSync(upstreamSkills)) {
    console.error(`No skills/ under ${args.from}`);
    process.exit(1);
  }

  const versionJson = path.join(args.from, "version.json");
  if (fs.existsSync(versionJson)) {
    const v = JSON.parse(fs.readFileSync(versionJson, "utf8"));
    if (v.version && v.version !== UPSTREAM_VERSION) {
      console.warn(
        `WARN  upstream version.json is ${v.version}; pin in lib/catalog-pin.js is ${UPSTREAM_VERSION}`,
      );
    }
  }

  const ids = listSkillIds(upstreamSkills);
  if (ids.length !== EXPECTED_SKILL_COUNT) {
    console.error(
      `Expected ${EXPECTED_SKILL_COUNT} skills, found ${ids.length} under ${upstreamSkills}`,
    );
    process.exit(1);
  }

  const catalogRoot = path.join(PACKAGE_ROOT, CATALOG_DIR);
  console.log(`Sync ${ids.length} skills → ${catalogRoot}`);
  console.log(`Pin: ${UPSTREAM_VERSION} (${UPSTREAM_COMMIT.slice(0, 7)})`);

  if (args.dryRun) {
    console.log("Dry run — no writes");
    process.exit(0);
  }

  // Replace catalog tree
  await fsp.rm(catalogRoot, { recursive: true, force: true });
  await fsp.mkdir(catalogRoot, { recursive: true });

  for (const id of ids) {
    const src = path.join(upstreamSkills, id);
    const dest = path.join(catalogRoot, id);
    await copyDir(src, dest);
    const skillPath = path.join(dest, "SKILL.md");
    const adapted = adaptSkillMd(await fsp.readFile(skillPath, "utf8"), id);
    await fsp.writeFile(skillPath, adapted, "utf8");
  }

  if (args.writeIndex) {
    const indexPath = path.join(PACKAGE_ROOT, "docs/guide/catalog-index.md");
    await fsp.writeFile(indexPath, renderCatalogIndex(ids, catalogRoot), "utf8");
    console.log(`Wrote ${indexPath}`);
  }

  console.log(`✓ Synced ${ids.length} skills (adapted verify-forbidden: ${VERIFY_FORBIDDEN_SKILLS.length})`);
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
