import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design Tokens/Colors",
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
      <span className="text-detail opacity-70">Aa Bb Cc</span>
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
          <Swatch
            bg="bg-destructive"
            fg="text-destructive-foreground"
            label="destructive"
          />
        </SwatchGrid>
      </Section>

      <Section title="Success">
        <SwatchGrid>
          <Swatch
            bg="bg-success"
            fg="text-success-foreground"
            label="success"
          />
        </SwatchGrid>
      </Section>

      <Section title="Warning">
        <SwatchGrid>
          <Swatch
            bg="bg-warning"
            fg="text-warning-foreground"
            label="warning"
          />
        </SwatchGrid>
      </Section>
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
