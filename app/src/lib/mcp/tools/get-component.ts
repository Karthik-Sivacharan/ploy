import fs from "fs";
import path from "path";
import { componentIndex, type ComponentEntry } from "@/lib/mcp/component-index";

export interface ComponentResponse {
  name: string;
  category: string;
  source: string;
  story_source: string | null;
  install_path: string;
  check_before_install: string;
  dependencies: string[];
  npm_dependencies: string[];
  storybook_url: string;
}

function readFileOrNull(relativePath: string): string | null {
  try {
    return fs.readFileSync(path.join(process.cwd(), relativePath), "utf-8");
  } catch {
    return null;
  }
}

function extractNpmDependencies(source: string): string[] {
  const importRegex = /from\s+["']([^"'@/][^"']*|@[^/"']+\/[^"']+)["']/g;
  const deps = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(source)) !== null) {
    const pkg = match[1];
    // Skip relative imports (already filtered by regex) and @/ alias imports
    if (!pkg.startsWith("@/") && !pkg.startsWith("./") && !pkg.startsWith("../")) {
      // Normalize scoped packages to package name (e.g., @radix-ui/react-slot)
      deps.add(pkg);
    }
  }

  return [...deps];
}

function findEntry(name: string): ComponentEntry {
  const entry = componentIndex.find((c) => c.name === name);
  if (!entry) {
    const available = componentIndex.map((c) => c.name).join(", ");
    throw new Error(
      `Component "${name}" not found. Available components: ${available}`
    );
  }
  return entry;
}

function buildStorybookUrl(entry: ComponentEntry): string {
  return `https://storybook.ploy.dev/?path=/docs/${entry.category}-${entry.name}`;
}

function resolveComponent(entry: ComponentEntry): ComponentResponse {
  const source = readFileOrNull(entry.filePath);
  if (!source) {
    throw new Error(`Source file not found: ${entry.filePath}`);
  }

  const storyPath = entry.filePath.replace(/\.tsx$/, ".stories.tsx");
  const storySource = readFileOrNull(storyPath);

  return {
    name: entry.name,
    category: entry.category,
    source,
    story_source: storySource,
    install_path: entry.filePath,
    check_before_install: `Check if ${entry.filePath} already exists in the user's project. If it does, skip — just import and use it.`,
    dependencies: entry.dependencies,
    npm_dependencies: extractNpmDependencies(source),
    storybook_url: buildStorybookUrl(entry),
  };
}

export async function getComponent(
  name: string,
  includeDependencies = true
): Promise<ComponentResponse & { dependency_sources?: ComponentResponse[] }> {
  const entry = findEntry(name);
  const result = resolveComponent(entry);

  if (includeDependencies && entry.dependencies.length > 0) {
    const depSources: ComponentResponse[] = [];
    const visited = new Set<string>([name]);

    const queue = [...entry.dependencies];
    while (queue.length > 0) {
      const depName = queue.shift()!;
      if (visited.has(depName)) continue;
      visited.add(depName);

      const depEntry = componentIndex.find((c) => c.name === depName);
      if (!depEntry) continue;

      depSources.push(resolveComponent(depEntry));
      for (const transitive of depEntry.dependencies) {
        if (!visited.has(transitive)) queue.push(transitive);
      }
    }

    return { ...result, dependency_sources: depSources };
  }

  return result;
}
