import fs from "node:fs";
import path from "node:path";

import { DOMAIN_TO_FLOORS } from "./catalog-pin.js";
import { CATALOG_DIR, PACKAGE_ROOT } from "./constants.js";

/** @typedef {{ id: string, name: string, description: string, domain: string, triggers: string[] }} CatalogSkill */
/** @typedef {{ id: string, prompt: string, floor: string, expectSkill: string, expectDomain?: string, topN?: number }} SmokeCase */
/** @typedef {{ id: string, ok: boolean, expectSkill: string, top: { id: string, score: number, domain: string }[], reason?: string }} SmokeResult */

export { DOMAIN_TO_FLOORS };

/**
 * @param {string} text
 * @returns {string[]}
 */
function tokenize(text) {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/i)
    .filter((t) => t.length >= 2);
}

/**
 * Parse one catalog SKILL.md into a searchable record.
 * @param {string} id
 * @param {string} text
 * @returns {CatalogSkill}
 */
export function parseCatalogSkill(id, text) {
  const name = text.match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? id;
  const description = text.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const domain = text.match(/^\s*domain:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const triggersRaw = text.match(/^\s*triggers:\s*(.+)$/m)?.[1] ?? "";
  const triggers = triggersRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return { id, name, description, domain, triggers };
}

/**
 * Load all packaged catalog skills.
 * @param {string} [catalogRoot]
 * @returns {CatalogSkill[]}
 */
export function loadCatalogSkills(catalogRoot = path.join(PACKAGE_ROOT, CATALOG_DIR)) {
  if (!fs.existsSync(catalogRoot)) return [];
  const skills = [];
  for (const entry of fs.readdirSync(catalogRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillPath = path.join(catalogRoot, entry.name, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    skills.push(parseCatalogSkill(entry.name, fs.readFileSync(skillPath, "utf8")));
  }
  return skills;
}

/**
 * Whether catalog domain is allowed for the active Floor (rule mapping).
 * @param {string} domain
 * @param {string} floor
 */
export function domainAllowsFloor(domain, floor) {
  const floors = DOMAIN_TO_FLOORS[domain];
  if (!floors) {
    // Unknown / cross-cutting domains: allow but do not prefer
    return true;
  }
  return floors.includes(floor);
}

/**
 * Score how well a skill matches a prompt for a Floor.
 * @param {CatalogSkill} skill
 * @param {string} prompt
 * @param {string} floor
 */
export function scoreSkill(skill, prompt, floor) {
  const promptTokens = new Set(tokenize(prompt));
  const promptLower = prompt.toLowerCase();
  let score = 0;

  if (promptLower.includes(skill.id.replace(/-/g, " ")) || promptLower.includes(skill.id)) {
    score += 8;
  }
  if (promptLower.includes(skill.name.toLowerCase())) {
    score += 6;
  }

  for (const trigger of skill.triggers) {
    const t = trigger.toLowerCase();
    if (t.length >= 3 && promptLower.includes(t)) {
      score += 5;
      continue;
    }
    const parts = tokenize(trigger);
    let hit = 0;
    for (const p of parts) {
      if (promptTokens.has(p)) hit += 1;
    }
    if (parts.length && hit === parts.length) score += 4;
    else if (hit > 0) score += hit;
  }

  for (const token of tokenize(skill.description).slice(0, 40)) {
    if (token.length >= 4 && promptTokens.has(token)) score += 0.25;
  }

  if (domainAllowsFloor(skill.domain, floor)) {
    score += 2;
  } else {
    score -= 10;
  }

  return score;
}

/**
 * Rank catalog skills for a prompt + Floor.
 * @param {CatalogSkill[]} skills
 * @param {string} prompt
 * @param {string} floor
 * @param {number} [limit]
 */
export function rankSpecialists(skills, prompt, floor, limit = 5) {
  return skills
    .map((skill) => ({
      id: skill.id,
      domain: skill.domain,
      score: scoreSkill(skill, prompt, floor),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}

/**
 * Run smoke fixtures against the catalog.
 * @param {SmokeCase[]} cases
 * @param {CatalogSkill[]} [skills]
 * @returns {{ ok: boolean, results: SmokeResult[] }}
 */
export function runSpecialistSmoke(cases, skills = loadCatalogSkills()) {
  /** @type {SmokeResult[]} */
  const results = [];
  for (const c of cases) {
    const topN = c.topN ?? 3;
    const top = rankSpecialists(skills, c.prompt, c.floor, Math.max(topN, 5));
    const ids = top.slice(0, topN).map((r) => r.id);
    const hit = ids.includes(c.expectSkill);
    const matched = skills.find((s) => s.id === c.expectSkill);
    const domainOk =
      !c.expectDomain || matched?.domain === c.expectDomain;
    const ok = Boolean(hit && domainOk);
    results.push({
      id: c.id,
      ok,
      expectSkill: c.expectSkill,
      top: top.slice(0, topN),
      reason: ok
        ? undefined
        : `expected ${c.expectSkill} in top ${topN}, got [${ids.join(", ")}]`,
    });
  }
  return { ok: results.every((r) => r.ok), results };
}

/**
 * @param {string} fixturePath
 * @returns {SmokeCase[]}
 */
export function loadSmokeFixtures(fixturePath) {
  return JSON.parse(fs.readFileSync(fixturePath, "utf8"));
}
