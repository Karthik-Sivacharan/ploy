import type { Meta, StoryObj } from "@storybook/react"
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "./checkpoint"

const meta = {
  title: "Organisms/AI Elements/Checkpoint",
  component: Checkpoint,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkpoint>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Checkpoint>
      <CheckpointIcon name="bookmark" />
      <CheckpointTrigger>Checkpoint saved</CheckpointTrigger>
    </Checkpoint>
  ),
}

export const WithTooltip: Story = {
  render: () => (
    <Checkpoint>
      <CheckpointIcon name="bookmark" />
      <CheckpointTrigger tooltip="Restore to this checkpoint">
        v2.1.0 — Campaign draft saved
      </CheckpointTrigger>
    </Checkpoint>
  ),
}

export const CustomIcon: Story = {
  render: () => (
    <Checkpoint>
      <CheckpointIcon name="check-circle" />
      <CheckpointTrigger>Build passed successfully</CheckpointTrigger>
    </Checkpoint>
  ),
}
