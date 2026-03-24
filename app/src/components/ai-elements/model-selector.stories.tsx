import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorShortcut,
  ModelSelectorSeparator,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
} from "./model-selector"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

const meta = {
  title: "Organisms/AI Elements/Model Selector",
  component: ModelSelector,
  tags: ["autodocs"],
} satisfies Meta<typeof ModelSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <ModelSelector open={open} onOpenChange={setOpen}>
        <ModelSelectorTrigger render={
          <Button variant="outline" className="gap-2">
            <ModelSelectorLogoGroup>
              <ModelSelectorLogo provider="anthropic" />
            </ModelSelectorLogoGroup>
            <span>Claude Opus 4</span>
            <Icon name="chevron-down" size="xs" />
          </Button>
        } />
        <ModelSelectorContent>
          <ModelSelectorInput placeholder="Search models..." />
          <ModelSelectorList>
            <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
            <ModelSelectorGroup heading="Anthropic">
              <ModelSelectorItem value="claude-opus-4">
                <ModelSelectorLogo provider="anthropic" />
                <ModelSelectorName>Claude Opus 4</ModelSelectorName>
                <ModelSelectorShortcut>Most capable</ModelSelectorShortcut>
              </ModelSelectorItem>
              <ModelSelectorItem value="claude-sonnet-4">
                <ModelSelectorLogo provider="anthropic" />
                <ModelSelectorName>Claude Sonnet 4</ModelSelectorName>
                <ModelSelectorShortcut>Balanced</ModelSelectorShortcut>
              </ModelSelectorItem>
              <ModelSelectorItem value="claude-haiku-4">
                <ModelSelectorLogo provider="anthropic" />
                <ModelSelectorName>Claude Haiku 4</ModelSelectorName>
                <ModelSelectorShortcut>Fastest</ModelSelectorShortcut>
              </ModelSelectorItem>
            </ModelSelectorGroup>
            <ModelSelectorSeparator />
            <ModelSelectorGroup heading="OpenAI">
              <ModelSelectorItem value="gpt-4o">
                <ModelSelectorLogo provider="openai" />
                <ModelSelectorName>GPT-4o</ModelSelectorName>
              </ModelSelectorItem>
              <ModelSelectorItem value="gpt-4o-mini">
                <ModelSelectorLogo provider="openai" />
                <ModelSelectorName>GPT-4o Mini</ModelSelectorName>
              </ModelSelectorItem>
            </ModelSelectorGroup>
            <ModelSelectorSeparator />
            <ModelSelectorGroup heading="Google">
              <ModelSelectorItem value="gemini-2.5-pro">
                <ModelSelectorLogo provider="google" />
                <ModelSelectorName>Gemini 2.5 Pro</ModelSelectorName>
              </ModelSelectorItem>
            </ModelSelectorGroup>
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelector>
    )
  },
}

export const WithLogoGroup: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <ModelSelectorLogoGroup>
        <ModelSelectorLogo provider="anthropic" />
        <ModelSelectorLogo provider="openai" />
        <ModelSelectorLogo provider="google" />
      </ModelSelectorLogoGroup>
      <span className="text-sm text-muted-foreground">3 providers available</span>
    </div>
  ),
}
