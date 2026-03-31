import Fuse from "fuse.js";
import { componentIndex, type ComponentEntry } from "@/lib/mcp/component-index";

const MAX_RESULTS = 10;

const fuse = new Fuse(componentIndex, {
  keys: ["name", "description"],
  threshold: 0.4,
  includeScore: true,
});

export async function searchComponents(
  query: string
): Promise<ComponentEntry[]> {
  if (!query.trim()) {
    return componentIndex.slice(0, MAX_RESULTS);
  }

  const results = fuse.search(query, { limit: MAX_RESULTS });
  return results.map((r) => r.item);
}
