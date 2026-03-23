import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { StoreDecorator } from "../../../.storybook/decorators/store-decorator";
import { ReactFlowDecorator } from "../../../.storybook/decorators/react-flow-decorator";
import { ConfigPanelSidebar } from "./config-panel-sidebar";
import { useWorkflowStore } from "@/stores/workflow-store";

const meta = {
  title: "Pages/Config Panel",
  component: ConfigPanelSidebar,
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ConfigPanelSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSelectedNode: Story = {
  name: "With Selected Node",
  render: () => {
    function Inner() {
      useEffect(() => {
        useWorkflowStore.setState({
          configPanelOpen: true,
          selectedNodeId: "action-1",
        });
      }, []);
      return (
        <div style={{ position: "relative", width: "100%", height: 700 }}>
          <ConfigPanelSidebar />
        </div>
      );
    }
    return <Inner />;
  },
};

export const NoSelection: Story = {
  name: "No Selection",
  render: () => {
    function Inner() {
      useEffect(() => {
        useWorkflowStore.setState({
          configPanelOpen: true,
          selectedNodeId: null,
        });
      }, []);
      return (
        <div style={{ position: "relative", width: "100%", height: 700 }}>
          <ConfigPanelSidebar />
        </div>
      );
    }
    return <Inner />;
  },
};

export const Mobile: Story = {
  name: "Mobile",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    function Inner() {
      useEffect(() => {
        useWorkflowStore.setState({
          configPanelOpen: true,
          selectedNodeId: "action-1",
        });
      }, []);
      return <ConfigPanelSidebar />;
    }
    return <Inner />;
  },
};
