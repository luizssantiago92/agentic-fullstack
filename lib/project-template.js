import { DEFAULT_LAYERS, renderLayerRegistryTable } from "./constants.js";

const FUTURE_LAYERS_NOTE =
  "Future layers (not shipped by default): add a row + install `{layer}-engineering.md` — e.g. `mobile`, `cli`, `embedded`.";

/**
 * Build the ## Layer registry section (heading through table and future note).
 * @param {typeof DEFAULT_LAYERS} layers
 */
export function buildLayerRegistrySection(layers = DEFAULT_LAYERS) {
  return `## Layer registry

One layer skill per row. Task \`Files\` must match **at most one** layer per task.

${renderLayerRegistryTable(layers)}

${FUTURE_LAYERS_NOTE}
`;
}

/**
 * Full PROJECT.md content from DEFAULT_LAYERS.
 * @param {typeof DEFAULT_LAYERS} [layers]
 */
export function renderProjectTemplate(layers = DEFAULT_LAYERS) {
  return `# Project Configuration

Configure stack, layer globs, and test commands for your repository. The agent reads this file during Execute to route layer sister skills.

## Stack

Describe your stack in one short paragraph (frameworks, monorepo layout, package manager). Example:

- Frontend: React 19 + Vite in \`apps/web\`
- Backend: Fastify + Prisma in \`apps/api\`
- Package manager: pnpm workspaces

${buildLayerRegistrySection(layers)}
## Test commands

Discover from this section before each task. Prefer the narrowest command the task \`Gate\` names.

| Scope | Command | Notes |
| --- | --- | --- |
| frontend | \`pnpm --filter web test\` | Adjust to your workspace |
| backend | \`pnpm --filter api test\` | Integration/API tests |
| data | \`dbt test\` or project pipeline test command | Data quality / transforms |
| analytics | \`pytest analytics/\` or notebook smoke | Reports / EDA |
| datascience | \`pytest ml/\` or experiment runner | Model training / evaluation |
| full | \`pnpm test\` | Run before closing Execute |

## Lint commands

| Scope | Command |
| --- | --- |
| frontend | \`pnpm --filter web lint\` |
| backend | \`pnpm --filter api lint\` |
| data | configure per stack (sqlfluff / dbt) |
| analytics | configure per stack |
| datascience | configure per stack (ruff / pytest lint) |
| full | \`pnpm lint\` |

## Constraints

- Artifacts remain in English (harness rule).
- Layer tasks must not share the same file in parallel (harness \`validate_tasks.py\`).
- When globs overlap, refine paths in this file or split tasks.
`;
}

/**
 * @param {string} content
 * @param {typeof DEFAULT_LAYERS} layers
 */
export function replaceLayerRegistrySection(content, layers = DEFAULT_LAYERS) {
  const marker = "## Layer registry";
  const start = content.indexOf(marker);
  if (start === -1) {
    throw new Error("PROJECT.md is missing ## Layer registry section");
  }

  const nextHeading = content.indexOf("\n## ", start + marker.length);
  const newSection = `${buildLayerRegistrySection(layers)}\n`;
  if (nextHeading === -1) {
    return content.slice(0, start) + newSection;
  }
  return content.slice(0, start) + newSection + content.slice(nextHeading + 1);
}

/**
 * Parse layer id and globs from registry table rows.
 * @param {string} projectContent
 * @returns {Map<string, string[]>}
 */
export function parseRegistryLayers(projectContent) {
  const layers = new Map();
  const lines = projectContent.split("\n");
  let inRegistry = false;

  for (const line of lines) {
    if (line.startsWith("## Layer registry")) {
      inRegistry = true;
      continue;
    }
    if (inRegistry && line.startsWith("## ")) {
      break;
    }
    if (!inRegistry || !line.startsWith("|")) {
      continue;
    }
    if (line.includes("---") || line.includes("Layer id")) {
      continue;
    }

    const cols = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length < 3) {
      continue;
    }

    const layerId = cols[0];
    const globMatches = cols[2].match(/`([^`]+)`/g);
    const globs = globMatches
      ? globMatches.map((g) => g.slice(1, -1))
      : cols[2].split(",").map((g) => g.trim()).filter(Boolean);
    layers.set(layerId, globs);
  }

  return layers;
}

/**
 * @param {string} projectContent
 * @param {typeof DEFAULT_LAYERS} [expected]
 * @returns {string[]} layer ids with glob drift vs expected defaults
 */
export function findRegistryGlobDrift(
  projectContent,
  expected = DEFAULT_LAYERS,
) {
  const parsed = parseRegistryLayers(projectContent);
  const drift = [];

  for (const layer of expected) {
    const actual = parsed.get(layer.id);
    if (!actual) {
      drift.push(layer.id);
      continue;
    }
    const expectedSet = [...layer.globs].sort().join("|");
    const actualSet = [...actual].sort().join("|");
    if (expectedSet !== actualSet) {
      drift.push(layer.id);
    }
  }

  return drift;
}
