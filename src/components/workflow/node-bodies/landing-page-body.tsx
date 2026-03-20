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

const PAGE_SCREENSHOT = "/assets/landing-pages/summer-trial.png";
const STAGING_URL = "https://peloton-summer.webflow.io/summer-trial";

const AVAILABLE_MODELS = [
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", provider: "anthropic" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "google" },
  { id: "llama-4-maverick", label: "Llama 4 Maverick", provider: "llama" },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "deepseek" },
] as const;

/* ── Compact variant — rendered inside the canvas node ── */

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

      {/* Landing page screenshot preview */}
      <div className="overflow-hidden rounded-lg border border-border-subtle">
        <img
          src={PAGE_SCREENSHOT}
          alt="Landing page preview"
          className="h-64 w-full object-cover object-top"
        />
      </div>

      {/* Page metadata */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-foreground">/summer-trial</span>
        <span className="truncate text-detail text-muted-foreground">{STAGING_URL}</span>
      </div>
    </div>
  );
}

/* ── Expanded variant — rendered in the editor sidebar ── */

function ExpandedBody() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Page preview */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Page Preview</SectionHeader>
        <div className="overflow-hidden rounded-lg border border-border-subtle">
          <img
            src={PAGE_SCREENSHOT}
            alt="Landing page preview"
            className="max-h-96 w-full object-cover object-top"
          />
        </div>
      </section>

      {/* Page details */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Details</SectionHeader>
        <div className="flex flex-col gap-1.5">
          <InfoRow label="Title" value="Start Your Free Trial" />
          <InfoRow label="Slug" value={<span className="font-mono">/summer-trial</span>} />
          <InfoRow
            label="Status"
            value={<Badge variant="secondary" className="text-badge text-chart-2">Published</Badge>}
          />
          <InfoRow
            label="Staging"
            value={<span className="max-w-[60%] truncate">{STAGING_URL}</span>}
            className="items-start"
          />
        </div>
      </section>

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

      {/* Edit button */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="link" size="xs" />
        Edit in Webflow
      </Button>

      {/* Source info */}
      <SourceInfo>Published to Webflow &middot; Mar 18, 2026</SourceInfo>
    </div>
  );
}

interface LandingPageBodyProps {
  variant?: "compact" | "expanded";
}

export function LandingPageBody({ variant = "compact" }: LandingPageBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
