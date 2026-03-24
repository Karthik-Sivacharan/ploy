import type { Meta, StoryObj } from "@storybook/react";
import { ReactFlowDecorator } from "../../../.storybook/decorators/react-flow-decorator";
import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeDescription,
  NodeContent,
  NodeFields,
  NodeFieldRow,
  NodeFooter,
  NodeStatusBar,
} from "./node";

const meta = {
  title: "Organisms/Nodes/Base Node",
  decorators: [ReactFlowDecorator],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Node handles={{ target: true, source: true }} className="w-64">
      <NodeHeader>
        <NodeTitle>Default Node</NodeTitle>
        <NodeDescription>A basic workflow node</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <p className="text-xs text-muted-foreground">Node content goes here</p>
      </NodeContent>
      <NodeFooter>
        <span className="text-xs text-muted-foreground">Footer</span>
      </NodeFooter>
    </Node>
  ),
};

export const WithFields: Story = {
  render: () => (
    <Node handles={{ target: true, source: true }} className="w-64">
      <NodeHeader>
        <NodeTitle>HTTP Request</NodeTitle>
        <NodeDescription>Make an API call</NodeDescription>
      </NodeHeader>
      <NodeFields>
        <NodeFieldRow label="URL" value="https://api.example.com" />
        <NodeFieldRow label="Method" value="POST" />
        <NodeFieldRow label="Headers" value="Authorization: Bearer ..." />
      </NodeFields>
      <NodeFooter>
        <span className="text-xs text-muted-foreground">Ready</span>
      </NodeFooter>
    </Node>
  ),
};

export const StatusIdle: Story = {
  render: () => (
    <Node handles={{ target: true, source: true }} className="w-64">
      <NodeHeader>
        <NodeTitle>Idle Node</NodeTitle>
      </NodeHeader>
      <NodeFields>
        <NodeFieldRow label="Status" value="Waiting" />
      </NodeFields>
      <NodeStatusBar status="idle" />
    </Node>
  ),
};

export const StatusRunning: Story = {
  render: () => (
    <Node handles={{ target: true, source: true }} className="w-64">
      <NodeHeader>
        <NodeTitle>Running Node</NodeTitle>
      </NodeHeader>
      <NodeFields>
        <NodeFieldRow label="Status" value="Processing..." />
      </NodeFields>
      <NodeStatusBar status="running" />
    </Node>
  ),
};

export const StatusSuccess: Story = {
  render: () => (
    <Node handles={{ target: true, source: true }} className="w-64">
      <NodeHeader>
        <NodeTitle>Success Node</NodeTitle>
      </NodeHeader>
      <NodeFields>
        <NodeFieldRow label="Status" value="Completed" />
      </NodeFields>
      <NodeStatusBar status="success" />
    </Node>
  ),
};

export const StatusError: Story = {
  render: () => (
    <Node handles={{ target: true, source: true }} className="w-64">
      <NodeHeader>
        <NodeTitle>Error Node</NodeTitle>
      </NodeHeader>
      <NodeFields>
        <NodeFieldRow label="Status" value="Failed" />
        <NodeFieldRow label="Error" value="Connection timeout" />
      </NodeFields>
      <NodeStatusBar status="error" />
    </Node>
  ),
};
