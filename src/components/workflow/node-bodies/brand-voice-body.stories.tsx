import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { BrandVoiceBody } from "./brand-voice-body";

const meta = {
  title: "Organisms/Node Bodies/Brand Voice",
  component: BrandVoiceBody,
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof BrandVoiceBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <div className="w-64 rounded-2xl border border-border bg-card">
      <BrandVoiceBody variant="compact" />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <BrandVoiceBody variant="expanded" />
    </div>
  ),
};
