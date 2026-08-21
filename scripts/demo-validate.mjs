#!/usr/bin/env node
/**
 * CI / quick layer-gate check for all demo-* features in this git checkout.
 * Spec features are repo-only (not shipped on npm).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PACKAGE_ROOT } from "../lib/constants.js";

const featuresDir = path.join(PACKAGE_ROOT, ".specs/features");
const features = fs
  .readdirSync(featuresDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name.startsWith("demo-"))
  .map((e) => e.name)
  .sort();

if (features.length === 0) {
  console.error("No demo-* features under .specs/features/");
  process.exit(1);
}

let failed = false;
for (const feature of features) {
  const result = spawnSync(
    process.execPath,
    [path.join(PACKAGE_ROOT, "index.js"), "validate-layers", feature],
    { cwd: PACKAGE_ROOT, encoding: "utf8" },
  );
  const ok = (result.status ?? 1) === 0;
  console.log(`${ok ? "PASS" : "FAIL"}  validate-layers ${feature}`);
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (!ok) failed = true;
}

process.exit(failed ? 1 : 0);
