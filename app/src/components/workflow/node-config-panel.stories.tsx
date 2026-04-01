import React, { useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import type { Decorator } from "@storybook/react"
import { NodeConfigPanel } from "./node-config-panel"
import {
  StoreDecorator,
  MOCK_STORE_STATE,
  MOCK_TRIGGER_NODE,
  MOCK_ACTION_NODE_1,
} from "../../../.storybook/decorators"
import { useWorkflowStore } from "@/stores/workflow-store"

const panelWrapper: Decorator = (Story) => (
  <div className="w-[360px] h-[600px] border rounded-lg overflow-hidden">
    <Story />
  </div>
)

const meta = {
  title: "Workflow/Config Panel",
  component: NodeConfigPanel,
  tags: ["autodocs"],
  decorators: [panelWrapper, StoreDecorator],
} satisfies Meta<typeof NodeConfigPanel>

export default meta
type Story = StoryObj<typeof meta>

export const EditorTab: Story = {
  name: "Editor Tab (Action Node)",
}

export const EditorTabTrigger: Story = {
  name: "Editor Tab (Trigger Node)",
  decorators: [
    (Story) => {
      useEffect(() => {
        useWorkflowStore.setState({
          ...MOCK_STORE_STATE,
          selectedNodeId: MOCK_TRIGGER_NODE.id,
        })
      }, [])
      return <Story />
    },
  ],
}

export const NoNodeSelected: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useWorkflowStore.setState({
          ...MOCK_STORE_STATE,
          selectedNodeId: null,
        })
      }, [])
      return <Story />
    },
  ],
}

export const CopilotTab: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useWorkflowStore.setState({
          ...MOCK_STORE_STATE,
          selectedNodeId: null,
        })
      }, [])
      return <Story />
    },
  ],
}

export const ToolbarTab: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useWorkflowStore.setState({
          ...MOCK_STORE_STATE,
          selectedNodeId: null,
        })
      }, [])
      return <Story />
    },
  ],
}
