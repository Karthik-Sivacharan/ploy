import dagre from "dagre";
import type { WorkflowNode, WorkflowEdge } from "./types";

/** Default node dimensions for layout calculation */
const DEFAULT_NODE_WIDTH = 256; // w-64
const WIDE_NODE_WIDTH = 320; // w-80
const DEFAULT_NODE_HEIGHT = 350;

/**
 * Per-actionType height overrides — nodes with images/screenshots or
 * lots of content need more vertical space to avoid overlapping.
 */
const NODE_HEIGHT_OVERRIDES: Record<string, number> = {
  "frontify-brand-assets": 320,
  "notion-brand-voice": 380,
  "hubspot-target-audience": 340,
  "ploy-ai-campaign": 420,
  "webflow-landing-page": 500,
  "mailchimp-email-sequence": 360,
  "meta-instagram-ads": 520,
  "onesignal-push-notification": 340,
};

function getNodeHeight(node: WorkflowNode): number {
  const actionType = (node.data as Record<string, unknown>).actionType as string | undefined;
  return (actionType && NODE_HEIGHT_OVERRIDES[actionType]) ?? DEFAULT_NODE_HEIGHT;
}

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
    ranksep: options?.rankSep ?? 250,
    nodesep: options?.nodeSep ?? 40,
  });

  for (const node of nodes) {
    const isWide = (node.data as Record<string, unknown>).width === "w-80";
    g.setNode(node.id, {
      width: isWide ? WIDE_NODE_WIDTH : DEFAULT_NODE_WIDTH,
      height: getNodeHeight(node),
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
    const h = getNodeHeight(node);
    return {
      ...node,
      // Dagre returns center coords — convert to top-left for React Flow
      position: {
        x: pos.x - w / 2,
        y: pos.y - h / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
