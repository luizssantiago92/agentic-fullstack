import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import {
  DEFAULT_LAYERS,
  EXTENSION_SCRIPT_ASSETS,
  PACKAGE_ROOT,
  PROJECT_DIR,
  PROJECT_FILE,
  SEATBELT_HUB,
  SEATBELT_SCRIPTS_DIR,
  LEGACY_SCRIPTS_DIR,
  SKILL_ASSETS,
  renderLayerRegistryTable,
} from "../lib/constants.js";
import { doctor, install, parseRegistrySkillFiles } from "../lib/install.js";
import { renderProjectTemplate } from "../lib/project-template.js";
import {
  pathExists,
  readFileSafe,
  writeFileSafe,
} from "../lib/fs-utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @param {string} prefix */
async function makeTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

/**
 * Minimal Spec Seatbelt hub + gates (preferred path).
 * @param {string} cwd
 * @param {{ legacy?: boolean }} [opts]
 */
async function stubSeatbelt(cwd, opts = {}) {
  const hubDir = path.join(cwd, path.dirname(SEATBELT_HUB));
  await fs.mkdir(hubDir, { recursive: true });
  await fs.writeFile(
    path.join(cwd, SEATBELT_HUB),
    "# Agent Architecture (stub for tests)\n",
    "utf8",
  );
  const scriptsRel = opts.legacy ? LEGACY_SCRIPTS_DIR : SEATBELT_SCRIPTS_DIR;
  const scriptsDir = path.join(cwd, scriptsRel);
  await fs.mkdir(scriptsDir, { recursive: true });
  await fs.writeFile(
    path.join(scriptsDir, "validate_spec.py"),
    "# stub\n",
    "utf8",
  );
  await fs.writeFile(path.join(scriptsDir, "_common.py"), "# stub\n", "utf8");
}

/** @param {string} content */
function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

test("install copies skills, rule, and creates PROJECT.md when missing", async () => {
  const cwd = await makeTempDir("afs-install-");
  await stubSeatbelt(cwd);

  const { projectCreated } = await install({ cwd, silent: true });
  assert.equal(projectCreated, true);

  for (const skill of SKILL_ASSETS) {
    assert.equal(await pathExists(path.join(cwd, ".cursor/skills", skill)), true);
    assert.equal(await pathExists(path.join(cwd, ".claude/skills", skill)), true);
  }

  assert.equal(
    await pathExists(path.join(cwd, ".cursor/rules/fullstack-layer.mdc")),
    true,
  );

  const project = await readFileSafe(path.join(cwd, PROJECT_DIR, PROJECT_FILE));
  assert.ok(project?.includes("## Layer registry"));
});

test("install rejects when Seatbelt missing without --force", async () => {
  const cwd = await makeTempDir("afs-no-seatbelt-");
  await assert.rejects(
    () => install({ cwd, silent: true }),
    /Spec Seatbelt not detected/,
  );
});

test("install --force works without Seatbelt", async () => {
  const cwd = await makeTempDir("afs-force-");
  const { projectCreated } = await install({ cwd, silent: true, force: true });
  assert.equal(projectCreated, true);

  for (const skill of SKILL_ASSETS) {
    assert.equal(await pathExists(path.join(cwd, ".cursor/skills", skill)), true);
  }

  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, false);
  assert.ok(issues.includes("seatbelt_missing"));
  assert.ok(issues.includes("gates_missing"));
});

test("install does not overwrite existing PROJECT.md", async () => {
  const cwd = await makeTempDir("afs-nooverwrite-");
  await stubSeatbelt(cwd);
  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  await fs.mkdir(path.dirname(projectPath), { recursive: true });
  const custom = "# Custom PROJECT\n\n## Layer registry\n\ncustom\n";
  await fs.writeFile(projectPath, custom, "utf8");

  const { projectCreated } = await install({ cwd, silent: true });
  assert.equal(projectCreated, false);

  const after = await readFileSafe(projectPath);
  assert.equal(after, custom);
});

