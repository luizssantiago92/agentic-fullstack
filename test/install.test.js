import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import {
  HARNESS_HUB,
  PACKAGE_ROOT,
  PROJECT_DIR,
  PROJECT_FILE,
  SKILL_ASSETS,
} from "../lib/constants.js";
import { doctor, install } from "../lib/install.js";
import { pathExists, readFileSafe } from "../lib/fs-utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @param {string} prefix */
async function makeTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

/** Minimal harness hub to simulate installed harness. */
async function stubHarness(cwd) {
  const hubDir = path.join(cwd, path.dirname(HARNESS_HUB));
  await fs.mkdir(hubDir, { recursive: true });
  await fs.writeFile(
    path.join(cwd, HARNESS_HUB),
    "# Agent Architecture (stub for tests)\n",
    "utf8",
  );
  const scriptsDir = path.join(cwd, ".specs/harness/scripts");
  await fs.mkdir(scriptsDir, { recursive: true });
  await fs.writeFile(
    path.join(scriptsDir, "validate_spec.py"),
    "# stub\n",
    "utf8",
  );
}

test("install copies skills, rule, and creates PROJECT.md when missing", async () => {
  const cwd = await makeTempDir("afs-install-");
  await stubHarness(cwd);

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

test("install does not overwrite existing PROJECT.md", async () => {
  const cwd = await makeTempDir("afs-nooverwrite-");
  await stubHarness(cwd);
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
  await stubHarness(cwd);
  await install({ cwd, silent: true });

  const skillPath = path.join(cwd, ".cursor/skills", SKILL_ASSETS[0]);
  await fs.writeFile(skillPath, "# stale\n", "utf8");

  await install({ cwd, silent: true });
  const content = await readFileSafe(skillPath);
  assert.ok(content?.includes("Frontend Engineering"));
});

test("harness re-install simulation preserves extension skills", async () => {
  const cwd = await makeTempDir("afs-harness-sim-");
  await stubHarness(cwd);
  await install({ cwd, silent: true });

  // Simulate harness overwriting only its SKILL_ASSETS
  const harnessSkills = [
    "agent-architecture.md",
    "engineering-standards.md",
    "security-review.md",
  ];
  for (const skill of harnessSkills) {
    await fs.writeFile(
      path.join(cwd, ".cursor/skills", skill),
      `# harness ${skill}\n`,
      "utf8",
    );
  }

  for (const skill of SKILL_ASSETS) {
    const content = await readFileSafe(path.join(cwd, ".cursor/skills", skill));
    assert.ok(content?.includes("Engineering"));
  }
});

test("doctor passes after install", async () => {
  const cwd = await makeTempDir("afs-doctor-");
  await stubHarness(cwd);
  await install({ cwd, silent: true });

  const { ok, issues } = await doctor({ cwd, silent: true });
  assert.equal(ok, true);
  assert.deepEqual(issues, []);
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
});

test("token budget: layer skills stay lean", async () => {
  const front = await fs.readFile(
    path.join(PACKAGE_ROOT, "skills/frontend-engineering.md"),
    "utf8",
  );
  const back = await fs.readFile(
    path.join(PACKAGE_ROOT, "skills/backend-engineering.md"),
    "utf8",
  );
  const rule = await fs.readFile(
    path.join(PACKAGE_ROOT, "rules/fullstack-layer.mdc"),
    "utf8",
  );

  // chars / 4 ≈ tokens; cap layer skills ~2.5k tokens each per plan
  assert.ok(front.length / 4 < 2800, `frontend skill too large: ~${front.length / 4} tokens`);
  assert.ok(back.length / 4 < 2800, `backend skill too large: ~${back.length / 4} tokens`);
  assert.ok(rule.length / 4 < 600, `rule too large: ~${rule.length / 4} tokens`);
});
