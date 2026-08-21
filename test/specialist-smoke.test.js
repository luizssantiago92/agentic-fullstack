import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";

import { PACKAGE_ROOT } from "../lib/constants.js";
import {
  domainAllowsFloor,
  loadCatalogSkills,
  loadSmokeFixtures,
  rankSpecialists,
  runSpecialistSmoke,
  scoreSkill,
} from "../lib/specialist-smoke.js";

test("domain → Floor allow-list matches Floors rule", () => {
  assert.equal(domainAllowsFloor("frontend", "frontend"), true);
  assert.equal(domainAllowsFloor("frontend", "backend"), false);
  assert.equal(domainAllowsFloor("api-architecture", "backend"), true);
  assert.equal(domainAllowsFloor("data-ml", "analytics"), true);
  assert.equal(domainAllowsFloor("language", "datascience"), true);
});

test("react prompt ranks react-expert highly", () => {
  const skills = loadCatalogSkills();
  const react = skills.find((s) => s.id === "react-expert");
  assert.ok(react);
  const score = scoreSkill(
    react,
    "Build a React login form with useState in a .tsx file",
    "frontend",
  );
  assert.ok(score > 5, `score=${score}`);
  const top = rankSpecialists(
    skills,
    "Build a React login form with useState in a .tsx file",
    "frontend",
    3,
  );
  assert.ok(
    top.some((r) => r.id === "react-expert"),
    `top=${top.map((r) => r.id).join(",")}`,
  );
});

test("demo specialist smoke fixtures pass", () => {
  const fixture = path.join(PACKAGE_ROOT, "demo/fixtures/specialist-smoke.json");
  const cases = loadSmokeFixtures(fixture);
  assert.ok(cases.length >= 8);
  const { ok, results } = runSpecialistSmoke(cases);
  const failed = results.filter((r) => !r.ok);
  assert.equal(
    ok,
    true,
    failed.map((r) => r.reason).join("; "),
  );
});
