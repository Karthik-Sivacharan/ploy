import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card"
import { Button } from "./button"
import { Icon } from "./icon"

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
  args: {
    size: "default",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description with supporting text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const SmallCard: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} className="w-72">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>Compact variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content in a smaller card.</p>
      </CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>Header includes an action button.</CardDescription>
        <CardAction>
          <Button variant="outline" size="icon-sm" aria-label="Settings">
            <Icon name="settings" size="xs" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>The action sits in the top-right of the header.</p>
      </CardContent>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardContent>
        <p>A card with only content — no header or footer.</p>
      </CardContent>
    </Card>
  ),
}
