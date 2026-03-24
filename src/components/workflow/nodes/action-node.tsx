"use client";

import type { NodeProps } from "@xyflow/react";
import type { ActionNodeData } from "@/lib/workflow/types";
import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeContent,
  NodeFields,
  NodeFieldRow,
  NodeFooter,
  NodeStatusBar,
} from "@/components/ai-elements/node";
import { NodeHoverToolbar } from "@/components/workflow/node-hover-toolbar";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ProviderIcon } from "@/components/ui/provider-icon";
import { getProvider } from "@/lib/providers";
import { BrandAssetsBody } from "@/components/workflow/node-bodies/brand-assets-body";
import { BrandVoiceBody } from "@/components/workflow/node-bodies/brand-voice-body";
import { TargetAudienceBody } from "@/components/workflow/node-bodies/target-audience-body";
import { AiCampaignBody } from "@/components/workflow/node-bodies/ai-campaign-body";
import { LandingPageBody } from "@/components/workflow/node-bodies/landing-page-body";
import { EmailSequenceBody } from "@/components/workflow/node-bodies/email-sequence-body";
import { InstagramAdsBody } from "@/components/workflow/node-bodies/instagram-ads-body";
import { PushNotificationBody } from "@/components/workflow/node-bodies/push-notification-body";

const DEFAULT_ACTION_FIELDS: Record<string, { key: string; value: string }[]> = {
  "generate-text": [
    { key: "Messages", value: "-" },
    { key: "Model", value: "gpt-4o" },
    { key: "Tools", value: "-" },
    { key: "Skills", value: "-" },
    { key: "Memory", value: "None" },
    { key: "Response Format", value: "-" },
    { key: "Error", value: "-" },
  ],
  "generate-image": [
    { key: "Prompt", value: "-" },
    { key: "Model", value: "dall-e-3" },
    { key: "Size", value: "1024x1024" },
    { key: "Error", value: "-" },
  ],
  "http-request": [
    { key: "URL", value: "-" },
    { key: "Method", value: "GET" },
    { key: "Headers", value: "-" },
    { key: "Body", value: "-" },
    { key: "Error", value: "-" },
  ],
  "database-query": [
    { key: "Query", value: "-" },
    { key: "Connection", value: "-" },
    { key: "Error", value: "-" },
  ],
  "condition": [
    { key: "Expression", value: "-" },
    { key: "True Branch", value: "-" },
    { key: "False Branch", value: "-" },
    { key: "Error", value: "-" },
  ],
  "github-create-issue": [
    { key: "Repository", value: "-" },
    { key: "Title", value: "-" },
    { key: "Body", value: "-" },
    { key: "Labels", value: "-" },
    { key: "Error", value: "-" },
  ],
  "github-list-issues": [
    { key: "Repository", value: "-" },
    { key: "State", value: "open" },
    { key: "Labels", value: "-" },
    { key: "Error", value: "-" },
  ],
  "slack-send-message": [
    { key: "Channel", value: "-" },
    { key: "Message", value: "-" },
    { key: "Error", value: "-" },
  ],
  "resend-send-email": [
    { key: "To", value: "-" },
    { key: "Subject", value: "-" },
    { key: "Body", value: "-" },
    { key: "Error", value: "-" },
  ],
  "stripe-create-customer": [
    { key: "Email", value: "-" },
    { key: "Name", value: "-" },
    { key: "Error", value: "-" },
  ],
  "stripe-create-invoice": [
    { key: "Customer", value: "-" },
    { key: "Amount", value: "-" },
    { key: "Currency", value: "USD" },
    { key: "Error", value: "-" },
  ],
};

function renderNodeBody(nodeData: ActionNodeData, fields: { key: string; value: string }[]) {
  switch (nodeData.actionType) {
    case "frontify-brand-assets":
      return (
        <>
          <BrandAssetsBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="success" className="text-badge">36 assets</Badge>
            <span className="text-badge text-muted-foreground">Synced Mar 18, 2026</span>
          </NodeFooter>
        </>
      );
    case "notion-brand-voice":
      return (
        <>
          <BrandVoiceBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="success" className="text-badge">Synced</Badge>
            <span className="text-badge text-muted-foreground">Edited Mar 12, 2026</span>
          </NodeFooter>
        </>
      );
    case "hubspot-target-audience":
      return (
        <>
          <TargetAudienceBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="success" className="text-badge">Active</Badge>
            <span className="text-badge text-muted-foreground">Auto-updating</span>
          </NodeFooter>
        </>
      );
    case "ploy-ai-campaign":
      return (
        <>
          <AiCampaignBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="success" className="text-badge">Generated</Badge>
            <span className="text-badge text-muted-foreground">All channels ready</span>
          </NodeFooter>
        </>
      );
    case "webflow-landing-page":
      return (
        <>
          <LandingPageBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="success" className="text-badge">Published</Badge>
            <span className="text-badge text-muted-foreground">Mar 18, 2026</span>
          </NodeFooter>
        </>
      );
    case "mailchimp-email-sequence":
      return (
        <>
          <EmailSequenceBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-badge">Ready to send</Badge>
            <span className="text-badge text-muted-foreground">3 emails queued</span>
          </NodeFooter>
        </>
      );
    case "meta-instagram-ads":
      return (
        <>
          <InstagramAdsBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="outline" className="text-badge">Draft</Badge>
            <span className="text-badge text-muted-foreground">Pending review</span>
          </NodeFooter>
        </>
      );
    case "onesignal-push-notification":
      return (
        <>
          <PushNotificationBody variant="compact" />
          <NodeFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="outline" className="text-badge">Scheduled</Badge>
            <span className="text-badge text-muted-foreground">Jun 1, 2026</span>
          </NodeFooter>
        </>
      );
    default:
      return (
        <NodeFields>
          {fields.map((field) => (
            <NodeFieldRow key={field.key} label={field.key} value={field.value} />
          ))}
        </NodeFields>
      );
  }
}

export function ActionNode({ id, data }: NodeProps) {
  const nodeData = data as unknown as ActionNodeData;
  const providerConfig = getProvider(nodeData.provider);
  const hasAction = Boolean(nodeData.actionType);
  const fields = nodeData.fields ?? DEFAULT_ACTION_FIELDS[nodeData.actionType] ?? [];
  const widthClass = (nodeData.width as string) ?? "w-64";

  if (!hasAction) {
    return (
      <Node
        handles={{ target: true, source: true }}
        className={widthClass}
        toolbar={<NodeHoverToolbar nodeId={id} />}
      >
        <NodeContent className="flex flex-col items-center justify-center gap-2 py-8">
          <Icon name="plus" size="sm" className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Select an action</span>
        </NodeContent>
      </Node>
    );
  }

  return (
    <Node
      handles={{ target: true, source: true }}
      className={widthClass}
      toolbar={<NodeHoverToolbar nodeId={id} />}
    >
      <NodeHeader className="flex items-center gap-2">
        <div className={`flex size-9 items-center justify-center rounded-lg ${providerConfig.colors}`}>
          <ProviderIcon provider={nodeData.provider} size="md" />
        </div>
        <div className="flex flex-col">
          <NodeTitle className="text-sm font-semibold">
            {nodeData.label}
          </NodeTitle>
          {nodeData.provider && (
            <span className="text-badge leading-tight text-muted-foreground">
              from {nodeData.provider}
            </span>
          )}
        </div>
      </NodeHeader>

      {renderNodeBody(nodeData, fields)}

      <NodeStatusBar status={nodeData.status} />
    </Node>
  );
}
