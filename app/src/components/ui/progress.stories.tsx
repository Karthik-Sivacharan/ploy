import type { Meta, StoryObj } from "@storybook/react"
import { Progress, ProgressLabel, ProgressValue } from "./progress"

const meta = {
  title: "Primitives/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: {
    value: 50,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: { value: 0 },
}

export const Half: Story = {
  args: { value: 50 },
}

export const Full: Story = {
  args: { value: 100 },
}

export const WithLabel: Story = {
  args: { value: 60 },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Uploading...</ProgressLabel>
    </Progress>
  ),
}

export const WithValue: Story = {
  args: { value: 73 },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

export const Animated: Story = {
  args: { value: 30 },
}
