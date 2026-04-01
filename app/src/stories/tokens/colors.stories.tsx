import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

function Swatch({
  bg,
  fg,
  label,
}: {
  bg: string;
  fg: string;
  label: string;
}) {
  return (
    <div
      className={`${bg} ${fg} rounded-lg p-4 min-w-[140px] flex flex-col gap-1`}
    >
      <span className="text-xs font-semibold">{label}</span>
      <span className="txt-detail opacity-70">Aa Bb Cc</span>
    </div>
  );
}

function SwatchGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

export const SemanticColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <Section title="Primary">
        <SwatchGrid>
          <Swatch bg="bg-primary" fg="text-primary-foreground" label="primary" />
          <Swatch
            bg="bg-primary-foreground"
            fg="text-primary"
            label="primary-foreground"
          />
        </SwatchGrid>
      </Section>

      <Section title="Secondary">
        <SwatchGrid>
          <Swatch
            bg="bg-secondary"
            fg="text-secondary-foreground"
            label="secondary"
          />
          <Swatch
            bg="bg-secondary-foreground"
            fg="text-secondary"
            label="secondary-foreground"
          />
        </SwatchGrid>
      </Section>

      <Section title="Muted">
        <SwatchGrid>
          <Swatch bg="bg-muted" fg="text-muted-foreground" label="muted" />
          <Swatch
            bg="bg-muted-foreground"
            fg="text-muted"
            label="muted-foreground"
          />
        </SwatchGrid>
      </Section>

      <Section title="Accent">
        <SwatchGrid>
          <Swatch
            bg="bg-accent"
            fg="text-accent-foreground"
            label="accent"
          />
          <Swatch
            bg="bg-accent-foreground"
            fg="text-accent"
            label="accent-foreground"
          />
        </SwatchGrid>
      </Section>

      <Section title="Destructive">
        <SwatchGrid>
          <Swatch bg="bg-destructive" fg="text-destructive-foreground" label="destructive" />
          <Swatch bg="bg-destructive-muted" fg="text-destructive-muted-foreground" label="destructive-muted" />
        </SwatchGrid>
      </Section>

      <Section title="Success">
        <SwatchGrid>
          <Swatch bg="bg-success" fg="text-success-foreground" label="success" />
          <Swatch bg="bg-success-muted" fg="text-success-muted-foreground" label="success-muted" />
        </SwatchGrid>
      </Section>

      <Section title="Warning">
        <SwatchGrid>
          <Swatch bg="bg-warning" fg="text-warning-foreground" label="warning" />
          <Swatch bg="bg-warning-muted" fg="text-warning-muted-foreground" label="warning-muted" />
        </SwatchGrid>
      </Section>
    </div>
  ),
};

const PRIMITIVE_SCALES: { label: string; shades: { shade: number; bg: string }[] }[] = [
  {
    label: "Neutral",
    shades: [
      { shade: 50, bg: "bg-neutral-50" },
      { shade: 100, bg: "bg-neutral-100" },
      { shade: 200, bg: "bg-neutral-200" },
      { shade: 300, bg: "bg-neutral-300" },
      { shade: 400, bg: "bg-neutral-400" },
      { shade: 500, bg: "bg-neutral-500" },
      { shade: 600, bg: "bg-neutral-600" },
      { shade: 700, bg: "bg-neutral-700" },
      { shade: 800, bg: "bg-neutral-800" },
      { shade: 900, bg: "bg-neutral-900" },
      { shade: 950, bg: "bg-neutral-950" },
    ],
  },
  {
    label: "Purple",
    shades: [
      { shade: 50, bg: "bg-purple-50" },
      { shade: 100, bg: "bg-purple-100" },
      { shade: 200, bg: "bg-purple-200" },
      { shade: 300, bg: "bg-purple-300" },
      { shade: 400, bg: "bg-purple-400" },
      { shade: 500, bg: "bg-purple-500" },
      { shade: 600, bg: "bg-purple-600" },
      { shade: 700, bg: "bg-purple-700" },
      { shade: 800, bg: "bg-purple-800" },
      { shade: 900, bg: "bg-purple-900" },
      { shade: 950, bg: "bg-purple-950" },
    ],
  },
  {
    label: "Green",
    shades: [
      { shade: 50, bg: "bg-green-50" },
      { shade: 100, bg: "bg-green-100" },
      { shade: 200, bg: "bg-green-200" },
      { shade: 300, bg: "bg-green-300" },
      { shade: 400, bg: "bg-green-400" },
      { shade: 500, bg: "bg-green-500" },
      { shade: 600, bg: "bg-green-600" },
      { shade: 700, bg: "bg-green-700" },
      { shade: 800, bg: "bg-green-800" },
      { shade: 900, bg: "bg-green-900" },
      { shade: 950, bg: "bg-green-950" },
    ],
  },
  {
    label: "Red",
    shades: [
      { shade: 50, bg: "bg-red-50" },
      { shade: 100, bg: "bg-red-100" },
      { shade: 200, bg: "bg-red-200" },
      { shade: 300, bg: "bg-red-300" },
      { shade: 400, bg: "bg-red-400" },
      { shade: 500, bg: "bg-red-500" },
      { shade: 600, bg: "bg-red-600" },
      { shade: 700, bg: "bg-red-700" },
      { shade: 800, bg: "bg-red-800" },
      { shade: 900, bg: "bg-red-900" },
      { shade: 950, bg: "bg-red-950" },
    ],
  },
  {
    label: "Amber",
    shades: [
      { shade: 50, bg: "bg-amber-50" },
      { shade: 100, bg: "bg-amber-100" },
      { shade: 200, bg: "bg-amber-200" },
      { shade: 300, bg: "bg-amber-300" },
      { shade: 400, bg: "bg-amber-400" },
      { shade: 500, bg: "bg-amber-500" },
      { shade: 600, bg: "bg-amber-600" },
      { shade: 700, bg: "bg-amber-700" },
      { shade: 800, bg: "bg-amber-800" },
      { shade: 900, bg: "bg-amber-900" },
      { shade: 950, bg: "bg-amber-950" },
    ],
  },
];

