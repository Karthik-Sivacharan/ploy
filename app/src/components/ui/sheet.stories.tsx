import type { Meta, StoryObj } from "@storybook/react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./sheet"
import { Button } from "./button"

const meta = {
  title: "Atoms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const RightSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Right
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Right Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the right.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <p className="text-sm text-muted-foreground">Sheet content here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const BottomSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Bottom
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides up from the bottom.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground">Sheet content here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const LeftSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Left
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the left.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <p className="text-sm text-muted-foreground">Sheet content here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Sheet
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet with Full Layout</SheetTitle>
          <SheetDescription>
            This sheet demonstrates header, content, and footer composition.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4">
          <p className="text-sm text-muted-foreground">
            Main content area between header and footer.
          </p>
        </div>
        <SheetFooter>
          <Button size="sm">Save</Button>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
