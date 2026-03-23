import type { Meta, StoryObj } from "@storybook/react"
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "./tool"

const meta = {
  title: "Organisms/AI Elements/Tool",
  component: Tool,
  tags: ["autodocs"],
} satisfies Meta<typeof Tool>

export default meta
type Story = StoryObj<typeof meta>

export const Completed: Story = {
  render: () => (
    <Tool className="max-w-lg" defaultOpen>
      <ToolHeader
        title="search_web"
        type="tool-invocation"
        state="output-available"
      />
      <ToolContent>
        <ToolInput input={{ query: "best practices for React Server Components", max_results: 5 }} />
        <ToolOutput
          output={{
            results: [
              { title: "React Server Components Guide", url: "https://react.dev/rsc" },
              { title: "Next.js App Router Docs", url: "https://nextjs.org/docs" },
            ],
          }}
          errorText={undefined}
        />
      </ToolContent>
    </Tool>
  ),
}

export const Running: Story = {
  render: () => (
    <Tool className="max-w-lg">
      <ToolHeader
        title="generate_campaign"
        type="tool-invocation"
        state="input-available"
      />
      <ToolContent>
        <ToolInput
          input={{
            brand: "Acme Corp",
            channels: ["email", "social", "display"],
            budget: 50000,
            target_audience: "B2B SaaS decision makers",
          }}
        />
      </ToolContent>
    </Tool>
  ),
}

export const WithError: Story = {
  render: () => (
    <Tool className="max-w-lg" defaultOpen>
      <ToolHeader
        title="fetch_analytics"
        type="tool-invocation"
        state="output-error"
      />
      <ToolContent>
        <ToolInput input={{ dashboard_id: "dash_abc123", date_range: "last_30_days" }} />
        <ToolOutput
          output={undefined}
          errorText="API rate limit exceeded. Please retry after 60 seconds."
        />
      </ToolContent>
    </Tool>
  ),
}

export const AwaitingApproval: Story = {
  render: () => (
    <Tool className="max-w-lg">
      <ToolHeader
        title="deploy_campaign"
        type="tool-invocation"
        state="approval-requested"
      />
      <ToolContent>
        <ToolInput
          input={{
            campaign_id: "camp_789",
            environment: "production",
            channels: ["email", "push"],
          }}
        />
      </ToolContent>
    </Tool>
  ),
}

export const DynamicTool: Story = {
  render: () => (
    <Tool className="max-w-lg" defaultOpen>
      <ToolHeader
        type="dynamic-tool"
        state="output-available"
        toolName="custom_brand_analyzer"
      />
      <ToolContent>
        <ToolInput input={{ brand_url: "https://example.com", depth: "comprehensive" }} />
        <ToolOutput
          output={{
            brand_score: 87,
            strengths: ["strong visual identity", "consistent messaging"],
            improvements: ["mobile experience", "social proof"],
          }}
          errorText={undefined}
        />
      </ToolContent>
    </Tool>
  ),
}

export const Denied: Story = {
  render: () => (
    <Tool className="max-w-lg">
      <ToolHeader
        title="delete_workspace"
        type="tool-invocation"
        state="output-denied"
      />
      <ToolContent>
        <ToolInput input={{ workspace_id: "ws_456", confirm: true }} />
      </ToolContent>
    </Tool>
  ),
}
