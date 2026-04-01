import type { Meta, StoryObj } from "@storybook/react"
import { WorkflowToolbar } from "./workflow-toolbar"

const meta = {
  title: "Workflow/Toolbar",
  component: WorkflowToolbar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkflowToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
