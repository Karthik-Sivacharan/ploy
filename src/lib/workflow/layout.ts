import dagre from "dagre";
import type { WorkflowNode, WorkflowEdge } from "./types";

/** Default node dimensions for layout calculation */
const DEFAULT_NODE_WIDTH = 256; // w-64
const WIDE_NODE_WIDTH = 320; // w-80
const DEFAULT_NODE_HEIGHT = 300;

/**
 * Uses Dagre to auto-layout nodes in a left-to-right DAG.
 * Returns new node array with updated positions (edges unchanged).
 */
export function getLayoutedElements(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
  options?: { rankSep?: number; nodeSep?: number }
): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "LR",
    ranksep: options?.rankSep ?? 200,
    nodesep: options?.nodeSep ?? 80,
    align: "UL",
  });

  for (const node of nodes) {
    const isWide = (node.data as Record<string, unknown>).width === "w-80";
    g.setNode(node.id, {
      width: isWide ? WIDE_NODE_WIDTH : DEFAULT_NODE_WIDTH,
      height: DEFAULT_NODE_HEIGHT,
    });
  }

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const pos = g.node(node.id);
    const isWide = (node.data as Record<string, unknown>).width === "w-80";
    const w = isWide ? WIDE_NODE_WIDTH : DEFAULT_NODE_WIDTH;
    return {
      ...node,
      // Dagre returns center coords — convert to top-left for React Flow
      position: {
        x: pos.x - w / 2,
        y: pos.y - DEFAULT_NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
