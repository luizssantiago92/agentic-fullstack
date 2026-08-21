#!/usr/bin/env node
/**
 * Structural validation for Floors layer skills + specialist catalog.
 * Exit 0 = ok (warnings allowed to stdout); exit 1 = errors.
 *
 * Catalog checks inspired by jeffallan/claude-skills ReferencePathChecker
 * (sibling refs, no absolute paths) without importing the full plugin validator.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  EXPECTED_SKILL_COUNT,
  FLOORS_BANNER,
  UPSTREAM_VERSION,
  VERIFY_FORBIDDEN_SKILLS,
} from "../lib/catalog-pin.js";
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

function extractCitedPaths(text) {
  const prose = text.replace(/```[\s\S]*?```/g, "");
  const found = new Set();
  for (const m of prose.matchAll(/`([^`\s]+\.md)`/g)) {
    if (m[1]) found.add(m[1]);
  }
  for (const m of prose.matchAll(/\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g)) {
    if (m[1]) found.add(m[1]);
  }
  return [...found];
}

/**
 * @param {string} ref
 */
function isExemptRef(ref) {
  if (ref.startsWith("http://") || ref.startsWith("https://")) return true;
  if (!ref.includes("/")) return true;
  if (/[{<*]/.test(ref)) return true;
  return false;
}

/**
 * @param {string} skillRoot
 * @param {string} fileDir
 * @param {string} cited
 */
function resolveCitedPath(skillRoot, fileDir, cited) {
  if (typeof cited !== "string" || !cited) {
    return { ok: false, absolute: false };
  }
  if (path.isAbsolute(cited) || cited.startsWith("/Users/") || /^[A-Za-z]:[\\/]/.test(cited)) {
    return { ok: false, absolute: true };
  }
  const candidates = [path.join(fileDir, cited), path.join(skillRoot, cited)];
  return { ok: candidates.some((c) => fs.existsSync(c)), absolute: false };
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
  const skillIds = new Set(
    dirs.filter((id) => fs.existsSync(path.join(catalogRoot, id, "SKILL.md"))),
  );

  if (skillIds.size !== EXPECTED_SKILL_COUNT) {
    warn(
      `catalog has ${skillIds.size} skills (pin ${UPSTREAM_VERSION} expects ${EXPECTED_SKILL_COUNT})`,
    );
  }

  for (const id of VERIFY_FORBIDDEN_SKILLS) {
    if (!skillIds.has(id)) {
      fail(`verify-forbidden skill missing: ${id}`);
      continue;
    }
    const text = fs.readFileSync(path.join(catalogRoot, id, "SKILL.md"), "utf8");
    if (!/^\s*phase:\s*verify-forbidden\s*$/m.test(text)) {
      fail(`catalog/${id}: expected metadata.phase: verify-forbidden`);
    }
  }

  for (const id of skillIds) {
    const skillMd = path.join(catalogRoot, id, "SKILL.md");
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
    if (!text.includes("Full Stack Floor Map / Spec Seatbelt")) {
      fail(`catalog/${id}: missing Seatbelt/Floors pairing banner`);
    }
    // Banner text should match pin helper (allow minor whitespace)
    if (!text.includes(FLOORS_BANNER.slice(0, 40))) {
      warn(`catalog/${id}: banner may be stale vs lib/catalog-pin.js`);
    }

    const skillRoot = path.join(catalogRoot, id);
    const cited = extractCitedPaths(text);
    // Also scan reference files for broken sibling links
    const refDir = path.join(skillRoot, "references");
    const filesToScan = [skillMd];
    if (fs.existsSync(refDir)) {
      for (const name of fs.readdirSync(refDir)) {
        if (name.endsWith(".md")) filesToScan.push(path.join(refDir, name));
      }
    }
    for (const file of filesToScan) {
      const body = fs.readFileSync(file, "utf8");
      const fileDir = path.dirname(file);
      for (const rel of extractCitedPaths(body)) {
        if (isExemptRef(rel)) continue;
        const resolved = resolveCitedPath(skillRoot, fileDir, rel);
        if (resolved.absolute) {
          fail(
            `catalog/${id}: absolute path cited in ${path.relative(catalogRoot, file)}: ${rel}`,
          );
          continue;
        }
        if (!resolved.ok) {
          fail(
            `catalog/${id}: cited path missing (${path.relative(catalogRoot, file)}): ${rel}`,
          );
        }
      }
    }

    const relatedRaw = text.match(/^\s*related-skills:\s*(.*)$/m)?.[1]?.trim() ?? "";
    if (relatedRaw) {
      for (const ref of relatedRaw.split(",").map((s) => s.trim()).filter(Boolean)) {
        if (ref === "---") continue;
        if (!skillIds.has(ref)) {
          warn(`catalog/${id}: related-skills unknown id '${ref}'`);
        }
      }
    } else if (/^\s*related-skills:\s*$/m.test(text)) {
      warn(`catalog/${id}: related-skills is empty`);
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
  `\nvalidate-layer-skills: ok (${warnings.length} warning(s), catalog pin ${UPSTREAM_VERSION})`,
);
