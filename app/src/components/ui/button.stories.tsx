import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Icon } from "./icon"

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const Ghost: Story = {
  args: { variant: "ghost" },
}

export const Destructive: Story = {
  args: { variant: "destructive" },
}

export const Link: Story = {
  args: { variant: "link" },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="plus" size="sm" data-icon="inline-start" />
        Add Item
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    size: "icon",
    variant: "outline",
    children: <Icon name="settings" size="sm" />,
    "aria-label": "Settings",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Icon">
        <Icon name="plus" size="sm" />
      </Button>
      <Button size="icon-xs" aria-label="Icon XS">
        <Icon name="plus" size="xs" />
      </Button>
      <Button size="icon-sm" aria-label="Icon SM">
        <Icon name="plus" size="sm" />
      </Button>
      <Button size="icon-lg" aria-label="Icon LG">
        <Icon name="plus" size="md" />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}
