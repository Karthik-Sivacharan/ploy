import type { Meta, StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion"

const meta = {
  title: "Primitives/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const SingleItem: Story = {
  render: () => (
    <Accordion className="w-96">
      <AccordionItem>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <Accordion className="w-96">
      <AccordionItem>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS animations for smooth open/close transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultValue={[0]} className="w-96">
      <AccordionItem>
        <AccordionTrigger>This item starts open</AccordionTrigger>
        <AccordionContent>
          This accordion item is expanded by default using the defaultValue prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>This item starts closed</AccordionTrigger>
        <AccordionContent>
          Click to expand this item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
