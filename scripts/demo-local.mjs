#!/usr/bin/env node
/**
 * Local demo: bootstrap a sandbox, run layer gates + specialist smoke,
 * and print a manual playbook pointer.
 *
 * Usage:
 *   node scripts/demo-local.mjs
 *   node scripts/demo-local.mjs --workspace demo/workspace
 *   npm run demo:local
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PACKAGE_ROOT, SEATBELT_HUB, SEATBELT_SCRIPTS_DIR } from "../lib/constants.js";
import { doctor, install } from "../lib/install.js";
import {
  loadSmokeFixtures,
  runSpecialistSmoke,
} from "../lib/specialist-smoke.js";
import { validateLayers } from "../lib/validate-layers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_FEATURES = ["demo-login", "demo-etl", "demo-report", "demo-model"];
const FIXTURE = path.join(PACKAGE_ROOT, "demo/fixtures/specialist-smoke.json");
const PLAYBOOK = path.join(PACKAGE_ROOT, "demo/playbook.md");

function parseArgs(argv) {
  const args = { workspace: null, keep: false, skipInstall: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--workspace") {
      args.workspace = path.resolve(argv[++i]);
      args.keep = true;
    } else if (a === "--keep") {
      args.keep = true;
      args.workspace = args.workspace ?? path.join(PACKAGE_ROOT, "demo/workspace");
    } else if (a === "--skip-install") {
      args.skipInstall = true;
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/demo-local.mjs [--keep] [--workspace DIR] [--skip-install]

Bootstraps a local sandbox with Spec Seatbelt + Full Stack Floor Map,
validates demo-* layer features, and runs specialist smoke fixtures.
`);
      process.exit(0);
    }
  }
  return args;
}

/**
 * @param {string} cwd
 */
async function ensureSeatbelt(cwd) {
  const hub = path.join(cwd, SEATBELT_HUB);
  if (fs.existsSync(hub) && fs.existsSync(path.join(cwd, SEATBELT_SCRIPTS_DIR, "_common.py"))) {
    return { mode: "existing" };
  }

  const result = spawnSync(
    "npx",
    ["--yes", "@luizsantiago/spec-seatbelt@2", "install"],
    { cwd, encoding: "utf8", env: process.env },
  );
  if (result.status === 0 && fs.existsSync(hub)) {
    return { mode: "npx" };
  }

  // Offline / network fallback: stub minimal Seatbelt so Floor Map install + gate still run.
  await fsp.mkdir(path.dirname(hub), { recursive: true });
  await fsp.writeFile(hub, "# Agent Architecture (demo stub)\n", "utf8");
  const scripts = path.join(cwd, SEATBELT_SCRIPTS_DIR);
  await fsp.mkdir(scripts, { recursive: true });
  await fsp.writeFile(path.join(scripts, "_common.py"), "# stub\n", "utf8");
  await fsp.writeFile(path.join(scripts, "validate_spec.py"), "# stub\n", "utf8");
  console.log("⚠️ Seatbelt npx install unavailable — using stub hub for local demo.");
  return { mode: "stub", stderr: result.stderr };
}

/**
 * @param {string} cwd
 */
async function copyDemoFeatures(cwd) {
  const srcRoot = path.join(PACKAGE_ROOT, ".specs/features");
  for (const feature of DEMO_FEATURES) {
    const from = path.join(srcRoot, feature);
    const to = path.join(cwd, ".specs/features", feature);
    await fsp.mkdir(to, { recursive: true });
    for (const file of await fsp.readdir(from)) {
      await fsp.copyFile(path.join(from, file), path.join(to, file));
    }
  }
}

/**
 * @param {string} cwd
 * @param {string} feature
 */
function runFeatureGate(cwd, feature) {
  return validateLayers({ cwd, target: feature });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace =
    args.workspace ??
    (args.keep
      ? path.join(PACKAGE_ROOT, "demo/workspace")
      : await fsp.mkdtemp(path.join(os.tmpdir(), "floor-map-demo-")));

  console.log(`\n🧪 Full Stack Floor Map — local demo`);
  console.log(`   workspace: ${workspace}\n`);

  await fsp.mkdir(workspace, { recursive: true });

  if (!args.skipInstall) {
    const seatbelt = await ensureSeatbelt(workspace);
    console.log(`✓ Seatbelt ready (${seatbelt.mode})`);
    await install({ cwd: workspace, silent: false });
    const health = await doctor({ cwd: workspace, silent: false });
    if (!health.ok && seatbelt.mode !== "stub") {
      console.error("\n❌ doctor failed");
      process.exit(1);
    }
    if (!health.ok && seatbelt.mode === "stub") {
      console.log("⚠️ doctor soft-fail expected with Seatbelt stub (continuing)\n");
    }
  }

  await copyDemoFeatures(workspace);

  let gateFailed = false;
  console.log("── Layer routing (demo features) ──");
  for (const feature of DEMO_FEATURES) {
    const result = runFeatureGate(workspace, feature);
    const pass = (result.status ?? 1) === 0;
    if (!pass) gateFailed = true;
    const mark = pass ? "PASS" : "FAIL";
    console.log(`${mark}  validate-layers ${feature}`);
    if (result.stdout?.trim()) {
      for (const line of result.stdout.trim().split("\n").slice(0, 6)) {
        console.log(`     ${line}`);
      }
    }
    if (!pass && result.stderr) console.error(result.stderr);
  }

  console.log("\n── Specialist smoke (catalog triggers) ──");
  const cases = loadSmokeFixtures(FIXTURE);
  const smoke = runSpecialistSmoke(cases);
  for (const r of smoke.results) {
    const mark = r.ok ? "PASS" : "FAIL";
    const top = r.top.map((t) => `${t.id}(${r.ok ? t.score.toFixed?.(1) ?? t.score : t.score})`).join(", ");
    console.log(`${mark}  ${r.id} → expect ${r.expectSkill}`);
    console.log(`     top: ${top || "(none)"}`);
    if (r.reason) console.log(`     ${r.reason}`);
  }

  await fsp.mkdir(path.join(workspace, "demo"), { recursive: true });
  await fsp.copyFile(PLAYBOOK, path.join(workspace, "demo/playbook.md"));
  await fsp.copyFile(FIXTURE, path.join(workspace, "demo/specialist-smoke.json"));

  const summary = {
    workspace,
    gateFailed,
    smokeOk: smoke.ok,
    features: DEMO_FEATURES,
    smokePassed: smoke.results.filter((r) => r.ok).length,
    smokeTotal: smoke.results.length,
  };
  await fsp.writeFile(
    path.join(workspace, "demo/last-run.json"),
    JSON.stringify(summary, null, 2) + "\n",
    "utf8",
  );

  console.log("\n── Summary ──");
  console.log(`Layer gates: ${gateFailed ? "FAIL" : "PASS"} (${DEMO_FEATURES.length} features)`);
  console.log(
    `Specialist smoke: ${smoke.ok ? "PASS" : "FAIL"} (${summary.smokePassed}/${summary.smokeTotal})`,
  );
  console.log(`Playbook: ${path.join(workspace, "demo/playbook.md")}`);
  console.log(`Also: ${PLAYBOOK}`);

  if (gateFailed || !smoke.ok) {
    process.exit(1);
  }
  console.log("\n✨ Local demo passed. Use the playbook for manual agent checks.\n");
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
