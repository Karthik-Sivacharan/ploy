"use client";

import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader, SourceInfo } from "@/components/workflow/node-bodies/shared";

const BRAND_COLORS = [
  { name: "Primary", hex: "#6C3AED" },
  { name: "Dark", hex: "#1E1E1E" },
  { name: "Light", hex: "#F9FAFB" },
  { name: "Accent", hex: "#10B981" },
] as const;

const BRAND_FONTS = [
  { family: "Inter", weight: "Semibold", role: "Headings" },
  { family: "Inter", weight: "Regular", role: "Body" },
] as const;

const BRAND_LOGO_SRC = "/assets/brands/peloton-logo-big.webp";

const BRAND_LOGOS = [
  { name: "Logo", type: "Primary" },
  { name: "Mark", type: "Icon" },
] as const;

const ASSET_TYPES = [
  { label: "Images", count: 12, icon: "image" as const },
  { label: "Logos", count: 6, icon: "layers" as const },
  { label: "Icons", count: 18, icon: "box" as const },
] as const;

/* ── Compact variant — rendered inside the canvas node ── */

function CompactBody() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Color swatches */}
      <div className="flex items-center gap-2">
        {BRAND_COLORS.map((color) => (
          <div key={color.name} className="flex flex-col items-center gap-1">
            <div
              className="size-6 rounded-full border border-border-subtle"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-caption text-muted-foreground">{color.name}</span>
          </div>
        ))}
      </div>

      {/* Font preview */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-foreground leading-none">Aa</span>
        <span className="text-xs text-muted-foreground">Inter &middot; Semibold</span>
      </div>

      {/* Brand logo */}
      <div className="overflow-hidden rounded-lg border border-border-subtle bg-secondary/50 px-3 py-2.5">
        <img
          src={BRAND_LOGO_SRC}
          alt="Peloton logo"
          className="h-12 w-auto rounded-md object-contain"
        />
      </div>
    </div>
  );
}

/* ── Expanded variant — rendered in the editor sidebar ── */

function ExpandedBody() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Colors */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Colors</SectionHeader>
        <div className="grid grid-cols-2 gap-2">
          {BRAND_COLORS.map((color) => (
            <div
              key={color.name}
              className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <div
                className="size-5 shrink-0 rounded-full border border-border-subtle"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">{color.name}</span>
                <span className="text-badge font-mono text-muted-foreground">{color.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Typography</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {BRAND_FONTS.map((font) => (
            <div
              key={font.role}
              className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm text-foreground ${font.weight === "Semibold" ? "font-semibold" : "font-normal"}`}
                >
                  Aa
                </span>
                <span className="text-xs text-foreground">
                  {font.family} &middot; {font.weight}
                </span>
              </div>
              <Badge variant="secondary" className="text-badge">{font.role}</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Logos */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Logos</SectionHeader>
        {/* Primary logo — full width */}
        <div className="flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-border-subtle bg-secondary/50 px-4 py-4">
          <img
            src={BRAND_LOGO_SRC}
            alt="Peloton logo"
            className="h-7 w-auto rounded-md object-contain"
          />
          <span className="text-badge text-muted-foreground">Logo &middot; Primary</span>
        </div>
        {/* Secondary marks */}
        <div className="grid grid-cols-2 gap-2">
          {BRAND_LOGOS.filter((l) => l.type !== "Primary").map((logo) => (
            <div
              key={logo.name}
              className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border-subtle bg-secondary/50 py-4"
            >
              <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Icon name="image" size="sm" />
              </div>
              <span className="text-badge text-muted-foreground">{logo.name} &middot; {logo.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Asset library summary */}
      <section className="flex flex-col gap-2">
        <SectionHeader>Asset Library</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {ASSET_TYPES.map((asset) => (
            <div
              key={asset.label}
              className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <div className="flex items-center gap-2">
                <Icon name={asset.icon} size="xs" className="text-muted-foreground" />
                <span className="text-xs text-foreground">{asset.label}</span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{asset.count}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-1 w-full gap-1.5 text-xs">
          <Icon name="plus" size="xs" />
          Add assets from Frontify
        </Button>
      </section>

      {/* Source info */}
      <SourceInfo>Synced from Frontify &middot; Mar 18, 2026</SourceInfo>
    </div>
  );
}

interface BrandAssetsBodyProps {
  variant?: "compact" | "expanded";
}

export function BrandAssetsBody({ variant = "compact" }: BrandAssetsBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
