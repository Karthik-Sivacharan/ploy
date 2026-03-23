import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { StoreDecorator } from "../../../../.storybook/decorators/store-decorator";
import { TriggerNode } from "./trigger-node";
import type { TriggerNodeData } from "@/lib/workflow/types";

const meta = {
  title: "Organisms/Nodes/Trigger Node",
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const makeProps = (data: TriggerNodeData) => ({
  id: "trigger-story",
  type: "trigger" as const,
  data: data as Record<string, unknown>,
  dragging: false,
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  selected: false,
  deletable: true,
  selectable: true,
  draggable: true,
  parentId: undefined,
  width: 256,
  height: 200,
});

export const ManualTrigger: Story = {
  render: () => (
    <TriggerNode
      {...makeProps({
        type: "trigger",
        triggerType: "manual",
        label: "Manual Trigger",
        description: "Run this workflow manually",
        enabled: true,
        locked: false,
        status: "idle",
        fields: [
          { key: "Mode", value: "Click" },
          { key: "Input", value: "-" },
          { key: "Error", value: "-" },
        ],
      })}
    />
  ),
};

export const ScheduleTrigger: Story = {
  render: () => (
    <TriggerNode
      {...makeProps({
        type: "trigger",
        triggerType: "schedule",
        label: "Schedule Trigger",
        description: "Run on a cron schedule",
        enabled: true,
        locked: false,
        status: "success",
        fields: [
          { key: "Cron", value: "0 9 * * 1-5" },
          { key: "Timezone", value: "America/New_York" },
          { key: "Error", value: "-" },
        ],
      })}
    />
  ),
};

export const WebhookTrigger: Story = {
  render: () => (
    <TriggerNode
      {...makeProps({
        type: "trigger",
        triggerType: "webhook",
        label: "Webhook Trigger",
        description: "Listen for incoming webhooks",
        enabled: true,
        locked: false,
        status: "idle",
        fields: [
          { key: "URL", value: "https://api.ploy.app/wh/abc123" },
          { key: "Method", value: "POST" },
          { key: "Headers", value: "Content-Type: application/json" },
          { key: "Error", value: "-" },
        ],
      })}
    />
  ),
};
