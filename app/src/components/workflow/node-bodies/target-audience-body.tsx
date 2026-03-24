"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { InfoRow } from "@/components/ui/info-row";
import { SourceInfo } from "@/components/ui/source-info";

const SEGMENT_NAME = "Summer Trial Prospects";
const CONTACT_COUNT = "12,847";
const PROCESSING_TYPE = "Dynamic";
const LAST_SYNCED = "Mar 18, 2026";

const FILTER_PILLS = ["Fitness", "25-54", "Urban"] as const;

const CONTACT_BREAKDOWN = [
  { label: "New (last 30d)", value: "2,341", percent: 18, color: "bg-primary" },
  { label: "Engaged", value: "8,912", percent: 70, color: "bg-success" },
  { label: "At risk", value: "1,594", percent: 12, color: "bg-warning" },
] as const;

const FILTERS = [
  { property: "Interest", operator: "contains", value: "Fitness & Wellness" },
  { property: "Age range", operator: "between", value: "25–54" },
  { property: "Location", operator: "is", value: "Urban metro areas" },
  { property: "Source", operator: "equals", value: "Trial sign-up form" },
] as const;

/* ── Compact variant — rendered inside the canvas node ── */

function CompactBody() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Segment name */}
      <span className="text-xs font-medium text-foreground">{SEGMENT_NAME}</span>

      {/* Contact count */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-foreground">{CONTACT_COUNT}</span>
        <span className="text-xs text-muted-foreground">contacts</span>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-1.5">
        {FILTER_PILLS.map((pill) => (
          <Badge key={pill} variant="outline" className="text-badge">
            {pill}
          </Badge>
        ))}
      </div>

      {/* List type + sync time */}
      <div className="flex items-center justify-between">
        <Badge variant="success" className="text-badge">{PROCESSING_TYPE}</Badge>
        <span className="text-badge text-muted-foreground">Synced {LAST_SYNCED}</span>
      </div>
    </div>
  );
}

/* ── Expanded variant — rendered in the editor sidebar ── */

function ExpandedBody() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Segment overview */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Segment</SectionHeader>
        <div className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-secondary/50 px-3 py-3">
          <span className="text-sm font-semibold text-foreground">{SEGMENT_NAME}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-foreground">{CONTACT_COUNT}</span>
            <span className="text-xs text-muted-foreground">contacts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTER_PILLS.map((pill) => (
              <Badge key={pill} variant="outline" className="text-badge">
                {pill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Filters</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {FILTERS.map((filter) => (
            <InfoRow
              key={filter.property}
              label={<>{filter.property} <span className="text-muted-foreground/60">{filter.operator}</span></>}
              value={filter.value}
            />
          ))}
        </div>
      </section>

      {/* Contact breakdown */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Contact Breakdown</SectionHeader>
        {/* Proportional bar */}
        <div className="flex h-2 overflow-hidden rounded-full">
          {CONTACT_BREAKDOWN.map((item) => (
            <div
              key={item.label}
              className={`${item.color} first:rounded-l-full last:rounded-r-full`}
              style={{ width: `${item.percent}%` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {CONTACT_BREAKDOWN.map((item) => (
            <InfoRow key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </section>

      {/* List type */}
      <InfoRow
        label={PROCESSING_TYPE}
        value={<Badge variant="success" className="text-badge">Active</Badge>}
      />

      {/* Open in HubSpot */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="link" size="xs" />
        Open in HubSpot
      </Button>

      {/* Source info */}
      <SourceInfo>Synced from HubSpot &middot; Mar 18, 2026</SourceInfo>
    </div>
  );
}

interface TargetAudienceBodyProps {
  variant?: "compact" | "expanded";
}

export function TargetAudienceBody({ variant = "compact" }: TargetAudienceBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
