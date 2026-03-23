import type { Meta, StoryObj } from "@storybook/react"
import { ProviderIcon } from "./provider-icon"
import { PROVIDERS } from "@/lib/providers"

const meta = {
  title: "Molecules/ProviderIcon",
  component: ProviderIcon,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
    },
  },
  args: {
    provider: "GitHub",
    size: "sm",
  },
} satisfies Meta<typeof ProviderIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllProviders: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {Object.keys(PROVIDERS).map((name) => (
        <div key={name} className="flex items-center gap-2">
          <ProviderIcon provider={name} size="sm" />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const FallbackIcon: Story = {
  args: {
    provider: "NonExistentProvider",
    size: "md",
  },
}
