import fs from "node:fs/promises";
import path from "node:path";

function isPermissionError(err) {
  return err && (err.code === "EACCES" || err.code === "EPERM");
}

/**
 * @param {string} root
 * @param {string} destPath
 */
export function assertPathWithinRoot(root, destPath) {
  const resolvedRoot = path.resolve(root);
  const resolvedDest = path.resolve(destPath);
  if (
    resolvedDest !== resolvedRoot &&
    !resolvedDest.startsWith(resolvedRoot + path.sep)
  ) {
    throw new Error(
      `Refusing to write outside project root: ${destPath} — ` +
        "all install paths must stay under the target directory.",
    );
  }
}

/**
 * @param {string} destPath
 */
export async function assertSafeWriteTarget(destPath, root) {
  let st;
  try {
    st = await fs.lstat(destPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      if (root) {
        await assertNoSymlinkAncestors(root, destPath);
      }
      return;
    }
    if (isPermissionError(err)) {
      throw new Error(`Permission denied: cannot access ${destPath}`);
    }
    throw err;
  }

  if (st.isSymbolicLink()) {
    throw new Error(
      `Refusing to write through symlink: ${destPath} — ` +
        "remove the link or choose another destination before installing.",
    );
  }

  if (root) {
    await assertNoSymlinkAncestors(root, destPath);
  }
}

/**
 * Block writes when a parent of destPath is a symlink (path-escape via mkdir).
 * @param {string} root
 * @param {string} destPath
 */
async function assertNoSymlinkAncestors(root, destPath) {
  const resolvedRoot = path.resolve(root);
  let current = path.resolve(destPath);
  while (current !== resolvedRoot) {
    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    try {
      const st = await fs.lstat(parent);
      if (st.isSymbolicLink()) {
        throw new Error(
          `Refusing to write under symlink directory: ${parent} — ` +
            "remove the link or choose another destination before installing.",
        );
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
    current = parent;
  }
}

/**
 * @param {string} dirPath
 * @param {string} [root]
 */
export async function ensureDir(dirPath, root) {
  if (root) {
    assertPathWithinRoot(root, dirPath);
    await assertNoSymlinkAncestors(root, dirPath);
  }

  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (isPermissionError(err)) {
      throw new Error(`Permission denied: cannot create ${dirPath}`);
    }
    throw err;
  }
}

/**
 * @param {string} filePath
 * @param {string} content
 * @param {{ root?: string }} [options]
 */
export async function writeFileIfMissing(filePath, content, options = {}) {
  const { root } = options;
  if (root) {
    assertPathWithinRoot(root, filePath);
  }
  await assertSafeWriteTarget(filePath, root);

  try {
    await fs.writeFile(filePath, content, { encoding: "utf8", flag: "wx" });
    return true;
  } catch (err) {
    if (err.code === "EEXIST") {
      return false;
    }
    if (isPermissionError(err)) {
      throw new Error(`Permission denied: cannot write ${filePath}`);
    }
    throw err;
  }
}

/**
 * @param {string} filePath
 * @param {string} content
 * @param {{ root?: string }} [options]
 */
export async function writeFileSafe(filePath, content, options = {}) {
  const { root } = options;
  if (root) {
    assertPathWithinRoot(root, filePath);
  }
  await assertSafeWriteTarget(filePath, root);

  try {
    await fs.writeFile(filePath, content, "utf8");
  } catch (err) {
    if (isPermissionError(err)) {
      throw new Error(`Permission denied: cannot write ${filePath}`);
    }
    throw err;
  }
}

export async function readFileSafe(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    }
    if (isPermissionError(err)) {
      throw new Error(`Permission denied: cannot read ${filePath}`);
    }
    throw err;
  }
}

export async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export { isPermissionError };
