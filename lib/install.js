import fs from "node:fs/promises";
import path from "node:path";

import {
  CURSOR_RULES_DIR,
  HARNESS_HUB,
  PACKAGE_ROOT,
  PROJECT_DIR,
  PROJECT_FILE,
  RULE_ASSETS,
  SKILL_ASSETS,
  SKILL_DIRS,
} from "./constants.js";
import {
  ensureDir,
  pathExists,
  readFileSafe,
  writeFileIfMissing,
  writeFileSafe,
} from "./fs-utils.js";

/**
 * @param {string} src
 * @param {string} dest
 */
async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await writeFileSafe(dest, await fs.readFile(src, "utf8"));
}

/**
 * @param {{ cwd?: string, silent?: boolean }} [options]
 */
export async function install(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const log = options.silent ? () => {} : console.log;

  log("🚀 Installing Agentic Fullstack layer skills...");

  const hubPath = path.join(cwd, HARNESS_HUB);
  if (!(await pathExists(hubPath))) {
    log(
      "⚠️ Spec-Driven Harness not detected. Run first:\n" +
        "   npx @luizsantiago/agentic-harness install",
    );
  } else {
    log("✅ Harness hub found — extension is compatible.");
  }

  log("📦 Installing layer sister skills...");
  for (const skill of SKILL_ASSETS) {
    const src = path.join(PACKAGE_ROOT, "skills", skill);
    for (const dir of SKILL_DIRS) {
      const dest = path.join(cwd, dir, skill);
      await copyFile(src, dest);
      log(`✅ ${skill} → ${dir}`);
    }
  }

  log("📋 Installing project rule...");
  for (const rule of RULE_ASSETS) {
    const src = path.join(PACKAGE_ROOT, "rules", rule);
    const dest = path.join(cwd, CURSOR_RULES_DIR, rule);
    await copyFile(src, dest);
    log(`✅ ${rule} → ${CURSOR_RULES_DIR}`);
  }

  log("📝 Setting up project template...");
  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  const templatePath = path.join(PACKAGE_ROOT, "templates", PROJECT_FILE);
  await ensureDir(path.dirname(projectPath));
  const created = await writeFileIfMissing(
    projectPath,
    await fs.readFile(templatePath, "utf8"),
  );
  if (created) {
    log(`✅ ${PROJECT_DIR}/${PROJECT_FILE} initialized`);
  } else {
    log(`ℹ️ ${PROJECT_DIR}/${PROJECT_FILE} already exists — not overwritten`);
  }

  return { projectCreated: created };
}

/**
 * @param {{ cwd?: string, silent?: boolean }} [options]
 */
export async function doctor(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const log = options.silent ? () => {} : console.log;
  const issues = [];

  log("🩺 Agentic Fullstack doctor\n");

  const hubOk = await pathExists(path.join(cwd, HARNESS_HUB));
  log(`Harness hub: ${hubOk ? "✅ present" : "⚠️ missing (run agentic-harness install)"}`);
  if (!hubOk) {
    issues.push("harness_missing");
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

  const ruleOk = await pathExists(
    path.join(cwd, CURSOR_RULES_DIR, "fullstack-layer.mdc"),
  );
  log(`Rule fullstack-layer.mdc: ${ruleOk ? "✅" : "❌ missing"}`);
  if (!ruleOk) {
    issues.push("rule_missing");
  }

  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  const projectContent = await readFileSafe(projectPath);
  if (projectContent) {
    log(`PROJECT.md: ✅ present`);
    const hasRegistry = projectContent.includes("## Layer registry");
    log(`Layer registry section: ${hasRegistry ? "✅" : "⚠️ missing — add ## Layer registry"}`);
    if (!hasRegistry) {
      issues.push("layer_registry_missing");
    }
  } else {
    log(`PROJECT.md: ⚠️ missing — run agentic-fullstack install`);
    issues.push("project_missing");
  }

  const gatesPath = path.join(cwd, ".specs/harness/scripts/validate_spec.py");
  const gatesOk = await pathExists(gatesPath);
  log(`Harness gates: ${gatesOk ? "✅ present" : "⚠️ missing"}`);
  if (!gatesOk) {
    issues.push("gates_missing");
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
    log(`⚠️ ${issues.length} issue(s) found. Run: npx @luizsantiago/agentic-fullstack install`);
  }

  return { ok: issues.length === 0, issues, hubOk, pythonOk };
}
