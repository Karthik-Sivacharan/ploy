import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../.storybook/decorators/react-flow-decorator";
import { StoreDecorator } from "../../../.storybook/decorators/store-decorator";
import { NodeHoverToolbar } from "./node-hover-toolbar";

const meta = {
  title: "Canvas/Hover Toolbar",
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative pt-14">
      <div className="group/node relative">
        <div className="opacity-100" style={{ position: "absolute", top: "-44px", left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
          <NodeHoverToolbar nodeId="action-1" />
        </div>
        <div className="w-64 rounded-2xl border border-border bg-card p-4">
          <span className="text-sm text-foreground">Hover over a node to see this toolbar</span>
        </div>
      </div>
    </div>
  ),
};
