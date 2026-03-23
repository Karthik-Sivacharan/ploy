import type { Meta, StoryObj } from "@storybook/react"
import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "./confirmation"

const meta = {
  title: "Organisms/AI Elements/Confirmation",
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ApprovalRequested: Story = {
  render: () => (
    <Confirmation
      approval={{ id: "tool_1" }}
      state="approval-requested"
      className="max-w-md"
    >
      <ConfirmationTitle>
        The AI wants to deploy the campaign to production. Allow this action?
      </ConfirmationTitle>
      <ConfirmationRequest>
        <p className="text-sm text-muted-foreground">
          This will send emails to 12,400 subscribers in the &quot;Q1 Launch&quot; segment.
        </p>
      </ConfirmationRequest>
      <ConfirmationActions>
        <ConfirmationAction variant="outline">Deny</ConfirmationAction>
        <ConfirmationAction>Approve</ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  ),
}

export const Accepted: Story = {
  render: () => (
    <Confirmation
      approval={{ id: "tool_2", approved: true }}
      state="approval-responded"
      className="max-w-md"
    >
      <ConfirmationTitle>
        Campaign deployment was approved.
      </ConfirmationTitle>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">
          The campaign has been sent to production successfully.
        </p>
      </ConfirmationAccepted>
    </Confirmation>
  ),
}

export const Rejected: Story = {
  render: () => (
    <Confirmation
      approval={{ id: "tool_3", approved: false, reason: "Budget not reviewed" }}
      state="approval-responded"
      className="max-w-md"
    >
      <ConfirmationTitle>
        Campaign deployment was denied.
      </ConfirmationTitle>
      <ConfirmationRejected>
        <p className="text-sm text-muted-foreground">
          Reason: Budget not reviewed. The action was blocked.
        </p>
      </ConfirmationRejected>
    </Confirmation>
  ),
}

export const CustomLabels: Story = {
  render: () => (
    <Confirmation
      approval={{ id: "tool_4" }}
      state="approval-requested"
      className="max-w-md"
    >
      <ConfirmationTitle>
        Delete workspace &quot;Marketing Q1&quot; and all associated data?
      </ConfirmationTitle>
      <ConfirmationRequest>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. 47 campaigns and 3 integrations will be permanently removed.
        </p>
      </ConfirmationRequest>
      <ConfirmationActions>
        <ConfirmationAction variant="outline">Cancel</ConfirmationAction>
        <ConfirmationAction variant="destructive">Delete Workspace</ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  ),
}
