import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { StoreDecorator } from "../../../.storybook/decorators/store-decorator";
import { ReactFlowDecorator } from "../../../.storybook/decorators/react-flow-decorator";
import { LeftSidebar } from "./left-sidebar";
import { useWorkflowStore } from "@/stores/workflow-store";

const meta = {
  title: "Pages/Left Sidebar",
  component: LeftSidebar,
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LeftSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopExpanded: Story = {
  name: "Desktop — Expanded",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 600 }}>
      <LeftSidebar />
    </div>
  ),
};

export const DesktopCollapsed: Story = {
  name: "Desktop — Collapsed",
  render: () => (
    <div style={{ position: "relative", width: "100%", height: 600 }}>
      <LeftSidebar />
    </div>
  ),
};

function MobileSidebarStory() {
  useEffect(() => {
    useWorkflowStore.setState({ leftSidebarOpen: true });
  }, []);

  return <LeftSidebar />;
}

export const Mobile: Story = {
  name: "Mobile",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <MobileSidebarStory />,
};
