import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { AiCampaignBody } from "./ai-campaign-body";

const meta = {
  title: "Organisms/Node Bodies/AI Campaign",
  component: AiCampaignBody,
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof AiCampaignBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <div className="w-64 rounded-2xl border border-border bg-card">
      <AiCampaignBody variant="compact" />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <AiCampaignBody variant="expanded" />
    </div>
  ),
};
