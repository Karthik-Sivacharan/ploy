"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ModelSelectorLogo } from "@/components/ai-elements/model-selector";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
} from "@/components/ui/progress";
import { SectionHeader, InfoRow, SourceInfo } from "@/components/workflow/node-bodies/shared";

const AVAILABLE_MODELS = [
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", provider: "anthropic" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "google" },
  { id: "llama-4-maverick", label: "Llama 4 Maverick", provider: "llama" },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "deepseek" },
] as const;

const CAMPAIGN_DETAILS = [
  { key: "Recipients", value: "12,847" },
  { key: "Segment", value: "Summer Trial Prospects" },
  { key: "Platforms", value: "iOS, Android" },
  { key: "Schedule", value: "Jun 1, 2026 \u00b7 9:00 AM" },
] as const;

/* -- Compact variant -- rendered inside the canvas node -- */

function CompactBody() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Model badge */}
      <div className="flex justify-start">
        <Badge variant="secondary" className="gap-1 text-badge">
          <ModelSelectorLogo provider="anthropic" className="size-3" />
          Claude Sonnet 4.6
        </Badge>
      </div>

      {/* Push notification mockup */}
      <div className="rounded-xl border border-border-subtle bg-secondary/50 p-2.5">
        {/* App header row */}
        <div className="flex items-center gap-1.5">
          <div className="flex size-5 items-center justify-center rounded-md bg-muted">
            <Icon name="bell" size="xs" />
          </div>
          <span className="text-badge font-medium text-foreground">
            Peloton
          </span>
          <span className="ml-auto text-badge text-muted-foreground">now</span>
        </div>
        {/* Title */}
        <p className="mt-1.5 text-detail font-semibold text-foreground">
          Your Summer Starts Here 🚴
        </p>
        {/* Body */}
        <p className="mt-0.5 text-badge leading-snug text-muted-foreground line-clamp-2">
          Start your free trial today and join millions riding together.
        </p>
      </div>

      {/* Recipients */}
      <span className="text-detail text-muted-foreground">
        12,847 recipients
      </span>

      {/* Platform pills */}
      <div className="flex gap-1.5">
        <Badge variant="outline" className="text-badge">iOS</Badge>
        <Badge variant="outline" className="text-badge">Android</Badge>
      </div>
    </div>
  );
}

/* -- Expanded variant -- rendered in the editor sidebar -- */

function ExpandedBody() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Model */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Model</SectionHeader>
        <Select defaultValue="claude-sonnet-4-6">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex items-center gap-2">
                  <ModelSelectorLogo provider={model.provider} className="size-3.5" />
                  <span>{model.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Notification preview */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Notification Preview</SectionHeader>
        <div className="rounded-xl border border-border-subtle bg-secondary/50 p-3">
          {/* App header row */}
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-muted">
              <Icon name="bell" size="xs" />
            </div>
            <span className="text-xs font-medium text-foreground">Peloton</span>
            <span className="ml-auto text-badge text-muted-foreground">now</span>
          </div>
          {/* Title */}
          <p className="mt-2 text-sm font-semibold text-foreground">
            Your Summer Starts Here 🚴
          </p>
          {/* Body */}
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Start your free trial today and join millions riding together. Your
            first 30 days are free.
          </p>
        </div>
      </section>

      {/* Delivery */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Delivery</SectionHeader>
        <Progress value={0}>
          <ProgressTrack className="h-2">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <span className="text-xs text-muted-foreground">
          0 / 12,847 delivered
        </span>
      </section>

      {/* Campaign details */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Campaign Details</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {CAMPAIGN_DETAILS.map((detail) => (
            <InfoRow key={detail.key} label={detail.key} value={detail.value} />
          ))}
          {/* Priority row with badge */}
          <InfoRow
            label="Priority"
            value={<Badge variant="secondary" className="text-badge">High</Badge>}
          />
        </div>
      </section>

      {/* Targeting pills */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Targeting</SectionHeader>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-badge">iOS</Badge>
          <Badge variant="outline" className="text-badge">Android</Badge>
          <Badge variant="outline" className="text-badge">Fitness</Badge>
          <Badge variant="outline" className="text-badge">25-54</Badge>
        </div>
      </section>

      {/* CTA button */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="link" size="xs" />
        Open in OneSignal
      </Button>

      {/* Source info */}
      <SourceInfo icon="clock">Scheduled &middot; Jun 1, 2026</SourceInfo>
    </div>
  );
}

interface PushNotificationBodyProps {
  variant?: "compact" | "expanded";
}

export function PushNotificationBody({ variant = "compact" }: PushNotificationBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
