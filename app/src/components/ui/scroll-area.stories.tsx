import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea } from "./scroll-area"

const meta = {
  title: "Molecules/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            Item {i + 1} — Lorem ipsum dolor sit amet consectetur.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="h-24 w-64 rounded-lg border p-4">
      <div className="flex gap-4" style={{ width: "800px" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border p-4">
      <div style={{ width: "600px" }}>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="whitespace-nowrap text-sm text-muted-foreground">
            Row {i + 1} — This line is intentionally long to trigger horizontal scrolling as well as vertical.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
}
