import fs from "node:fs/promises";
import path from "node:path";

import {
  CATALOG_DIR,
  CURSOR_RULES_DIR,
  DEFAULT_LAYERS,
  EXTENSION_SCRIPT_ASSETS,
  PACKAGE_ROOT,
  PROJECT_DIR,
  PROJECT_FILE,
  RULE_ASSETS,
  SEATBELT_HUB,
  SEATBELT_SCRIPTS_DIR,
  SKILL_ASSETS,
  SKILL_DIRS,
} from "./constants.js";
import {
  findRegistryGlobDrift,
  renderProjectTemplate,
  replaceLayerRegistrySection,
} from "./project-template.js";
import {
  ensureDir,
  pathExists,
  readFileSafe,
  writeFileIfMissing,
  writeFileSafe,
} from "./fs-utils.js";
import { resolveScriptsDir } from "./scripts-dir.js";

const SKILL_BASENAME_RE = /^[\w-]+\.md$/;

/**
 * @param {string} src
 * @param {string} dest
 * @param {string} root
 */
async function copyFile(src, dest, root) {
  await ensureDir(path.dirname(dest), root);
  await writeFileSafe(dest, await fs.readFile(src, "utf8"), { root });
}

/**
 * Recursively copy a directory tree (for catalog specialists).
 * @param {string} srcDir
 * @param {string} destDir
 * @param {string} root
 */
async function copyDirRecursive(srcDir, destDir, root) {
  await ensureDir(destDir, root);
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(srcDir, entry.name);
    const to = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursive(from, to, root);
    } else if (entry.isFile()) {
      await copyFile(from, to, root);
    }
  }
}

/**
 * @param {string} projectContent
 * @returns {string[]}
 */
