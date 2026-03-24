import type { Meta, StoryObj } from "@storybook/react"
import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from "./inline-citation"

const meta = {
  title: "Organisms/AI Elements/Inline Citation",
  component: InlineCitation,
  tags: ["autodocs"],
} satisfies Meta<typeof InlineCitation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <p className="max-w-lg text-sm leading-relaxed">
      Claude uses constitutional AI to align its outputs with human values
      <InlineCitation>
        <InlineCitationText> through a process of self-improvement</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={["https://docs.anthropic.com/en/docs/overview"]} />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev />
                <InlineCitationCarouselIndex />
                <InlineCitationCarouselNext />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title="Anthropic API Overview"
                    url="https://docs.anthropic.com/en/docs/overview"
                    description="Claude is trained using a technique called Constitutional AI (CAI), which aims to make AI systems helpful, harmless, and honest."
                  />
                </InlineCitationCarouselItem>
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      . This technique has shown promising results in reducing harmful outputs.
    </p>
  ),
}

export const MultipleSources: Story = {
  render: () => (
    <p className="max-w-lg text-sm leading-relaxed">
      React Server Components allow you to render components on the server
      <InlineCitation>
        <InlineCitationText>, reducing the JavaScript bundle sent to the client</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger
            sources={[
              "https://react.dev/blog/2023/03/22/react-labs",
              "https://nextjs.org/docs/app/building-your-application/rendering",
            ]}
          />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev />
                <InlineCitationCarouselIndex />
                <InlineCitationCarouselNext />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title="React Labs — March 2023"
                    url="https://react.dev/blog/2023/03/22/react-labs"
                    description="Server Components let you run components on the server, reducing bundle size and improving performance."
                  />
                </InlineCitationCarouselItem>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title="Rendering in Next.js"
                    url="https://nextjs.org/docs/app/building-your-application/rendering"
                    description="Next.js uses React Server Components by default in the App Router."
                  />
                </InlineCitationCarouselItem>
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      .
    </p>
  ),
}

export const WithQuote: Story = {
  render: () => (
    <p className="max-w-lg text-sm leading-relaxed">
      The documentation states
      <InlineCitation>
        <InlineCitationText> that OKLCH provides perceptually uniform colors</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={["https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"]} />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselContent>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title="OKLCH in CSS"
                    url="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
                  />
                  <InlineCitationQuote>
                    OKLCH is the first color space that is truly perceptually uniform, making
                    it ideal for design systems.
                  </InlineCitationQuote>
                </InlineCitationCarouselItem>
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      .
    </p>
  ),
}
