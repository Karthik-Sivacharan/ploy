"use client";

import type { NodeProps } from "@xyflow/react";
import type { TriggerNodeData } from "@/lib/workflow/types";
import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeFields,
  NodeFieldRow,
  NodeStatusBar,
} from "@/components/ai-elements/node";
import { NodeHoverToolbar } from "@/components/workflow/node-hover-toolbar";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";

const TRIGGER_ICONS: Record<string, IconName> = {
  manual: "play",
  schedule: "clock",
  webhook: "webhook",
};

const DEFAULT_FIELDS: Record<string, { key: string; value: string }[]> = {
  manual: [
    { key: "Mode", value: "Click" },
    { key: "Input", value: "-" },
    { key: "Error", value: "-" },
  ],
  schedule: [
    { key: "Cron", value: "-" },
    { key: "Timezone", value: "UTC" },
    { key: "Error", value: "-" },
  ],
  webhook: [
    { key: "URL", value: "-" },
    { key: "Method", value: "POST" },
    { key: "Headers", value: "-" },
    { key: "Error", value: "-" },
  ],
};

export function TriggerNode({ id, data }: NodeProps) {
  const nodeData = data as unknown as TriggerNodeData;
  const iconName = TRIGGER_ICONS[nodeData.triggerType] ?? "play";
  const fields = nodeData.fields ?? DEFAULT_FIELDS[nodeData.triggerType] ?? [];

  return (
    <Node
      handles={{ target: false, source: true }}
      className="w-64"
      toolbar={<NodeHoverToolbar nodeId={id} />}
    >
      <NodeHeader className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-md bg-primary/15">
          <Icon name={iconName} size="xs" className="text-primary" />
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
