import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { TargetAudienceBody } from "./target-audience-body";

const meta = {
  title: "Canvas/Node Bodies/Target Audience",
  component: TargetAudienceBody,
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TargetAudienceBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <div className="w-64 rounded-2xl border border-border bg-card">
      <TargetAudienceBody variant="compact" />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <TargetAudienceBody variant="expanded" />
    </div>
  ),
};