function PrimitiveScale({ scale }: { scale: (typeof PRIMITIVE_SCALES)[number] }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-xs font-semibold text-foreground">{scale.label}</h4>
      <div className="flex gap-0.5">
        {scale.shades.map((s) => (
          <div key={s.shade} className="flex flex-col items-center gap-1">
            <div className={`${s.bg} h-10 w-12 rounded-md border border-border/30`} />
            <span className="txt-caption text-muted-foreground">{s.shade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SEMANTIC_MAPPINGS = [
  { name: "secondary", light: "neutral-50", dark: "neutral-900" },
  { name: "muted", light: "neutral-50 / neutral-600", dark: "neutral-900 / neutral-400" },
  { name: "border", light: "neutral-100", dark: "white/10% (alpha)" },
  { name: "primary", light: "hand-tuned (purple-600~700)", dark: "hand-tuned (purple-500~600)" },
  { name: "success", light: "green-600 → green-100/700", dark: "green-400 → green-950/300" },
  { name: "destructive", light: "red-600 → red-100/700", dark: "red-400 → red-950/300" },
  { name: "warning", light: "amber-400 → amber-100/800", dark: "amber-400 → amber-950/300" },
];

export const PrimitiveColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground">Primitive Color Scales</h3>
        <p className="text-xs text-muted-foreground">
          Raw Tailwind palette — semantic tokens reference these shades.
        </p>
      </div>
      {PRIMITIVE_SCALES.map((scale) => (
        <PrimitiveScale key={scale.label} scale={scale} />
      ))}

      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground">Semantic → Primitive Mapping</h3>
        <p className="text-xs text-muted-foreground mb-2">
          How semantic tokens derive from primitives.
        </p>
        <table className="text-xs border-collapse">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="pr-6 pb-1 font-medium">Token</th>
              <th className="pr-6 pb-1 font-medium">Light (base → muted bg/fg)</th>
              <th className="pb-1 font-medium">Dark (base → muted bg/fg)</th>
            </tr>
          </thead>
          <tbody>
            {SEMANTIC_MAPPINGS.map((m) => (
              <tr key={m.name} className="text-foreground">
                <td className="pr-6 py-0.5 font-mono">{m.name}</td>
                <td className="pr-6 py-0.5">{m.light}</td>
                <td className="py-0.5">{m.dark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const SurfaceColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      <div className="bg-surface-translucent border border-border-glass rounded-xl p-6 min-w-[180px] backdrop-panel">
        <p className="text-sm font-semibold text-foreground">
          surface-translucent
        </p>
        <p className="text-xs text-muted-foreground mt-1">border-glass</p>
      </div>
      <div className="bg-surface-inset border border-border-subtle rounded-xl p-6 min-w-[180px]">
        <p className="text-sm font-semibold text-foreground">surface-inset</p>
        <p className="text-xs text-muted-foreground mt-1">border-subtle</p>
      </div>
      <div className="bg-surface-overlay border border-border-glass rounded-xl p-6 min-w-[180px]">
        <p className="text-sm font-semibold text-foreground">surface-overlay</p>
        <p className="text-xs text-muted-foreground mt-1">border-glass</p>
      </div>
    </div>
  ),
};

export const GlowColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      <div className="bg-glow-accent rounded-xl p-6 min-w-[180px]">
        <p className="text-sm font-semibold text-foreground">glow-accent</p>
      </div>
      <div className="bg-glow-success rounded-xl p-6 min-w-[180px]">
        <p className="text-sm font-semibold text-foreground">glow-success</p>
      </div>
    </div>
  ),
};
