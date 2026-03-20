import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import type { WorkflowNode, WorkflowEdge } from "@/lib/workflow/types";

interface HistoryEntry {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  workflowName: string;
  history: HistoryEntry[];
  future: HistoryEntry[];

  /* Panel visibility (mobile) */
  leftSidebarOpen: boolean;
  configPanelOpen: boolean;
  logsPanelOpen: boolean;
  setLeftSidebarOpen: (open: boolean) => void;
  setConfigPanelOpen: (open: boolean) => void;
  setLogsPanelOpen: (open: boolean) => void;

  onNodesChange: OnNodesChange<WorkflowNode>;
  onEdgesChange: OnEdgesChange<WorkflowEdge>;
  onConnect: OnConnect;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  setWorkflowName: (name: string) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNode["data"]>) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const pushHistory = (state: WorkflowState): Partial<WorkflowState> => ({
  history: [
    ...state.history,
    { nodes: structuredClone(state.nodes), edges: structuredClone(state.edges) },
  ],
  future: [],
});

const INITIAL_NODES: WorkflowNode[] = [
  {
    id: "brand-assets",
    type: "action",
    position: { x: 0, y: 0 },
    data: {
      type: "action",
      actionType: "frontify-brand-assets",
      label: "Brand Assets",
      description: "Brand colors, fonts, and logos from Frontify",
      provider: "Frontify",
      enabled: true,
      locked: false,
    },
  },
  {
    id: "brand-voice",
    type: "action",
    position: { x: 0, y: 400 },
    data: {
      type: "action",
      actionType: "notion-brand-voice",
      label: "Brand Voice",
      description: "Tone and voice guidelines from Notion",
      provider: "Notion",
      enabled: true,
      locked: false,
    },
  },
  {
    id: "target-audience",
    type: "action",
    position: { x: 0, y: 800 },
    data: {
      type: "action",
      actionType: "hubspot-target-audience",
      label: "Target Audience",
      description: "Audience segment from HubSpot",
      provider: "HubSpot",
      enabled: true,
      locked: false,
    },
  },
  {
    id: "ai-agent",
    type: "action",
    position: { x: 400, y: 200 },
    data: {
      type: "action",
      actionType: "ploy-ai-campaign",
      label: "AI Campaign Agent",
      description: "Generate multi-channel campaign with Claude Opus",
      provider: "Ploy",
      enabled: true,
      locked: false,
      width: "w-80",
    },
  },
  {
    id: "landing-page",
    type: "action",
    position: { x: 800, y: -80 },
    data: {
      type: "action",
      actionType: "webflow-landing-page",
      label: "Landing Page",
      description: "Landing page published to Webflow",
      provider: "Webflow",
      enabled: true,
      locked: false,
    },
  },
  {
    id: "email-sequence",
    type: "action",
    position: { x: 800, y: 480 },
    data: {
      type: "action",
      actionType: "mailchimp-email-sequence",
      label: "Email Sequence",
      description: "3-email drip campaign via Mailchimp",
      provider: "Mailchimp",
      enabled: true,
      locked: false,
    },
  },
];

const INITIAL_EDGES: WorkflowEdge[] = [
  { id: "e-brand-assets-ai", source: "brand-assets", target: "ai-agent", type: "animated" },
  { id: "e-brand-voice-ai", source: "brand-voice", target: "ai-agent", type: "animated" },
  { id: "e-target-audience-ai", source: "target-audience", target: "ai-agent", type: "animated" },
  { id: "e-ai-landing", source: "ai-agent", target: "landing-page", type: "animated" },
  { id: "e-ai-email", source: "ai-agent", target: "email-sequence", type: "animated" },
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: INITIAL_NODES,
  edges: INITIAL_EDGES,
  selectedNodeId: null,
  selectedEdgeId: null,
  workflowName: "",
  history: [],
  future: [],

  /* Panel visibility — default closed (mobile uses these; desktop ignores them) */
  leftSidebarOpen: false,
  configPanelOpen: false,
  logsPanelOpen: false,
  setLeftSidebarOpen: (open) => set({ leftSidebarOpen: open }),
  setConfigPanelOpen: (open) => set({ configPanelOpen: open }),
  setLogsPanelOpen: (open) => set({ logsPanelOpen: open }),

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      ...pushHistory(state),
      edges: addEdge(
        { ...connection, type: "animated" },
        state.edges
      ),
    }));
  },

  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id, selectedEdgeId: null });
  },

  setSelectedEdgeId: (id) => {
    set({ selectedEdgeId: id, selectedNodeId: null });
  },

  setWorkflowName: (name) => {
    set({ workflowName: name });
  },

  addNode: (node) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: [...state.nodes, node],
    }));
  },

  updateNodeData: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } as WorkflowNode["data"] }
          : node
      ) as WorkflowNode[],
    }));
  },

  duplicateNode: (id) => {
    const state = get();
    const node = state.nodes.find((n) => n.id === id);
    if (!node) return;
    const newId = `node-${Date.now().toString(36)}-dup`;
    set({
      ...pushHistory(state),
      nodes: [
        ...state.nodes,
        {
          ...structuredClone(node),
          id: newId,
          position: { x: node.position.x + 50, y: node.position.y + 50 },
        },
      ],
    });
  },

  deleteNode: (id) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNodeId:
        state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
  },

  deleteEdge: (id) => {
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.filter((edge) => edge.id !== id),
      selectedEdgeId:
        state.selectedEdgeId === id ? null : state.selectedEdgeId,
    }));
  },

  undo: () => {
    const { history, nodes, edges } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: history.slice(0, -1),
      future: [{ nodes: structuredClone(nodes), edges: structuredClone(edges) }, ...get().future],
    });
  },

  redo: () => {
    const { future, nodes, edges } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      nodes: next.nodes,
      edges: next.edges,
      future: future.slice(1),
      history: [...get().history, { nodes: structuredClone(nodes), edges: structuredClone(edges) }],
    });
  },

  canUndo: () => get().history.length > 0,
  canRedo: () => get().future.length > 0,
}));
