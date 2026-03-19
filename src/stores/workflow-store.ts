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
    id: "gmail-1",
    type: "action",
    position: { x: 0, y: 0 },
    data: {
      type: "action",
      actionType: "gmail-read",
      label: "Gmail 1",
      description: "Read emails from Gmail",
      provider: "Gmail",
      enabled: true,
      locked: false,
      fields: [
        { key: "Credentials", value: "-" },
        { key: "Gmail Labels To Monitor", value: "-" },
        { key: "Label Filter Behavior", value: "INCLUDE" },
        { key: "Gmail Search Query", value: "-" },
        { key: "Mark As Read", value: "false" },
        { key: "Include Attachments", value: "false" },
      ],
    },
  },
  {
    id: "agent-1",
    type: "action",
    position: { x: 400, y: -20 },
    data: {
      type: "action",
      actionType: "agent",
      label: "Agent 1",
      description: "AI Agent",
      provider: "AI Gateway",
      enabled: true,
      locked: false,
      fields: [
        { key: "Messages", value: "# Task You are an agent ..." },
        { key: "Model", value: "gpt-4o" },
        { key: "Tools", value: "-" },
        { key: "Skills", value: "-" },
        { key: "Memory", value: "None" },
        { key: "Response Format", value: "-" },
        { key: "Error", value: "-" },
      ],
    },
  },
  {
    id: "gmail-2",
    type: "action",
    position: { x: 800, y: -10 },
    data: {
      type: "action",
      actionType: "gmail-label",
      label: "Gmail 2",
      description: "Add label to Gmail message",
      provider: "Gmail",
      enabled: true,
      locked: false,
      fields: [
        { key: "Operation", value: "Add Label" },
        { key: "Gmail Account", value: "-" },
        { key: "Message ID", value: "<gmail1.email.id>" },
        { key: "Label", value: "-" },
        { key: "Error", value: "-" },
      ],
    },
  },
];

const INITIAL_EDGES: WorkflowEdge[] = [
  { id: "e-gmail1-agent1", source: "gmail-1", target: "agent-1", type: "animated" },
  { id: "e-agent1-gmail2", source: "agent-1", target: "gmail-2", type: "animated" },
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
