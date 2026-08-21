import { existsSync } from "node:fs";
import { access, constants } from "node:fs/promises";
import path from "node:path";

import {
  LEGACY_SCRIPTS_DIR,
  SEATBELT_SCRIPTS_DIR,
} from "./constants.js";

/**
 * Prefer `.specs/seatbelt/scripts` when `_common.py` (or validate_spec.py) exists;
 * fall back to legacy `.specs/harness/scripts` (Seatbelt 2.x until 3.0).
 *
 * @param {string} cwd
 * @returns {Promise<string>} relative scripts dir
 */
export async function resolveScriptsDir(cwd) {
  for (const dir of [SEATBELT_SCRIPTS_DIR, LEGACY_SCRIPTS_DIR]) {
    for (const probe of ["_common.py", "validate_spec.py"]) {
      try {
        await access(path.join(cwd, dir, probe), constants.R_OK);
        return dir;
      } catch {
        /* try next */
      }
    }
  }
  return SEATBELT_SCRIPTS_DIR;
}

/**
 * Sync resolve for validate-layers.
 * @param {string} cwd
 * @returns {string}
 */
export function resolveScriptsDirSync(cwd) {
  for (const dir of [SEATBELT_SCRIPTS_DIR, LEGACY_SCRIPTS_DIR]) {
    for (const probe of ["_common.py", "validate_spec.py"]) {
      if (existsSync(path.join(cwd, dir, probe))) {
        return dir;
      }
    }
  }
  return SEATBELT_SCRIPTS_DIR;
}

/**
 * Prefer installed layer gate under seatbelt, then legacy, then package source.
 * @param {string} cwd
 * @param {string} filename
 * @param {string} packageFallback
 * @returns {string}
 */
export function resolveLayerGatePath(cwd, filename, packageFallback) {
  for (const dir of [SEATBELT_SCRIPTS_DIR, LEGACY_SCRIPTS_DIR]) {
    const candidate = path.join(cwd, dir, filename);
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return packageFallback;
}
