#!/usr/bin/env node

import { PACKAGE_VERSION } from "./lib/constants.js";
import { doctor, install } from "./lib/install.js";
import { validateLayers } from "./lib/validate-layers.js";

const USAGE = `Usage: agentic-fullstack [command]

Commands:
  install [--force] [--sync-registry]   Install Floors layers, specialist catalog, rule, gates
  doctor              Check Spec Seatbelt + Floors + catalog health
  validate-layers [feature]   Run the layer routing gate (task Files vs PROJECT.md)
  --help              Show this message
  --version           Print the package version

Install order (recommended):
  npx @luizsantiago/spec-seatbelt install
  npx @luizsantiago/agentic-fullstack install

Package root development: run npm install first (prepare links the local bin), then npx works.

Options:
  --force          Install without Seatbelt hub (doctor will still require Seatbelt)
  --sync-registry  Update only the Layer registry section in existing PROJECT.md
`;

const [, , command, ...args] = process.argv;

if (command === "--version" || command === "-v" || command === "version") {
  console.log(PACKAGE_VERSION);
  process.exit(0);
} else if (!command || command === "--help" || command === "-h" || command === "help") {
  const out = command ? console.log : console.error;
  out(USAGE);
  process.exit(command ? 0 : 1);
} else if (command === "install") {
  const force = args.includes("--force");
  const syncRegistry = args.includes("--sync-registry");
  try {
    await install({ force, syncRegistry });
    console.log("✨ Fullstack layer skills installed.");
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
} else if (command === "doctor") {
  try {
    const { ok } = await doctor();
    process.exit(ok ? 0 : 1);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
} else if (command === "validate-layers") {
  const target = args.find((a) => !a.startsWith("-"));
  try {
    const result = validateLayers({ target });
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
    process.exit(result.status ?? 1);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
} else {
  console.error(USAGE);
  process.exit(1);
}