export function parseRegistrySkillFiles(projectContent) {
  const skillFiles = [];
  const lines = projectContent.split("\n");
  let inRegistry = false;

  for (const line of lines) {
    if (line.startsWith("## Layer registry")) {
      inRegistry = true;
      continue;
    }
    if (inRegistry && line.startsWith("## ")) {
      break;
    }
    if (!inRegistry || !line.startsWith("|")) {
      continue;
    }
    if (line.includes("---") || line.includes("Layer id")) {
      continue;
    }

    const cols = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length < 2) {
      continue;
    }

    const skillCol = cols[1];
    const match =
      skillCol.match(/`([^`]+)`/) ?? skillCol.match(/^([\w-]+\.md)$/);
    if (match) {
      skillFiles.push(match[1]);
    }
  }

  return skillFiles;
}

/**
 * List specialist catalog skill ids under package catalog/.
 * @returns {Promise<string[]>}
 */
export async function listCatalogSkillIds() {
  const catalogRoot = path.join(PACKAGE_ROOT, CATALOG_DIR);
  if (!(await pathExists(catalogRoot))) {
    return [];
  }
  const entries = await fs.readdir(catalogRoot, { withFileTypes: true });
  const ids = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillMd = path.join(catalogRoot, entry.name, "SKILL.md");
    if (await pathExists(skillMd)) {
      ids.push(entry.name);
    }
  }
  return ids.sort();
}

/**
 * @param {{ cwd?: string, silent?: boolean, force?: boolean, syncRegistry?: boolean }} [options]
 */
export async function install(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const log = options.silent ? () => {} : console.log;

  log("🚀 Installing Full Stack Floor Map (Floors + specialist catalog)...");

  const hubPath = path.join(cwd, SEATBELT_HUB);
  const hubOk = await pathExists(hubPath);
  if (!hubOk) {
    if (!options.force) {
      throw new Error(
        "Spec Seatbelt not detected. Run first:\n" +
          "   npx @luizsantiago/spec-seatbelt install\n" +
          "Or re-run with --force to install layer skills only (doctor will still require Seatbelt).",
      );
    }
    log(
      "⚠️ Spec Seatbelt not detected (--force). Layer skills only; run seatbelt install for gates.",
    );
  } else {
    log("✅ Seatbelt hub found — extension is compatible.");
  }

  log("📦 Installing Floors layer skills (legacy Execute)...");
  for (const skill of SKILL_ASSETS) {
    const src = path.join(PACKAGE_ROOT, "skills", skill);
    for (const dir of SKILL_DIRS) {
      const dest = path.join(cwd, dir, skill);
      await copyFile(src, dest, cwd);
      log(`✅ ${skill} → ${dir}`);
    }
  }

  log("📋 Installing project rule...");
  for (const rule of RULE_ASSETS) {
    const src = path.join(PACKAGE_ROOT, "rules", rule);
    const dest = path.join(cwd, CURSOR_RULES_DIR, rule);
    await copyFile(src, dest, cwd);
    log(`✅ ${rule} → ${CURSOR_RULES_DIR}`);
  }

  log("🔒 Installing extension gates → .specs/seatbelt/scripts/...");
  const scriptsDir = path.join(cwd, SEATBELT_SCRIPTS_DIR);
  await ensureDir(scriptsDir, cwd);
  for (const script of EXTENSION_SCRIPT_ASSETS) {
    const src = path.join(PACKAGE_ROOT, "gates", script);
    const dest = path.join(scriptsDir, script);
    await copyFile(src, dest, cwd);
    try {
      await fs.chmod(dest, 0o755);
    } catch {
      /* best effort */
    }
    log(`✅ ${script} → ${SEATBELT_SCRIPTS_DIR}`);
  }

  const catalogIds = await listCatalogSkillIds();
  if (catalogIds.length > 0) {
    log(`📚 Installing specialist catalog (${catalogIds.length} skills)...`);
    for (const id of catalogIds) {
      const srcDir = path.join(PACKAGE_ROOT, CATALOG_DIR, id);
      for (const dir of SKILL_DIRS) {
        const destDir = path.join(cwd, dir, id);
        await copyDirRecursive(srcDir, destDir, cwd);
      }
    }
    log(`✅ Specialist catalog → ${SKILL_DIRS.join(", ")}`);
  } else {
    log("ℹ️ No catalog/ specialists in package — Floors layers only.");
  }

  log("📝 Setting up project template...");
  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  await ensureDir(path.dirname(projectPath), cwd);

  let projectCreated = false;
  if (options.syncRegistry) {
    const existing = await readFileSafe(projectPath);
    if (!existing) {
      throw new Error(
        `${PROJECT_DIR}/${PROJECT_FILE} not found — run install first without --sync-registry`,
      );
    }
    const updated = replaceLayerRegistrySection(existing, DEFAULT_LAYERS);
    await writeFileSafe(projectPath, updated, { root: cwd });
    log(`✅ ${PROJECT_DIR}/${PROJECT_FILE} layer registry synced from package defaults`);
  } else {
    const created = await writeFileIfMissing(
      projectPath,
      renderProjectTemplate(DEFAULT_LAYERS),
      { root: cwd },
    );
    projectCreated = created;
    if (created) {
      log(`✅ ${PROJECT_DIR}/${PROJECT_FILE} initialized`);
    } else {
      log(`ℹ️ ${PROJECT_DIR}/${PROJECT_FILE} already exists — not overwritten`);
    }
  }

  return { projectCreated, catalogCount: catalogIds.length };
}

/**
 * @param {{ cwd?: string, silent?: boolean }} [options]
 */
export async function doctor(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const log = options.silent ? () => {} : console.log;
  const issues = [];
  const allowedSkills = new Set(SKILL_ASSETS);

  log("🩺 Full Stack Floor Map doctor\n");

  const hubOk = await pathExists(path.join(cwd, SEATBELT_HUB));
  log(
    `Seatbelt hub: ${hubOk ? "✅ present" : "⚠️ missing (run npx @luizsantiago/spec-seatbelt install)"}`,
  );
  if (!hubOk) {
    issues.push("seatbelt_missing");
  }

  for (const skill of SKILL_ASSETS) {
    for (const dir of SKILL_DIRS) {
      const p = path.join(cwd, dir, skill);
      const ok = await pathExists(p);
      log(`Skill ${skill} (${dir}): ${ok ? "✅" : "❌ missing"}`);
      if (!ok) {
        issues.push(`skill_missing:${dir}/${skill}`);
      }
    }
  }

  for (const rule of RULE_ASSETS) {
    const ruleOk = await pathExists(path.join(cwd, CURSOR_RULES_DIR, rule));
    log(`Rule ${rule}: ${ruleOk ? "✅" : "❌ missing"}`);
    if (!ruleOk) {
      issues.push("rule_missing");
    }
  }

  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  const projectContent = await readFileSafe(projectPath);
  if (projectContent) {
    log(`PROJECT.md: ✅ present`);
    const hasRegistry = projectContent.includes("## Layer registry");
    log(`Layer registry section: ${hasRegistry ? "✅" : "⚠️ missing — add ## Layer registry"}`);
    if (!hasRegistry) {
      issues.push("layer_registry_missing");
    } else {
      for (const skillFile of parseRegistrySkillFiles(projectContent)) {
        if (!SKILL_BASENAME_RE.test(skillFile)) {
          issues.push(`registry_invalid_skill:${skillFile}`);
          log(`Registry skill ${skillFile}: ❌ invalid basename`);
          continue;
        }
        if (!allowedSkills.has(skillFile)) {
          issues.push(`registry_unknown_skill:${skillFile}`);
          log(`Registry skill ${skillFile}: ⚠️ not shipped by this extension`);
        }
      }

      const drift = findRegistryGlobDrift(projectContent);
      for (const layerId of drift) {
        log(
          `Layer registry globs for "${layerId}": ⚠️ differ from package defaults (run install --sync-registry to update)`,
        );
      }
    }
  } else {
    log(`PROJECT.md: ⚠️ missing — run fullstack-floor-map install`);
    issues.push("project_missing");
  }

  const scriptsDir = await resolveScriptsDir(cwd);
  const gatesPath = path.join(cwd, scriptsDir, "validate_spec.py");
  const gatesOk = await pathExists(gatesPath);
  log(`Seatbelt gates (${scriptsDir}): ${gatesOk ? "✅ present" : "⚠️ missing"}`);
  if (!gatesOk) {
    issues.push("gates_missing");
  }

  let layerGateOk = false;
  for (const dir of [SEATBELT_SCRIPTS_DIR, scriptsDir]) {
    if (await pathExists(path.join(cwd, dir, "validate_layer_routing.py"))) {
      layerGateOk = true;
      log(`Layer routing gate: ✅ present (${dir})`);
      break;
    }
  }
  if (!layerGateOk) {
    log(`Layer routing gate: ⚠️ missing`);
    issues.push("layer_gate_missing");
  }

  const catalogIds = await listCatalogSkillIds();
  if (catalogIds.length > 0) {
    let missingCatalog = 0;
    for (const id of catalogIds) {
      const ok = await pathExists(path.join(cwd, ".cursor/skills", id, "SKILL.md"));
      if (!ok) missingCatalog += 1;
    }
    if (missingCatalog === 0) {
      log(`Specialist catalog: ✅ ${catalogIds.length} skills installed`);
    } else {
      log(
        `Specialist catalog: ⚠️ ${missingCatalog}/${catalogIds.length} missing under .cursor/skills (re-run install)`,
      );
      issues.push("catalog_incomplete");
    }
  } else {
    log(`Specialist catalog: ℹ️ none packaged`);
  }

  let pythonOk = false;
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execFileAsync = promisify(execFile);
    await execFileAsync("python3", ["--version"]);
    pythonOk = true;
  } catch {
    pythonOk = false;
  }
  log(`Python 3: ${pythonOk ? "✅ available" : "⚠️ not found (degraded gate mode)"}`);

  log("");
  if (issues.length === 0) {
    log("✨ All checks passed.");
  } else {
    log(`⚠️ ${issues.length} issue(s) found. Run: npx @luizsantiago/fullstack-floor-map install`);
  }

  return { ok: issues.length === 0, issues, hubOk, pythonOk };
}
