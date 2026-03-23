import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import {
  StoreDecorator,
  MOCK_NODES,
  MOCK_EDGES,
} from "../../../.storybook/decorators/store-decorator";
import { WorkflowCanvas } from "./workflow-canvas";
import { useWorkflowStore } from "@/stores/workflow-store";

const meta = {
  title: "Pages/Full Canvas",
  component: WorkflowCanvas,
  decorators: [StoreDecorator],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorkflowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default (Nodes + Edges)",
  render: () => {
    function Inner() {
      useEffect(() => {
        useWorkflowStore.setState({
          nodes: MOCK_NODES,
          edges: MOCK_EDGES,
          selectedNodeId: "action-1",
          configPanelOpen: true,
        });
      }, []);
      return (
        <div style={{ width: "100%", height: 700, position: "relative" }}>
          <WorkflowCanvas />
        </div>
      );
    }
    return <Inner />;
  },
};

export const Empty: Story = {
  name: "Empty Canvas",
  render: () => {
    function Inner() {
      useEffect(() => {
        useWorkflowStore.setState({
          nodes: [],
          edges: [],
          selectedNodeId: null,
          configPanelOpen: false,
        });
      }, []);
      return (
        <div style={{ width: "100%", height: 700, position: "relative" }}>
          <WorkflowCanvas />
        </div>
      );
    }
    return <Inner />;
  },
};
