import type { Node, Edge } from "@xyflow/react";

export type TriggerType = "manual" | "schedule" | "webhook";

export type ActionCategory = "system" | "ai" | "integrations";

export interface NodeField {
  key: string;
  value: string;
}

export interface TriggerNodeData {
  type: "trigger";
  triggerType: TriggerType;
  label: string;
  description: string;
  enabled: boolean;
  locked: boolean;
  status?: "idle" | "running" | "success" | "error";
  fields?: NodeField[];
  [key: string]: unknown;
}

export interface ActionNodeData {
  type: "action";
  actionType: string;
  label: string;
  description: string;
  provider: string;
  providerIcon?: string;
  enabled: boolean;
  locked: boolean;
  status?: "idle" | "running" | "success" | "error";
  fields?: NodeField[];
  [key: string]: unknown;
}

export type WorkflowNodeData = TriggerNodeData | ActionNodeData;
export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export interface ActionDefinition {
  id: string;
  label: string;
  description: string;
  provider: string;
  category: ActionCategory;
}

export interface ActionGroup {
  provider: string;
  icon: string;
  category: ActionCategory;
  actions: ActionDefinition[];
}
