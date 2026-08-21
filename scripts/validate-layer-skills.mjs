#!/usr/bin/env node
/**
 * Structural validation for Floors layer skills + specialist catalog.
 * Exit 0 = ok (warnings allowed to stdout); exit 1 = errors.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CATALOG_DIR, PACKAGE_ROOT, SKILL_ASSETS } from "../lib/constants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

// --- Layer skills (legacy Floors) ---
for (const skill of SKILL_ASSETS) {
  const p = path.join(PACKAGE_ROOT, "skills", skill);
  if (!fs.existsSync(p)) {
    fail(`missing layer skill: ${skill}`);
    continue;
  }
  const text = fs.readFileSync(p, "utf8");
  if (text.length / 4 >= 2800) {
    fail(`${skill} exceeds token budget (chars/4 >= 2800)`);
  }
  if (!text.includes("name:")) {
    warn(`${skill}: missing name in frontmatter`);
  }
  if (!/Use when|Load when/i.test(text)) {
    warn(`${skill}: description should include Use when / Load when`);
  }
  // Description trap heuristic on first description line
  const desc = text.match(/^description:\s*(.+)$/m)?.[1] ?? "";
  if (/\bFirst\b.+\bthen\b/i.test(desc) || /\b1\.\s/.test(desc)) {
    fail(`${skill}: description looks like a process (Description Trap)`);
  }
}

const rule = path.join(PACKAGE_ROOT, "rules/fullstack-layer.mdc");
if (!fs.existsSync(rule)) {
  fail("missing fullstack-layer.mdc");
} else {
  const text = fs.readFileSync(rule, "utf8");
  if (text.length / 4 >= 600) {
    fail(`rule exceeds token budget (chars/4 >= 600)`);
  }
  if (!text.includes("1 specialist") && !text.includes("one specialist")) {
    warn("rule should document 1 specialist load policy");
  }
}

// --- Catalog ---
const catalogRoot = path.join(PACKAGE_ROOT, CATALOG_DIR);
if (!fs.existsSync(catalogRoot)) {
  warn("catalog/ missing — Floors-only package");
} else {
  const dirs = fs
    .readdirSync(catalogRoot)
    .filter((n) => fs.statSync(path.join(catalogRoot, n)).isDirectory());
  if (dirs.length < 60) {
    warn(`catalog has ${dirs.length} skills (expected ~67)`);
  }
  for (const id of dirs) {
    const skillMd = path.join(catalogRoot, id, "SKILL.md");
    if (!fs.existsSync(skillMd)) {
      fail(`catalog/${id}: missing SKILL.md`);
      continue;
    }
    const text = fs.readFileSync(skillMd, "utf8");
    if (!/^---/m.test(text)) {
      fail(`catalog/${id}: missing YAML frontmatter`);
      continue;
    }
    if (!/^name:\s/m.test(text)) {
      fail(`catalog/${id}: missing name`);
    }
    const desc = text.match(/^description:\s*(.+)$/m)?.[1] ?? "";
    if (desc.length > 1024) {
      fail(`catalog/${id}: description > 1024 chars`);
    }
    if (!/Use when|Invoke for/i.test(desc)) {
      warn(`catalog/${id}: description should include Use when / Invoke for`);
    }
    if (/\bFirst\b.+\bthen\b/i.test(desc)) {
      fail(`catalog/${id}: Description Trap in description`);
    }
    // Reference paths cited in tables / lists (incl. ../sibling/references/...)
    const skillRoot = path.join(catalogRoot, id);
    const refDir = path.join(skillRoot, "references");
    const refMentions = [
      ...text.matchAll(/`((?:\.\.\/)?[\w.-]+(?:\/[\w.-]+)*\/references\/[\w.-]+\.md)`/g),
      ...text.matchAll(/`?references\/([^`\s|]+)`?/g),
    ].map((m) => m[1]);
    for (const rel of new Set(refMentions)) {
      const candidates = [
        path.join(skillRoot, rel),
        path.join(refDir, rel),
        path.join(refDir, path.basename(rel)),
        path.resolve(skillRoot, rel),
      ];
      if (!candidates.some((c) => fs.existsSync(c))) {
        warn(`catalog/${id}: cited ref missing: ${rel}`);
      }
    }
    if (!text.includes("Full Stack Floor Map / Spec Seatbelt")) {
      warn(`catalog/${id}: missing Seatbelt/Floors pairing banner`);
    }
  }
}

for (const w of warnings) {
  console.log(`WARN  ${w}`);
}
for (const e of errors) {
  console.error(`ERROR ${e}`);
}

if (errors.length) {
  console.error(`\nvalidate-layer-skills: ${errors.length} error(s)`);
  process.exit(1);
}
console.log(
  `\nvalidate-layer-skills: ok (${warnings.length} warning(s), catalog checked)`,
);
