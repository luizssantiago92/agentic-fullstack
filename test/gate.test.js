import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { PACKAGE_ROOT } from "../lib/constants.js";
import { install } from "../lib/install.js";
import { HARNESS_HUB } from "../lib/constants.js";

const GATE_SRC = path.join(PACKAGE_ROOT, "gates", "validate_layer_routing.py");

/** @param {string} prefix */
async function makeTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

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

/**
 * @param {string} cwd
 * @param {string} feature
 * @param {string} tasksBody
 */
async function writeFeature(cwd, feature, tasksBody) {
  const dir = path.join(cwd, ".specs", "features", feature);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "tasks.md"), tasksBody, "utf8");
}

function taskBlock(id, title, files) {
  return `### ${id}: ${title}
- **Requirement**: REQ-001
- **Files**: ${files}
- **Depends on**: —
- **Tests**: ${files.replace(/(\.\w+)$/, ".test$1")}
- **Gate**: echo ok
- **Done when**: Demo routing fixture
- [ ] complete
`;
}

/**
 * @param {string} cwd
 * @param {string} target
 */
function runGate(cwd, target) {
  return spawnSync("python3", [GATE_SRC, target], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, PYTHONPATH: "" },
  });
}

test("layer gate passes demo-login happy path", async () => {
  const cwd = await makeTempDir("afs-gate-ok-");
  await stubHarness(cwd);
  await install({ cwd, silent: true });
  await writeFeature(
    cwd,
    "demo-login",
    `# Demo\n\n${taskBlock("T1", "Render login form UI", "apps/web/src/components/LoginForm.tsx")}\n${taskBlock("T2", "Add login API endpoint", "apps/api/src/routes/login.ts")}\n`,
  );

  const result = runGate(cwd, "demo-login");
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /PASS/);
  assert.match(result.stdout, /T1 → layer frontend/);
  assert.match(result.stdout, /T2 → layer backend/);
});

test("layer gate fails when one task spans two layers", async () => {
  const cwd = await makeTempDir("afs-gate-fail-");
  await stubHarness(cwd);
  await install({ cwd, silent: true });
  await writeFeature(
    cwd,
    "bad-multi",
    `# Bad\n\n${taskBlock("T1", "Mix frontend and backend files", "apps/web/src/App.tsx, apps/api/src/routes/app.ts")}\n`,
  );

  const result = runGate(cwd, "bad-multi");
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stdout, /FAIL/);
  assert.match(result.stdout, /T1 spans layers backend, frontend/);
});

test("layer gate warns when files match zero layers", async () => {
  const cwd = await makeTempDir("afs-gate-warn-");
  await stubHarness(cwd);
  await install({ cwd, silent: true });
  await writeFeature(
    cwd,
    "no-layer",
    `# Docs\n\n${taskBlock("T1", "Update root readme only", "README.md")}\n`,
  );

  const result = runGate(cwd, "no-layer");
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /PASS/);
  assert.match(result.stdout, /T1 file README.md matches no layer/);
  assert.match(result.stdout, /T1 matches 0 layers/);
});
