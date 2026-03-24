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
import { SectionHeader, InfoRow, SourceInfo } from "@/components/workflow/node-bodies/shared";

const AVAILABLE_MODELS = [
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", provider: "anthropic" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai" },
  { id: "gemini-2-0-flash", label: "Gemini 2.0 Flash", provider: "google" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "google" },
  { id: "llama-4-maverick", label: "Llama 4 Maverick", provider: "llama" },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "deepseek" },
] as const;

const AD_IMAGE_SRC = "/assets/instagram-ads/peloton-instagram-ad.jpeg";
const CAMPAIGN_STATUS = "Draft";
const CTA_TYPE = "Shop Now";
const DESTINATION_URL = "https://www.peloton.com/shop/summer-sale";

const TARGETING_PILLS = ["Fitness", "25-54", "Urban"] as const;
const INTEREST_PILLS = ["Fitness", "Wellness", "Home Workout"] as const;

const TARGETING_ROWS = [
  { key: "Demographics", value: "25-54, All genders" },
  { key: "Locations", value: "Urban metro areas" },
  { key: "Placements", value: "Feed, Stories" },
] as const;

const BUDGET_SCHEDULE = [
  { key: "Format", value: "Carousel — 4 slides" },
  { key: "Objective", value: "Conversions" },
  { key: "Budget", value: "$500/day" },
  { key: "Duration", value: "Jun 1 — Jun 30, 2026" },
] as const;

/* ── Compact variant — rendered inside the canvas node ── */

function CompactBody() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Model + status badges */}
      <div className="flex items-center gap-1.5">
        <Badge variant="secondary" className="gap-1 text-badge">
          <ModelSelectorLogo provider="google" className="size-3" />
          Gemini 2.0 Flash
        </Badge>
        <Badge variant="outline" className="text-badge">{CAMPAIGN_STATUS}</Badge>
      </div>

      {/* Ad preview card */}
      <div className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-secondary/50 p-2.5">
        {/* Ad image */}
        <img
          src={AD_IMAGE_SRC}
          alt="Instagram ad preview"
          className="w-full rounded-lg object-cover"
        />
        {/* Headline + sponsored */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">Your Journey Starts Here</span>
          <Badge variant="secondary" className="text-caption">Sponsored</Badge>
        </div>
        {/* CTA label */}
        <span className="text-badge text-muted-foreground">{CTA_TYPE} &rarr;</span>
      </div>

      {/* Format line */}
      <span className="text-detail text-muted-foreground">
        Carousel — 4 slides
      </span>

      {/* Targeting pills */}
      <div className="flex flex-wrap gap-1">
        {TARGETING_PILLS.map((pill) => (
          <Badge key={pill} variant="outline" className="text-badge">
            {pill}
          </Badge>
        ))}
      </div>

      {/* Budget */}
      <span className="text-detail text-muted-foreground">
        $500/day
      </span>
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
        <Select defaultValue="gemini-2-0-flash">
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

      {/* Ad creative */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Ad Creative</SectionHeader>
        <div className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-secondary/50 p-3">
          {/* Ad image */}
          <img
            src={AD_IMAGE_SRC}
            alt="Instagram ad preview"
            className="w-full rounded-lg object-cover"
          />
          {/* Headline */}
          <span className="text-sm font-semibold text-foreground">Your Journey Starts Here</span>
          {/* Caption preview */}
          <p className="text-xs leading-relaxed text-muted-foreground">
            Transform your fitness journey this summer. Join millions who ride together.
          </p>
          {/* Sponsored badge */}
          <div className="flex justify-start">
            <Badge variant="secondary" className="text-caption">Sponsored</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <InfoRow label="CTA" value={CTA_TYPE} />
          <InfoRow label="Destination" value={<span className="max-w-[60%] truncate">{DESTINATION_URL}</span>} />
        </div>
      </section>

      {/* Budget & Schedule */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Budget &amp; Schedule</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {BUDGET_SCHEDULE.map((detail) => (
            <InfoRow key={detail.key} label={detail.key} value={detail.value} />
          ))}
        </div>
      </section>

      {/* Targeting */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Targeting</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {TARGETING_ROWS.map((row) => (
            <InfoRow key={row.key} label={row.key} value={row.value} />
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {INTEREST_PILLS.map((pill) => (
            <Badge key={pill} variant="outline" className="text-badge">{pill}</Badge>
          ))}
        </div>
      </section>

      {/* CTA button */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="link" size="xs" />
        Open in Meta Ads Manager
      </Button>

      {/* Source info */}
      <SourceInfo>Campaign draft &middot; Pending review</SourceInfo>
    </div>
  );
}

interface InstagramAdsBodyProps {
  variant?: "compact" | "expanded";
}

export function InstagramAdsBody({ variant = "compact" }: InstagramAdsBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
