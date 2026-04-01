import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"
import { Label } from "./label"

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const SmallChecked: Story = {
  args: {
    size: "sm",
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch size="sm" defaultChecked />
        <Label>Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch size="default" defaultChecked />
        <Label>Default</Label>
      </div>
    </div>
  ),
}
