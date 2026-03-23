import React, { useEffect } from "react";
import type { Decorator } from "@storybook/react";
import { useWorkflowStore } from "../../src/stores/workflow-store";
import type {
  WorkflowNode,
  WorkflowEdge,
  TriggerNodeData,
  ActionNodeData,
} from "../../src/lib/workflow/types";

export const MOCK_TRIGGER_NODE: WorkflowNode = {
  id: "trigger-1",
  type: "trigger",
  position: { x: 100, y: 200 },
  data: {
    type: "trigger",
    triggerType: "manual",
    label: "Manual Trigger",
    description: "Run this workflow manually",
    enabled: true,
    locked: false,
  } satisfies TriggerNodeData,
};

export const MOCK_ACTION_NODE_1: WorkflowNode = {
  id: "action-1",
  type: "action",
  position: { x: 400, y: 100 },
  data: {
    type: "action",
    actionType: "frontify-brand-assets",
    label: "Brand Assets",
    description: "Brand colors, fonts, and logos from Frontify",
    provider: "Frontify",
    enabled: true,
    locked: false,
  } satisfies ActionNodeData,
};

export const MOCK_ACTION_NODE_2: WorkflowNode = {
  id: "action-2",
  type: "action",
  position: { x: 700, y: 100 },
  data: {
    type: "action",
    actionType: "ploy-ai-campaign",
    label: "AI Campaign Agent",
    description: "Generate multi-channel campaign with Claude Opus",
    provider: "Ploy",
    enabled: true,
    locked: false,
  } satisfies ActionNodeData,
};

export const MOCK_NODES: WorkflowNode[] = [
  MOCK_TRIGGER_NODE,
  MOCK_ACTION_NODE_1,
  MOCK_ACTION_NODE_2,
];

export const MOCK_EDGES: WorkflowEdge[] = [
  {
    id: "e-trigger-action1",
    source: "trigger-1",
    target: "action-1",
    type: "animated",
  },
  {
    id: "e-action1-action2",
    source: "action-1",
    target: "action-2",
    type: "animated",
  },
];

export const MOCK_STORE_STATE = {
  nodes: MOCK_NODES,
  edges: MOCK_EDGES,
  selectedNodeId: "action-1",
  selectedEdgeId: null,
  workflowName: "Storybook Demo Workflow",
  history: [],
  future: [],
  leftSidebarOpen: true,
  configPanelOpen: true,
  logsPanelOpen: false,
};

export const StoreDecorator: Decorator = (Story) => {
  useEffect(() => {
    useWorkflowStore.setState(MOCK_STORE_STATE);
  }, []);

  return <Story />;
};
