"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ProviderIcon } from "@/components/ui/provider-icon";
import { ModelSelectorLogo } from "@/components/ai-elements/model-selector";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/ui/section-header";
import { SourceInfo } from "@/components/ui/source-info";

const AVAILABLE_MODELS = [
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", provider: "anthropic" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "google" },
  { id: "llama-4-maverick", label: "Llama 4 Maverick", provider: "llama" },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "deepseek" },
] as const;

const CAMPAIGN_TITLE = "Peloton Summer Launch";

const CAMPAIGN_PROMPT =
  "Launch our summer campaign targeting fitness-motivated adults (25-54). Goal: drive free trial signups. Tone: empowering, warm, community-first. Generate on-brand assets across web, email, Instagram, and push.";

const CONNECTED_SOURCES = ["Frontify", "Notion", "HubSpot"] as const;

const CHANNEL_OUTPUTS = ["Web", "Email", "Instagram", "Push"] as const;

const GENERATED_ITEMS = [
  "Landing Page",
  "3 Emails",
  "2 Ad Creatives",
  "Push Notification",
] as const;

const STATUS_TEXT = "Generated \u00B7 All channels ready";

/* ── Compact variant — rendered inside the canvas node ── */

function CompactBody() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Model + status badges */}
      <div className="flex items-center gap-1.5">
        <Badge variant="secondary" className="gap-1 text-badge">
          <ModelSelectorLogo provider="anthropic" className="size-3" />
          Claude Opus 4.6
        </Badge>
        <Badge variant="success" className="text-badge">Generated</Badge>
      </div>

      {/* Campaign title */}
      <span className="text-sm font-bold text-foreground">{CAMPAIGN_TITLE}</span>

      {/* Prompt preview */}
      <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {CAMPAIGN_PROMPT}
      </p>

      {/* Connected source icons */}
      <div className="flex items-center gap-2">
        {CONNECTED_SOURCES.map((source) => (
          <div
            key={source}
            className="flex size-5 items-center justify-center"
          >
            <ProviderIcon provider={source} size="xs" className="rounded" />
          </div>
        ))}
      </div>

      {/* Channel output pills */}
      <div className="flex flex-wrap gap-1.5">
        {CHANNEL_OUTPUTS.map((channel) => (
          <Badge key={channel} variant="outline" className="text-badge">
            {channel}
          </Badge>
        ))}
      </div>
    </div>
  );
}

/* ── Expanded variant — rendered in the editor sidebar ── */

function ExpandedBody() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Model */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Model</SectionHeader>
        <Select defaultValue="claude-opus-4-6">
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

      {/* Campaign title */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Campaign Title</SectionHeader>
        <div className="rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2">
          <span className="text-sm font-semibold text-foreground">{CAMPAIGN_TITLE}</span>
        </div>
      </section>

      {/* Campaign prompt */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Campaign Prompt</SectionHeader>
        <textarea
          defaultValue={CAMPAIGN_PROMPT}
          rows={5}
          className="w-full resize-none rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2 text-xs leading-relaxed text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </section>

      {/* Connected sources */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Connected Sources</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {CONNECTED_SOURCES.map((source) => (
            <div
              key={source}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <ProviderIcon provider={source} size="sm" className="shrink-0 rounded" />
              <span className="text-xs font-medium text-foreground">{source}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Channel outputs */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Channel Outputs</SectionHeader>
        <div className="flex flex-wrap gap-1.5">
          {CHANNEL_OUTPUTS.map((channel) => (
            <Badge key={channel} variant="outline" className="text-badge">
              {channel}
            </Badge>
          ))}
        </div>
      </section>

      {/* Generation status */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Generation Status</SectionHeader>
        <Badge variant="success" className="w-fit text-badge">Generated</Badge>
        <div className="flex flex-col gap-1.5">
          {GENERATED_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Icon name="check-circle" size="xs" className="text-success" />
              <span className="text-xs text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Status */}
      <SourceInfo>{STATUS_TEXT}</SourceInfo>
    </div>
  );
}

interface AiCampaignBodyProps {
  variant?: "compact" | "expanded";
}

export function AiCampaignBody({ variant = "compact" }: AiCampaignBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
