import type { Meta, StoryObj } from "@storybook/react"
import { UsageIndicator } from "./usage-indicator"

const meta = {
  title: "Workflow/Usage Indicator",
  component: UsageIndicator,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UsageIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
