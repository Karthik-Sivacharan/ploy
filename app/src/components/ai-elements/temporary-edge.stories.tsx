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
const edgeTypes = { temporary: Edge.Temporary }

const nodes = [
  { id: "a", type: "dummy", position: { x: 50, y: 100 }, data: { label: "Source" } },
  { id: "b", type: "dummy", position: { x: 400, y: 100 }, data: { label: "Target" } },
]

const meta = {
  title: "Canvas/Temporary Edge",
  decorators: [ReactFlowDecorator],
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ReactFlow
      nodes={nodes}
      edges={[{ id: "e-a-b", source: "a", target: "b", type: "temporary" }]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  ),
}

export const MultipleEdges: Story = {
  render: () => (
    <ReactFlow
      nodes={[
        ...nodes,
        { id: "c", type: "dummy", position: { x: 400, y: 250 }, data: { label: "Target 2" } },
      ]}
      edges={[
        { id: "e-a-b", source: "a", target: "b", type: "temporary" },
        { id: "e-a-c", source: "a", target: "c", type: "temporary" },
      ]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  ),
}
