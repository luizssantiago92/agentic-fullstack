#!/usr/bin/env node
/**
 * Link agentic-fullstack into node_modules/.bin when developing at the package root.
 * npx resolves to the local package (same name as package.json) but npm does not
 * create a self-bin link — this script fixes that after `npm install`.
 *
 * Skipped when the package is installed as a dependency (INIT_CWD !== package root).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(pkgRoot, "index.js");
const initCwd = process.env.INIT_CWD
  ? path.resolve(process.env.INIT_CWD)
  : process.cwd();

if (!fs.existsSync(indexPath)) {
  process.exit(0);
}

if (initCwd !== pkgRoot) {
  process.exit(0);
}

const binDir = path.join(pkgRoot, "node_modules", ".bin");
const binPath = path.join(binDir, "agentic-fullstack");
const relativeIndex = path.relative(binDir, indexPath).replace(/\\/g, "/");

fs.mkdirSync(binDir, { recursive: true });

const shim = `#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const binDir = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(binDir, "${relativeIndex}");
const result = spawnSync(process.execPath, [indexPath, ...process.argv.slice(2)], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
`;

try {
  fs.rmSync(binPath, { force: true });
} catch {
  /* ignore */
}

fs.writeFileSync(binPath, shim, { mode: 0o755 });
