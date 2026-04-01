import type { Meta, StoryObj } from "@storybook/react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"
import { Button } from "./button"
import { Icon } from "./icon"

const meta = {
  title: "Primitives/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger className="text-sm font-medium">
        Click to expand
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-lg border p-3 text-sm text-muted-foreground">
          This is the collapsible content. It starts hidden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="text-sm font-medium">
        Already expanded
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-lg border p-3 text-sm text-muted-foreground">
          This content is visible by default.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const WithTriggerButton: Story = {
  render: () => (
    <Collapsible className="w-64">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Settings</span>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-xs" />}>
          <Icon name="arrow-down" size="xs" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-2 space-y-2">
          <div className="rounded-lg border p-2 text-sm">Option A</div>
          <div className="rounded-lg border p-2 text-sm">Option B</div>
          <div className="rounded-lg border p-2 text-sm">Option C</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