test("install refreshes extension skills on re-run", async () => {
  const cwd = await makeTempDir("afs-refresh-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  const skillPath = path.join(cwd, ".cursor/skills", SKILL_ASSETS[0]);
  await fs.writeFile(skillPath, "# stale\n", "utf8");

  await install({ cwd, silent: true });
  const content = await readFileSafe(skillPath);
  assert.ok(content?.includes("Frontend Engineering"));
});

test("seatbelt re-install simulation preserves extension skills", async () => {
  const cwd = await makeTempDir("afs-seatbelt-sim-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  const seatbeltSkills = [
    "agent-architecture.md",
    "engineering-standards.md",
    "security-review.md",
  ];
  for (const skill of seatbeltSkills) {
    await fs.writeFile(
      path.join(cwd, ".cursor/skills", skill),
      `# seatbelt ${skill}\n`,
      "utf8",
    );
  }

  for (const skill of SKILL_ASSETS) {
    const content = await readFileSafe(path.join(cwd, ".cursor/skills", skill));
    assert.ok(content?.includes("Engineering"));
  }
});

test("install preserves skill file checksums", async () => {
  const cwd = await makeTempDir("afs-checksum-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  for (const skill of SKILL_ASSETS) {
    const src = await fs.readFile(path.join(PACKAGE_ROOT, "skills", skill), "utf8");
    const dest = await fs.readFile(path.join(cwd, ".cursor/skills", skill), "utf8");
    assert.equal(sha256(src), sha256(dest));
    assert.equal(src, dest);
  }
});

test("writeFileSafe rejects paths outside project root", async () => {
  const cwd = await makeTempDir("afs-escape-");
  const outside = path.join(path.dirname(cwd), "escape-outside.md");
  await assert.rejects(
    () => writeFileSafe(outside, "x", { root: cwd }),
    /outside project root/,
  );
});

test("install refuses symlink skill destination", async () => {
  const cwd = await makeTempDir("afs-symlink-");
  await stubSeatbelt(cwd);
  const skillDir = path.join(cwd, ".cursor/skills");
  const target = path.join(cwd, "real-skill-target.md");
  const link = path.join(skillDir, SKILL_ASSETS[0]);
  await fs.mkdir(skillDir, { recursive: true });
  await fs.writeFile(target, "# real\n", "utf8");
  await fs.symlink(target, link);

  await assert.rejects(
    () => install({ cwd, silent: true }),
    /symlink/i,
  );
});

test("install refuses symlink parent directory", async () => {
  const cwd = await makeTempDir("afs-symlink-parent-");
  const outside = path.join(
    path.dirname(cwd),
    `${path.basename(cwd)}-outside-cursor`,
  );
  await fs.mkdir(path.join(outside, "skills"), { recursive: true });
  await fs.writeFile(
    path.join(outside, "skills", "agent-architecture.md"),
    "# Agent Architecture (stub for tests)\n",
    "utf8",
  );
  const scriptsDir = path.join(cwd, SEATBELT_SCRIPTS_DIR);
  await fs.mkdir(scriptsDir, { recursive: true });
  await fs.writeFile(path.join(scriptsDir, "validate_spec.py"), "# stub\n", "utf8");
  await fs.symlink(outside, path.join(cwd, ".cursor"));

  await assert.rejects(
    () => install({ cwd, silent: true }),
    /symlink/i,
  );
});

test("doctor fails when Seatbelt and gates are missing", async () => {
  const cwd = await makeTempDir("afs-doctor-fail-");
  await install({ cwd, silent: true, force: true });

  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, false);
  assert.ok(issues.includes("seatbelt_missing"));
  assert.ok(issues.includes("gates_missing"));
});

