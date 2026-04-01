import type { Meta, StoryObj } from "@storybook/react"
import { Icon } from "./icon"
import { icons, type IconName } from "@/lib/icons"

const allIconNames = Object.keys(icons) as IconName[]

const meta = {
  title: "Primitives/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: allIconNames,
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    strokeWidth: { control: { type: "number", min: 1, max: 4, step: 0.5 } },
  },
  args: {
    name: "sparkles",
    size: "md",
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
      {allIconNames.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center"
        >
          <Icon name={name} size="md" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="sparkles" size={size} />
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}
