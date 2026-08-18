import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { HARNESS_SCRIPTS_DIR, PACKAGE_ROOT } from "./constants.js";

export const LAYER_GATE_FILENAME = "validate_layer_routing.py";

/**
 * Prefer the installed copy so consumers run what `install` last wrote.
 * Fall back to the package source (this git checkout / npm pack).
 * @param {string} [cwd]
 * @returns {string}
 */
export function resolveLayerGateScript(cwd = process.cwd()) {
  const installed = path.join(cwd, HARNESS_SCRIPTS_DIR, LAYER_GATE_FILENAME);
  if (fs.existsSync(installed)) {
    return installed;
  }
  return path.join(PACKAGE_ROOT, "gates", LAYER_GATE_FILENAME);
}

/**
 * @param {{ cwd?: string, target?: string }} [opts]
 * @returns {import("node:child_process").SpawnSyncReturns<string>}
 */
export function validateLayers(opts = {}) {
  const cwd = opts.cwd ?? process.cwd();
  const script = resolveLayerGateScript(cwd);
  if (!fs.existsSync(script)) {
    throw new Error(
      "Layer routing gate not found. Run: npx @luizsantiago/agentic-fullstack install",
    );
  }

  const args = [script];
  if (opts.target) {
    args.push(opts.target);
  }

  const result = spawnSync("python3", args, {
    cwd,
    encoding: "utf8",
  });

  if (result.error?.code === "ENOENT") {
    throw new Error(
      "python3 not found — install Python 3.10+ to run the layer gate",
    );
  }
  if (result.error) {
    throw result.error;
  }
  return result;
}
