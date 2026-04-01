import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel"

const meta = {
  title: "Primitives/Carousel",
  component: Carousel,
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"]

export const Horizontal: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs">
      <Carousel>
        <CarouselContent>
          {slides.map((label) => (
            <CarouselItem key={label}>
              <div className="flex h-32 items-center justify-center rounded-xl bg-muted text-sm font-medium">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs">
      <Carousel orientation="vertical">
        <CarouselContent className="h-48">
          {slides.map((label) => (
            <CarouselItem key={label}>
              <div className="flex h-32 items-center justify-center rounded-xl bg-muted text-sm font-medium">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
}

export const WithNavButtons: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs px-14">
      <Carousel>
        <CarouselContent>
          {slides.map((label) => (
            <CarouselItem key={label}>
              <div className="flex h-32 items-center justify-center rounded-xl bg-muted text-sm font-medium">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}
