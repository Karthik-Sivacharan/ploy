import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { InstagramAdsBody } from "./instagram-ads-body";

const meta = {
  title: "Canvas/Node Bodies/Instagram Ads",
  component: InstagramAdsBody,
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof InstagramAdsBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <div className="w-64 rounded-2xl border border-border bg-card">
      <InstagramAdsBody variant="compact" />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <InstagramAdsBody variant="expanded" />
    </div>
  ),
};
