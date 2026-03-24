import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { EmailSequenceBody } from "./email-sequence-body";

const meta = {
  title: "Organisms/Node Bodies/Email Sequence",
  component: EmailSequenceBody,
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta<typeof EmailSequenceBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: () => (
    <div className="w-64 rounded-2xl border border-border bg-card">
      <EmailSequenceBody variant="compact" />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-border bg-card">
      <EmailSequenceBody variant="expanded" />
    </div>
  ),
};
