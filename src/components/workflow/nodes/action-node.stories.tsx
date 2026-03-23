import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";
import { StoreDecorator } from "../../../../.storybook/decorators/store-decorator";
import { ActionNode } from "./action-node";
import type { ActionNodeData } from "@/lib/workflow/types";

const meta = {
  title: "Organisms/Nodes/Action Node",
  decorators: [ReactFlowDecorator, StoreDecorator],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const makeProps = (data: ActionNodeData) => ({
  id: "action-story",
  type: "action" as const,
  data: data as Record<string, unknown>,
  dragging: false,
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  selected: false,
  deletable: true,
  selectable: true,
  draggable: true,
  parentId: undefined,
  width: 256,
  height: 400,
});

export const BrandAssets: Story = {
  render: () => (
    <ActionNode
      {...makeProps({
        type: "action",
        actionType: "frontify-brand-assets",
        label: "Brand Assets",
        description: "Brand colors, fonts, and logos from Frontify",
        provider: "Frontify",
        enabled: true,
        locked: false,
        status: "success",
      })}
    />
  ),
};

export const AICampaign: Story = {
  render: () => (
    <ActionNode
      {...makeProps({
        type: "action",
        actionType: "ploy-ai-campaign",
        label: "AI Campaign Agent",
        description: "Generate multi-channel campaign with Claude Opus",
        provider: "Ploy",
        enabled: true,
        locked: false,
        status: "success",
      })}
    />
  ),
};

export const LandingPage: Story = {
  render: () => (
    <ActionNode
      {...makeProps({
        type: "action",
        actionType: "webflow-landing-page",
        label: "Landing Page",
        description: "Generate and publish landing page to Webflow",
        provider: "Webflow",
        enabled: true,
        locked: false,
        status: "success",
        width: "w-72",
      })}
    />
  ),
};

export const InstagramAds: Story = {
  render: () => (
    <ActionNode
      {...makeProps({
        type: "action",
        actionType: "meta-instagram-ads",
        label: "Instagram Ads",
        description: "Create and manage Instagram ad campaigns",
        provider: "Meta",
        enabled: true,
        locked: false,
        status: "idle",
      })}
    />
  ),
};

export const Empty: Story = {
  name: "Empty (No Action Selected)",
  render: () => (
    <ActionNode
      {...makeProps({
        type: "action",
        actionType: "",
        label: "",
        description: "",
        provider: "",
        enabled: true,
        locked: false,
      })}
    />
  ),
};
