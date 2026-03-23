import type { Meta, StoryObj } from "@storybook/react"
import { CanvasControls } from "./canvas-controls"
import { ReactFlowDecorator } from "../../../.storybook/decorators"

const meta = {
  title: "Organisms/Workflow/Canvas Controls",
  component: CanvasControls,
  tags: ["autodocs"],
  decorators: [ReactFlowDecorator],
} satisfies Meta<typeof CanvasControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
