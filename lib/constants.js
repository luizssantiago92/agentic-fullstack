import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const { version: PACKAGE_VERSION } = createRequire(import.meta.url)(
  "../package.json",
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PACKAGE_ROOT = path.resolve(__dirname, "..");

export const SKILL_DIRS = [".cursor/skills", ".claude/skills"];

export const CURSOR_RULES_DIR = ".cursor/rules";

export const PROJECT_DIR = ".specs/project";

export const PROJECT_FILE = "PROJECT.md";

export const HARNESS_HUB = ".cursor/skills/agent-architecture.md";

export const HARNESS_SCRIPTS_DIR = ".specs/harness/scripts";

/** Extension gate scripts copied on install (alongside harness gates). */
export const EXTENSION_SCRIPT_ASSETS = ["validate_layer_routing.py"];

/** Skills shipped by this extension (not overwritten by harness re-install). */
export const SKILL_ASSETS = [
  "frontend-engineering.md",
  "backend-engineering.md",
  "data-engineering.md",
  "analytics-engineering.md",
  "data-science-engineering.md",
];

export const RULE_ASSETS = ["fullstack-layer.mdc"];

/** Default layer registry when PROJECT.md is created from template. */
export const DEFAULT_LAYERS = [
  {
    id: "frontend",
    skill: "frontend-engineering.md",
    globs: [
      "apps/web/**",
      "frontend/**",
      "**/*.tsx",
      "**/*.jsx",
      "**/*.vue",
      "**/*.svelte",
    ],
  },
  {
    id: "backend",
    skill: "backend-engineering.md",
    globs: [
      "apps/api/**",
      "backend/**",
      "apps/api/**/routes/**",
      "apps/api/**/migrations/**",
      "backend/**/migrations/**",
    ],
  },
  {
    id: "data",
    skill: "data-engineering.md",
    globs: [
      "dbt/**",
      "pipelines/**",
      "**/etl/**",
      "warehouse/**",
      "spark/**",
    ],
  },
  {
    id: "analytics",
    skill: "analytics-engineering.md",
    globs: [
      "analytics/**",
      "reports/**",
      "**/sql/analytics/**",
      "notebooks/explore/**",
    ],
  },
  {
    id: "datascience",
    skill: "data-science-engineering.md",
    globs: ["experiments/**", "ml/**", "models/**", "training/**"],
  },
];

/**
 * Render the Layer registry markdown table rows (for parity tests vs templates/PROJECT.md).
 * @param {typeof DEFAULT_LAYERS} layers
 */
export function renderLayerRegistryTable(layers) {
  const header =
    "| Layer id | Skill file | Path globs (match any) |\n| --- | --- | --- |";
  const rows = layers.map(
    (layer) =>
      `| ${layer.id} | \`${layer.skill}\` | ${layer.globs.map((g) => `\`${g}\``).join(", ")} |`,
  );
  return [header, ...rows].join("\n");
}
