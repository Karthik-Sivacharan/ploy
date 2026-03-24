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
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { InfoRow } from "@/components/ui/info-row";
import { SourceInfo } from "@/components/ui/source-info";

const AVAILABLE_MODELS = [
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", provider: "anthropic" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "google" },
  { id: "llama-4-maverick", label: "Llama 4 Maverick", provider: "llama" },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "deepseek" },
] as const;

type EmailStatus = "draft" | "scheduled" | "sent";

const STATUS_DOT_COLORS: Record<EmailStatus, string> = {
  sent: "bg-success",
  scheduled: "bg-primary",
  draft: "bg-muted-foreground",
};

const STATUS_BADGE_VARIANTS: Record<EmailStatus, "success" | "secondary" | "outline"> = {
  sent: "success",
  scheduled: "outline",
  draft: "secondary",
};

const CAMPAIGN_TYPE = "Automation";
const CAMPAIGN_TRIGGER = "Tag trigger";
const RECIPIENT_COUNT = "12,847";
const FROM_NAME = "peloton@email.onepeloton.com";
const SEND_TIME = "9:00 AM — Recipient timezone";
const EMAIL_COUNT = 3;

const EMAILS = [
  { day: 1, label: "Welcome", subject: "Welcome to Peloton — your journey starts here", status: "draft" as EmailStatus },
  { day: 3, label: "Key Features", subject: "Discover what makes Peloton different", status: "draft" as EmailStatus },
  { day: 7, label: "Start Trial", subject: "Ready to ride? Start your free trial today", status: "draft" as EmailStatus },
] as const;

const CAMPAIGN_DETAILS = [
  { key: "Recipients", value: `${RECIPIENT_COUNT} contacts` },
] as const;

const SEND_WINDOW = [
  { key: "From", value: FROM_NAME },
  { key: "Send time", value: SEND_TIME },
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

      {/* Stacked mini email cards */}
      <div className="flex flex-col gap-1.5">
        {EMAILS.map((email) => (
          <div
            key={email.day}
            className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
          >
            <div className="flex items-center gap-2">
              <span className={`size-1.5 shrink-0 rounded-full ${STATUS_DOT_COLORS[email.status]}`} />
              <span className="text-badge font-medium text-foreground">
                Day {email.day}
              </span>
            </div>
            <span className="text-badge text-muted-foreground">
              {email.label}
            </span>
          </div>
        ))}
      </div>

      {/* Recipients + automation type */}
      <div className="flex items-center justify-between">
        <span className="text-detail text-muted-foreground">{RECIPIENT_COUNT} contacts</span>
        <Badge variant="outline" className="text-badge">{CAMPAIGN_TYPE}</Badge>
      </div>
    </div>
  );
}

/* ── Expanded variant — rendered in the editor sidebar ── */

function ExpandedBody() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Campaign config */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Campaign Config</SectionHeader>
        <div className="flex flex-col gap-1.5">
          <InfoRow label="Type" value={<Badge variant="outline" className="text-badge">{CAMPAIGN_TYPE}</Badge>} />
          <InfoRow label="Trigger" value={CAMPAIGN_TRIGGER} />
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

      {/* Email sequence */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Email Sequence</SectionHeader>
        <div className="flex flex-col gap-2">
          {EMAILS.map((email) => (
            <Card key={email.day} size="sm">
              <CardHeader>
                <CardTitle>
                  Day {email.day} — {email.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {email.subject}
                </p>
                <div className="mt-2">
                  <Badge variant={STATUS_BADGE_VARIANTS[email.status]} className="text-badge capitalize">
                    {email.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Campaign details */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Campaign Details</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {CAMPAIGN_DETAILS.map((detail) => (
            <InfoRow key={detail.key} label={detail.key} value={detail.value} />
          ))}
        </div>
      </section>

      {/* Send window */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Send Window</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {SEND_WINDOW.map((item) => (
            <InfoRow key={item.key} label={item.key} value={item.value} />
          ))}
        </div>
      </section>

      {/* CTA button */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="link" size="xs" />
        Open in Mailchimp
      </Button>

      {/* Source info */}
      <SourceInfo>Ready to send &middot; {EMAIL_COUNT} emails queued</SourceInfo>
    </div>
  );
}

interface EmailSequenceBodyProps {
  variant?: "compact" | "expanded";
}

export function EmailSequenceBody({ variant = "compact" }: EmailSequenceBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
