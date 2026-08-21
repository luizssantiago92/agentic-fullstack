import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

import { CATALOG_DIR, PACKAGE_ROOT } from "../lib/constants.js";
import { listCatalogSkillIds } from "../lib/install.js";

test("catalog ships ~67 specialist skills with SKILL.md", async () => {
  const ids = await listCatalogSkillIds();
  assert.ok(ids.length >= 60, `expected ~67 skills, got ${ids.length}`);
  assert.ok(ids.includes("react-expert"));
  assert.ok(ids.includes("ml-pipeline"));
  for (const id of ids.slice(0, 5)) {
    const skill = path.join(PACKAGE_ROOT, CATALOG_DIR, id, "SKILL.md");
    assert.equal(fs.existsSync(skillPath(skill)), true);
  }
});

function skillPath(p) {
  return p;
}

test("catalog skills include Floors/Seatbelt pairing banner", () => {
  const sample = path.join(PACKAGE_ROOT, CATALOG_DIR, "react-expert", "SKILL.md");
  const text = fs.readFileSync(sample, "utf8");
  assert.ok(text.includes("Full Stack Floor Map / Spec Seatbelt"));
  assert.ok(text.includes("Do not invent APIs") || text.includes("discover"));
});

test("validate-layer-skills script exits 0", async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    process.execPath,
    [path.join(PACKAGE_ROOT, "scripts/validate-layer-skills.mjs")],
    { cwd: PACKAGE_ROOT, encoding: "utf8" },
  );
  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
  }
  assert.equal(result.status, 0);
});
