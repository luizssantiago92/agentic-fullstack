import fs from "node:fs/promises";

function isPermissionError(err) {
  return err && (err.code === "EACCES" || err.code === "EPERM");
}

/**
 * @param {string} destPath
 */
export async function assertSafeWriteTarget(destPath) {
  let st;
  try {
    st = await fs.lstat(destPath);
  } catch (err) {
    if (err.code === "ENOENT") {
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
}

export async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (isPermissionError(err)) {
      throw new Error(`Permission denied: cannot create ${dirPath}`);
    }
    throw err;
  }
}

export async function writeFileIfMissing(filePath, content) {
  await assertSafeWriteTarget(filePath);

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

export async function writeFileSafe(filePath, content) {
  await assertSafeWriteTarget(filePath);

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
