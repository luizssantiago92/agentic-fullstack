#!/usr/bin/env node

import { PACKAGE_VERSION } from "./lib/constants.js";
import { doctor, install } from "./lib/install.js";

const USAGE = `Usage: agentic-fullstack [command]

Commands:
  install [--force]   Install frontend/backend layer skills, rule, and PROJECT template
  doctor              Check harness + layer skills installation health
  --help              Show this message
  --version           Print the package version

Install order (recommended):
  npx @luizsantiago/agentic-harness install
  npx @luizsantiago/agentic-fullstack install

Package root development: run npm install first (prepare links the local bin), then npx works.

Options:
  --force   Install layer skills without harness (doctor will still require harness)
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
  try {
    await install({ force });
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
} else {
  console.error(USAGE);
  process.exit(1);
}
