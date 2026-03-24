import type { Meta, StoryObj } from "@storybook/react";
import { StoreDecorator } from "../../../.storybook/decorators/store-decorator";
import { ReactFlowDecorator } from "../../../.storybook/decorators/react-flow-decorator";
import { WorkflowHeader } from "./workflow-header";

const meta = {
  title: "Pages/Workflow Header",
  component: WorkflowHeader,
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorkflowHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  name: "Mobile",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
