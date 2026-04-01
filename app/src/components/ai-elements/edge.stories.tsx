import type { Meta, StoryObj } from "@storybook/react"
import { ReactFlow, Background, Handle, Position } from "@xyflow/react"
import { Edge } from "./edge"
import { ReactFlowDecorator } from "../../../.storybook/decorators"

const DummyNode = ({ data }: { data: { label: string } }) => (
  <div className="rounded-lg border bg-background px-4 py-2 text-sm shadow-sm">
    <Handle type="target" position={Position.Left} />
    <span>{data.label}</span>
    <Handle type="source" position={Position.Right} />
  </div>
)

const nodeTypes = { dummy: DummyNode }
const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary }

const nodes = [
  { id: "a", type: "dummy", position: { x: 50, y: 100 }, data: { label: "Source Node" } },
  { id: "b", type: "dummy", position: { x: 400, y: 100 }, data: { label: "Target Node" } },
]

const AnimatedEdgeMeta = {
  title: "Canvas/Animated Edge",
  decorators: [ReactFlowDecorator],
  tags: ["autodocs"],
} satisfies Meta

export default AnimatedEdgeMeta
type Story = StoryObj<typeof AnimatedEdgeMeta>

export const Default: Story = {
  render: () => (
    <ReactFlow
      nodes={nodes}
      edges={[{ id: "e-a-b", source: "a", target: "b", type: "animated" }]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  ),
}

export const WithMarkerEnd: Story = {
  render: () => (
    <ReactFlow
      nodes={nodes}
      edges={[
        {
          id: "e-a-b",
          source: "a",
          target: "b",
          type: "animated",
          markerEnd: { type: "arrowclosed" as const },
        },
      ]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  ),
}
