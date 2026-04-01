import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { LandingPageBody } from "./landing-page-body";

const meta = {
  title: "Canvas/Node Bodies/Landing Page",
  component: LandingPageBody,
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof LandingPageBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <div className="w-72 rounded-2xl border border-border bg-card" style={{ minHeight: 500 }}>
      <LandingPageBody variant="compact" />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <LandingPageBody variant="expanded" />
    </div>
  ),
};
