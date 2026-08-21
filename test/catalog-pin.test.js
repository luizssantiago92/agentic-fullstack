import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

import {
  EXPECTED_SKILL_COUNT,
  UPSTREAM_COMMIT,
  UPSTREAM_VERSION,
  VERIFY_FORBIDDEN_SKILLS,
} from "../lib/catalog-pin.js";
import { CATALOG_DIR, PACKAGE_ROOT } from "../lib/constants.js";

test("catalog pin metadata is recorded", () => {
  assert.equal(UPSTREAM_VERSION, "0.4.16");
  assert.match(UPSTREAM_COMMIT, /^[a-f0-9]{40}$/);
  assert.equal(VERIFY_FORBIDDEN_SKILLS.length, 5);
  assert.equal(EXPECTED_SKILL_COUNT, 67);
});

test("NOTICE and catalog-status cite the pin", () => {
  const notice = fs.readFileSync(path.join(PACKAGE_ROOT, "NOTICE"), "utf8");
  assert.match(notice, /0\.4\.16/);
  assert.match(notice, new RegExp(UPSTREAM_COMMIT.slice(0, 7)));
  const status = fs.readFileSync(
    path.join(PACKAGE_ROOT, "docs/guide/catalog-status.md"),
    "utf8",
  );
  assert.match(status, /0\.4\.16/);
  assert.match(status, /verify-forbidden/);
});

test("catalog-index lists pinned skills", () => {
  const index = fs.readFileSync(
    path.join(PACKAGE_ROOT, "docs/guide/catalog-index.md"),
    "utf8",
  );
  assert.match(index, /react-expert/);
  assert.match(index, /ml-pipeline/);
  assert.match(index, /at most one/);
  const ids = fs
    .readdirSync(path.join(PACKAGE_ROOT, CATALOG_DIR), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  assert.equal(ids.length, EXPECTED_SKILL_COUNT);
});

test("verify-forbidden skills keep phase metadata", () => {
  for (const id of VERIFY_FORBIDDEN_SKILLS) {
    const text = fs.readFileSync(
      path.join(PACKAGE_ROOT, CATALOG_DIR, id, "SKILL.md"),
      "utf8",
    );
    assert.match(text, /phase:\s*verify-forbidden/);
    assert.match(text, /Full Stack Floor Map \/ Spec Seatbelt/);
  }
});
