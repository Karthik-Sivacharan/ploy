import type { ActionGroup } from "./types";

export const ACTION_GROUPS: ActionGroup[] = [
  {
    provider: "System",
    icon: "settings",
    category: "system",
    actions: [
      {
        id: "http-request",
        label: "HTTP Request",
        description: "Make an HTTP request to any API",
        provider: "System",
        category: "system",
      },
      {
        id: "database-query",
        label: "Database Query",
        description: "Query your database",
        provider: "System",
        category: "system",
      },
      {
        id: "condition",
        label: "Condition",
        description: "Branch based on a condition",
        provider: "System",
        category: "system",
      },
    ],
  },
  {
    provider: "AI Gateway",
    icon: "sparkles",
    category: "ai",
    actions: [
      {
        id: "generate-text",
        label: "Generate Text",
        description: "Generate text using AI models",
        provider: "AI Gateway",
        category: "ai",
      },
      {
        id: "generate-image",
        label: "Generate Image",
        description: "Generate images using AI models",
        provider: "AI Gateway",
        category: "ai",
      },
    ],
  },
  {
    provider: "GitHub",
    icon: "github",
    category: "integrations",
    actions: [
      {
        id: "github-create-issue",
        label: "Create Issue",
        description: "Create a new issue in a GitHub repository",
        provider: "GitHub",
        category: "integrations",
      },
      {
        id: "github-list-issues",
        label: "List Issues",
        description: "List issues in a GitHub repository",
        provider: "GitHub",
        category: "integrations",
      },
    ],
  },
  {
    provider: "Slack",
    icon: "message-square",
    category: "integrations",
    actions: [
      {
        id: "slack-send-message",
        label: "Send Message",
        description: "Send a message to a Slack channel",
        provider: "Slack",
        category: "integrations",
      },
    ],
  },
  {
    provider: "Resend",
    icon: "mail",
    category: "integrations",
    actions: [
      {
        id: "resend-send-email",
        label: "Send Email",
        description: "Send an email via Resend",
        provider: "Resend",
        category: "integrations",
      },
    ],
  },
  {
    provider: "Stripe",
    icon: "credit-card",
    category: "integrations",
    actions: [
      {
        id: "stripe-create-customer",
        label: "Create Customer",
        description: "Create a new customer in Stripe",
        provider: "Stripe",
        category: "integrations",
      },
      {
        id: "stripe-create-invoice",
        label: "Create Invoice",
        description: "Create and optionally send an invoice",
        provider: "Stripe",
        category: "integrations",
      },
    ],
  },
];
