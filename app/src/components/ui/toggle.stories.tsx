import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"
import { Icon } from "./icon"

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: <Icon name="text-bold" size="sm" />,
    "aria-label": "Toggle bold",
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="Small">
        <Icon name="text-bold" size="sm" />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <Icon name="text-bold" size="sm" />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Icon name="text-bold" size="sm" />
      </Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const TextToggle: Story = {
  args: {
    children: "Toggle me",
    "aria-label": "Toggle",
  },
}

export const FormattingToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 rounded-lg border border-input p-1">
      <Toggle size="sm" aria-label="Bold">
        <Icon name="text-bold" size="sm" />
      </Toggle>
      <Toggle size="sm" aria-label="Italic">
        <Icon name="text-italic" size="sm" />
      </Toggle>
      <Toggle size="sm" aria-label="Underline">
        <Icon name="text-underline" size="sm" />
      </Toggle>
      <Toggle size="sm" aria-label="Strikethrough">
        <Icon name="text-strikethrough" size="sm" />
      </Toggle>
    </div>
  ),
}
