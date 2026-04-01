import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { StoreDecorator } from "../../../../.storybook/decorators/store-decorator";
import { ActionNode } from "../nodes/action-node";
import type { ActionNodeData } from "@/lib/workflow/types";
import { BrandVoiceBody } from "./brand-voice-body";

const makeProps = (data: ActionNodeData) => ({
  id: "action-story",
  type: "action" as const,
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
  height: 400,
});

const meta = {
  title: "Canvas/Nodes/Brand Voice",
  component: BrandVoiceBody,
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof BrandVoiceBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <ActionNode
      {...makeProps({
        type: "action",
        actionType: "notion-brand-voice",
        label: "Brand Voice",
        description: "Tone guidelines from Notion",
        provider: "Notion",
        enabled: true,
        locked: false,
        status: "success",
      })}
    />
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <BrandVoiceBody variant="expanded" />
    </div>
  ),
};
