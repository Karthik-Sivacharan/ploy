import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Type your message here...",
  },
}

export const AutoSizing: Story = {
  args: {
    placeholder: "This textarea uses field-sizing-content and grows with your input...",
    defaultValue:
      "This textarea auto-sizes based on content.\nTry adding more lines to see it grow.\nThe field-sizing-content CSS property handles this.",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "This textarea is disabled",
  },
}
