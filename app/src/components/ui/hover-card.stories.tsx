import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"

const meta = {
  title: "Primitives/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-24">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4"
          />
        }
      >
        @ploy
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Ploy</p>
              <p className="text-xs text-muted-foreground">@ploy</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-native marketing platform for brand, website, and multi-channel
            growth.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
