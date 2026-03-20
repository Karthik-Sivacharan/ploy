"use client";

import type { NodeProps } from "@xyflow/react";
import type { ActionNodeData } from "@/lib/workflow/types";
import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeContent,
  NodeFields,
  NodeFieldRow,
  NodeStatusBar,
} from "@/components/ai-elements/node";
import { NodeHoverToolbar } from "@/components/workflow/node-hover-toolbar";
import { Icon } from "@/components/ui/icon";
import { ProviderIcon } from "@/components/ui/provider-icon";
import { getProvider } from "@/lib/providers";

const DEFAULT_ACTION_FIELDS: Record<string, { key: string; value: string }[]> = {
  "generate-text": [
    { key: "Messages", value: "-" },
    { key: "Model", value: "gpt-4o" },
    { key: "Tools", value: "-" },
    { key: "Skills", value: "-" },
    { key: "Memory", value: "None" },
    { key: "Response Format", value: "-" },
    { key: "Error", value: "-" },
  ],
  "generate-image": [
    { key: "Prompt", value: "-" },
    { key: "Model", value: "dall-e-3" },
    { key: "Size", value: "1024x1024" },
    { key: "Error", value: "-" },
  ],
  "http-request": [
    { key: "URL", value: "-" },
    { key: "Method", value: "GET" },
    { key: "Headers", value: "-" },
    { key: "Body", value: "-" },
    { key: "Error", value: "-" },
  ],
  "database-query": [
    { key: "Query", value: "-" },
    { key: "Connection", value: "-" },
    { key: "Error", value: "-" },
  ],
  "condition": [
    { key: "Expression", value: "-" },
    { key: "True Branch", value: "-" },
    { key: "False Branch", value: "-" },
    { key: "Error", value: "-" },
  ],
  "github-create-issue": [
    { key: "Repository", value: "-" },
    { key: "Title", value: "-" },
    { key: "Body", value: "-" },
    { key: "Labels", value: "-" },
    { key: "Error", value: "-" },
  ],
  "github-list-issues": [
    { key: "Repository", value: "-" },
    { key: "State", value: "open" },
    { key: "Labels", value: "-" },
    { key: "Error", value: "-" },
  ],
  "slack-send-message": [
    { key: "Channel", value: "-" },
    { key: "Message", value: "-" },
    { key: "Error", value: "-" },
  ],
  "resend-send-email": [
    { key: "To", value: "-" },
    { key: "Subject", value: "-" },
    { key: "Body", value: "-" },
    { key: "Error", value: "-" },
  ],
  "stripe-create-customer": [
    { key: "Email", value: "-" },
    { key: "Name", value: "-" },
    { key: "Error", value: "-" },
  ],
  "stripe-create-invoice": [
    { key: "Customer", value: "-" },
    { key: "Amount", value: "-" },
    { key: "Currency", value: "USD" },
    { key: "Error", value: "-" },
  ],
};

export function ActionNode({ id, data }: NodeProps) {
  const nodeData = data as unknown as ActionNodeData;
  const providerConfig = getProvider(nodeData.provider);
  const hasAction = Boolean(nodeData.actionType);
  const fields = nodeData.fields ?? DEFAULT_ACTION_FIELDS[nodeData.actionType] ?? [];

  if (!hasAction) {
    return (
      <Node
        handles={{ target: true, source: true }}
        className="w-64"
        toolbar={<NodeHoverToolbar nodeId={id} />}
      >
        <NodeContent className="flex flex-col items-center justify-center gap-2 py-8">
          <Icon name="plus" size="sm" className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Select an action</span>
        </NodeContent>
      </Node>
    );
  }

  return (
    <Node
      handles={{ target: true, source: true }}
      className="w-64"
      toolbar={<NodeHoverToolbar nodeId={id} />}
    >
      <NodeHeader className="flex items-center gap-2">
        <div className={`flex size-6 items-center justify-center rounded-md ${providerConfig.colors}`}>
          <ProviderIcon provider={nodeData.provider} size="xs" />
        </div>
        <NodeTitle className="text-sm font-semibold">
          {nodeData.label}
        </NodeTitle>
      </NodeHeader>

      <NodeFields>
        {fields.map((field) => (
          <NodeFieldRow
            key={field.key}
            label={field.key}
            value={field.value}
          />
        ))}
      </NodeFields>

      <NodeStatusBar status={nodeData.status} />
    </Node>
  );
}
