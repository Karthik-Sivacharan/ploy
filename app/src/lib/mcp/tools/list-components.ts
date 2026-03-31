import { componentIndex, type ComponentEntry } from "@/lib/mcp/component-index";

export type { ComponentEntry };

export async function listComponents(): Promise<ComponentEntry[]> {
  return componentIndex;
}
