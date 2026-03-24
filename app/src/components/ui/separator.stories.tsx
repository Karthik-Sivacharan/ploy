import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <div className="text-sm">Above</div>
        <Story />
        <div className="text-sm">Below</div>
      </div>
    ),
  ],
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [
    (Story) => (
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Story />
        <span className="text-sm">Right</span>
      </div>
    ),
  ],
}
