import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Organisms/AI Elements/Connection Line",
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const HALF = 0.5

export const Default: Story = {
  render: () => {
    const fromX = 50
    const fromY = 100
    const toX = 350
    const toY = 100
    return (
      <svg width="400" height="200" className="rounded-lg border bg-background">
        <g>
          <path
            d={`M${fromX},${fromY} C ${fromX + (toX - fromX) * HALF},${fromY} ${fromX + (toX - fromX) * HALF},${toY} ${toX},${toY}`}
            fill="none"
            stroke="var(--color-ring)"
            strokeWidth={1}
          />
          <circle
            cx={toX}
            cy={toY}
            fill="var(--color-background)"
            r={3}
            stroke="var(--color-ring)"
            strokeWidth={1}
          />
        </g>
      </svg>
    )
  },
}

export const Curved: Story = {
  render: () => {
    const fromX = 50
    const fromY = 50
    const toX = 350
    const toY = 180
    return (
      <svg width="400" height="220" className="rounded-lg border bg-background">
        <g>
          <path
            d={`M${fromX},${fromY} C ${fromX + (toX - fromX) * HALF},${fromY} ${fromX + (toX - fromX) * HALF},${toY} ${toX},${toY}`}
            fill="none"
            stroke="var(--color-ring)"
            strokeWidth={1}
          />
          <circle
            cx={toX}
            cy={toY}
            fill="var(--color-background)"
            r={3}
            stroke="var(--color-ring)"
            strokeWidth={1}
          />
        </g>
      </svg>
    )
  },
}
