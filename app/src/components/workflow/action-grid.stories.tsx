import type { Meta, StoryObj } from "@storybook/react"
import { ActionGrid } from "./action-grid"

const meta = {
  title: "Organisms/Workflow/Action Grid",
  component: ActionGrid,
  tags: ["autodocs"],
  args: {
    onSelectAction: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-80 border rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