test("doctor passes after install", async () => {
  const cwd = await makeTempDir("afs-doctor-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, true);
  assert.deepEqual(issues, []);
});

test("doctor flags unknown registry skill files", async () => {
  const cwd = await makeTempDir("afs-registry-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  const project = await readFileSafe(projectPath);
  assert.ok(project);
  const updated = project.replace(
    "frontend-engineering.md",
    "mobile-engineering.md",
  );
  await fs.writeFile(projectPath, updated, "utf8");

  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, false);
  assert.ok(issues.includes("registry_unknown_skill:mobile-engineering.md"));
});

test("parseRegistrySkillFiles extracts skill basenames", async () => {
  const template = await fs.readFile(
    path.join(PACKAGE_ROOT, "templates", PROJECT_FILE),
    "utf8",
  );
  const skills = parseRegistrySkillFiles(template);
  assert.deepEqual(skills, SKILL_ASSETS);
});

test("DEFAULT_LAYERS matches template layer registry table", async () => {
  const template = await fs.readFile(
    path.join(PACKAGE_ROOT, "templates", PROJECT_FILE),
    "utf8",
  );
  const rendered = renderLayerRegistryTable(DEFAULT_LAYERS);
  for (const layer of DEFAULT_LAYERS) {
    assert.ok(template.includes(`| ${layer.id} | \`${layer.skill}\` |`));
    for (const glob of layer.globs) {
      assert.ok(template.includes(`\`${glob}\``));
    }
  }
  assert.ok(rendered.includes("frontend-engineering.md"));
  assert.ok(rendered.includes("backend-engineering.md"));
});

test("packaged skill files exist in package root", async () => {
  for (const skill of SKILL_ASSETS) {
    assert.equal(
      await pathExists(path.join(PACKAGE_ROOT, "skills", skill)),
      true,
    );
  }
  assert.equal(
    await pathExists(path.join(PACKAGE_ROOT, "rules/fullstack-layer.mdc")),
    true,
  );
  assert.equal(
    await pathExists(path.join(PACKAGE_ROOT, "templates", PROJECT_FILE)),
    true,
  );
  assert.equal(
    await pathExists(
      path.join(PACKAGE_ROOT, ".specs/features/demo-login/spec.md"),
    ),
    true,
  );
  assert.equal(
    await pathExists(
      path.join(PACKAGE_ROOT, ".specs/features/demo-login/tasks.md"),
    ),
    true,
  );
});

test("link-local-bin enables npx in package root", async () => {
  const binPath = path.join(PACKAGE_ROOT, "node_modules", ".bin", "agentic-fullstack");
  const { execFileSync } = await import("node:child_process");
  execFileSync(process.execPath, ["scripts/link-local-bin.mjs"], {
    cwd: PACKAGE_ROOT,
    env: { ...process.env, INIT_CWD: PACKAGE_ROOT },
  });
  assert.equal(await pathExists(binPath), true);
  const version = execFileSync(binPath, ["--version"], { encoding: "utf8" }).trim();
  assert.match(version, /^\d+\.\d+\.\d+$/);
});

test("install --sync-registry updates layer table without touching other sections", async () => {
  const cwd = await makeTempDir("afs-sync-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  const projectPath = path.join(cwd, PROJECT_DIR, PROJECT_FILE);
  const before = await readFileSafe(projectPath);
  assert.ok(before);
  const stale = before.replace(
    "| frontend | `frontend-engineering.md` |",
    "| frontend | `frontend-engineering.md` | `stale/**` |",
  );
  await fs.writeFile(projectPath, stale, "utf8");

  await install({ cwd, silent: true, syncRegistry: true });
  const after = await readFileSafe(projectPath);
  assert.ok(after?.includes("data-engineering.md"));
  assert.ok(after?.includes("analytics-engineering.md"));
  assert.ok(after?.includes("data-science-engineering.md"));
  assert.ok(!after?.includes("stale/**"));
  assert.ok(after?.includes("## Stack"));
});

test("renderProjectTemplate matches templates/PROJECT.md", async () => {
  const template = await fs.readFile(
    path.join(PACKAGE_ROOT, "templates", PROJECT_FILE),
    "utf8",
  );
  const rendered = renderProjectTemplate(DEFAULT_LAYERS);
  assert.equal(rendered, template);
});

test("install copies layer routing gate to seatbelt scripts dir", async () => {
  const cwd = await makeTempDir("afs-gate-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  for (const script of EXTENSION_SCRIPT_ASSETS) {
    const dest = path.join(cwd, SEATBELT_SCRIPTS_DIR, script);
    assert.equal(await pathExists(dest), true, `${script} should be installed`);
    const src = await fs.readFile(path.join(PACKAGE_ROOT, "gates", script), "utf8");
    const copied = await fs.readFile(dest, "utf8");
    assert.equal(src, copied);
  }
});

test("doctor accepts legacy harness scripts dir for Seatbelt gates", async () => {
  const cwd = await makeTempDir("afs-legacy-gates-");
  await stubSeatbelt(cwd, { legacy: true });
  await install({ cwd, silent: true });

  // install writes layer gate to seatbelt; seatbelt gates only on legacy
  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, true, issues.join(", "));
});

test("doctor flags missing layer routing gate", async () => {
  const cwd = await makeTempDir("afs-layer-gate-");
  await stubSeatbelt(cwd);
  await install({ cwd, silent: true });

  const gatePath = path.join(cwd, SEATBELT_SCRIPTS_DIR, EXTENSION_SCRIPT_ASSETS[0]);
  await fs.unlink(gatePath);

  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, false);
  assert.ok(issues.includes("layer_gate_missing"));
});

test("token budget: all layer skills and rule stay lean", async () => {
  for (const skill of SKILL_ASSETS) {
    const content = await fs.readFile(
      path.join(PACKAGE_ROOT, "skills", skill),
      "utf8",
    );
    assert.ok(
      content.length / 4 < 2800,
      `${skill} too large: ~${content.length / 4} tokens`,
    );
  }

  const rule = await fs.readFile(
    path.join(PACKAGE_ROOT, "rules/fullstack-layer.mdc"),
    "utf8",
  );
  assert.ok(rule.length / 4 < 600, `rule too large: ~${rule.length / 4} tokens`);
});

test("install copies specialist catalog when packaged", async () => {
  const cwd = await makeTempDir("afs-catalog-");
  await stubSeatbelt(cwd);
  const { catalogCount } = await install({ cwd, silent: true });
  if (catalogCount === 0) {
    return; // Floors-only checkout
  }
  assert.ok(catalogCount >= 60);
  assert.equal(
    await pathExists(path.join(cwd, ".cursor/skills/react-expert/SKILL.md")),
    true,
  );
  assert.equal(
    await pathExists(path.join(cwd, ".claude/skills/react-expert/SKILL.md")),
    true,
  );
});
