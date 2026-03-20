"use client";

import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SEGMENT_NAME = "Summer Trial Prospects";
const CONTACT_COUNT = "12,847";

const FILTER_PILLS = ["Fitness", "25-54", "Urban"] as const;

const CONTACT_BREAKDOWN = [
  { label: "New (last 30d)", value: "2,341" },
  { label: "Engaged", value: "8,912" },
  { label: "At risk", value: "1,594" },
] as const;

const FILTERS = [
  { label: "Interest", value: "Fitness & Wellness" },
  { label: "Age range", value: "25-54" },
  { label: "Location", value: "Urban metro areas" },
  { label: "Source", value: "Trial sign-up form" },
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
          <Badge key={pill} variant="outline" className="text-[10px]">
            {pill}
          </Badge>
        ))}
      </div>

      {/* List type */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">List type</span>
        <span className="font-medium text-foreground">Dynamic - Auto-updating</span>
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
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Segment
        </h4>
        <div className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-secondary/50 px-3 py-3">
          <span className="text-sm font-semibold text-foreground">{SEGMENT_NAME}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-foreground">{CONTACT_COUNT}</span>
            <span className="text-xs text-muted-foreground">contacts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTER_PILLS.map((pill) => (
              <Badge key={pill} variant="outline" className="text-[10px]">
                {pill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Filters
        </h4>
        <div className="flex flex-col gap-1.5">
          {FILTERS.map((filter) => (
            <div
              key={filter.label}
              className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <span className="text-xs text-muted-foreground">{filter.label}</span>
              <span className="text-xs font-medium text-foreground">{filter.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact breakdown */}
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Contact Breakdown
        </h4>
        <div className="flex flex-col gap-1.5">
          {CONTACT_BREAKDOWN.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-xs font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* List type */}
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          List Type
        </h4>
        <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2">
          <span className="text-xs text-foreground">Dynamic - Auto-updating</span>
          <Badge variant="secondary" className="text-[10px]">Active</Badge>
        </div>
      </section>

      {/* Open in HubSpot */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="link" size="xs" />
        Open in HubSpot
      </Button>

      {/* Source info */}
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Icon name="check-circle" size="xs" className="text-chart-2" />
        Synced from HubSpot &middot; Mar 18, 2026
      </div>
    </div>
  );
}

interface TargetAudienceBodyProps {
  variant?: "compact" | "expanded";
}

export function TargetAudienceBody({ variant = "compact" }: TargetAudienceBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
