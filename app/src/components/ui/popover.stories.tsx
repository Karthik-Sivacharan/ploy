import type { Meta, StoryObj } from "@storybook/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "./popover"
import { Button } from "./button"

const meta = {
  title: "Primitives/Popover",
  component: Popover,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-24">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">This is the popover content.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            A short description of the popover content.
          </PopoverDescription>
        </PopoverHeader>
        <p className="text-sm">
          Additional content goes here below the header.
        </p>
      </PopoverContent>
    </Popover>
  ),
}
