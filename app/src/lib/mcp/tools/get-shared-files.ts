import fs from "fs";
import path from "path";

interface SharedFile {
  path: string;
  source: string;
  description: string;
}

export interface SharedFilesResponse {
  files: SharedFile[];
}

const SHARED_FILES: Array<{ path: string; description: string }> = [
  {
    path: "src/lib/providers.ts",
    description:
      "Provider registry mapping third-party services to Brandfetch domains and fallback Hugeicons. Used by provider-icon.tsx and action-node.tsx.",
  },
  {
    path: "src/lib/workflow/types.ts",
    description:
      "Workflow type definitions: TriggerNodeData, ActionNodeData, ActionDefinition, etc. Used by all workflow nodes and the workflow store.",
  },
  {
    path: "src/lib/workflow/utils.ts",
    description:
      "Workflow utilities including nanoid() for generating node IDs. Used by node-hover-toolbar.tsx and workflow-canvas.tsx.",
  },
  {
    path: "src/lib/workflow/constants.ts",
    description:
      "Workflow constants including ACTION_GROUPS with all available action definitions. Used by action-grid.tsx and node-config-panel.tsx.",
  },
  {
    path: "src/stores/workflow-store.ts",
    description:
      "Zustand workflow store: nodes, edges, selection, undo/redo, panel state. Central state used by nearly every workflow component.",
  },
  {
    path: "src/hooks/use-is-mobile.ts",
    description:
      "SSR-safe responsive hook that returns true below the mobile breakpoint (768px). Used by sidebar and panel layout components.",
  },
  {
    path: "src/components/theme-toggle.tsx",
    description:
      "Light/dark mode toggle button using next-themes. Used by workflow-header.tsx.",
  },
];

function readFileSafe(relativePath: string): string | null {
  try {
    const filePath = path.join(process.cwd(), relativePath);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function getSharedFiles(): Promise<SharedFilesResponse> {
  const files: SharedFile[] = [];

  for (const entry of SHARED_FILES) {
    const source = readFileSafe(entry.path);
    if (source !== null) {
      files.push({
        path: entry.path,
        source,
        description: entry.description,
      });
    }
  }

  return { files };
}
