import type { Meta, StoryObj } from "@storybook/react"
import { LogsPanel } from "./logs-panel"
import { ReactFlowDecorator, StoreDecorator } from "../../../.storybook/decorators"

const meta = {
  title: "Organisms/Workflow/Logs Panel",
  component: LogsPanel,
  tags: ["autodocs"],
  decorators: [
    // Wrapper with relative positioning so absolute-positioned panel is visible
    (Story) => (
      <div style={{ position: "relative", width: "100%", height: 400 }}>
        <Story />
      </div>
    ),
    StoreDecorator,
    ReactFlowDecorator,
  ],
} satisfies Meta<typeof LogsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
