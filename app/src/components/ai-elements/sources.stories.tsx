import type { Meta, StoryObj } from "@storybook/react"
import { Sources, SourcesTrigger, SourcesContent, Source } from "./sources"

const meta = {
  title: "Organisms/AI Elements/Sources",
  component: Sources,
  tags: ["autodocs"],
} satisfies Meta<typeof Sources>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sources>
      <SourcesTrigger count={3} />
      <SourcesContent>
        <Source href="https://docs.anthropic.com/en/docs/overview" title="Anthropic API Documentation" />
        <Source href="https://react.dev/reference/react" title="React Reference" />
        <Source href="https://tailwindcss.com/docs" title="Tailwind CSS Documentation" />
      </SourcesContent>
    </Sources>
  ),
}

export const SingleSource: Story = {
  render: () => (
    <Sources {...{ defaultOpen: true } as any}>
      <SourcesTrigger count={1} />
      <SourcesContent>
        <Source href="https://nextjs.org/docs" title="Next.js Documentation" />
      </SourcesContent>
    </Sources>
  ),
}

export const ManySources: Story = {
  render: () => (
    <Sources {...{ defaultOpen: true } as any}>
      <SourcesTrigger count={5} />
      <SourcesContent>
        <Source href="https://docs.anthropic.com" title="Anthropic API Docs" />
        <Source href="https://react.dev" title="React Documentation" />
        <Source href="https://tailwindcss.com/docs" title="Tailwind CSS Docs" />
        <Source href="https://storybook.js.org/docs" title="Storybook Documentation" />
        <Source href="https://zustand.docs.pmnd.rs" title="Zustand State Management" />
      </SourcesContent>
    </Sources>
  ),
}
