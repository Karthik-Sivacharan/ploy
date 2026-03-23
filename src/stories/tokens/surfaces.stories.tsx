import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design Tokens/Surfaces",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

function SurfaceCard({
  label,
  bgClass,
  borderClass,
  backdrop,
}: {
  label: string;
  bgClass: string;
  borderClass: string;
  backdrop?: string;
}) {
  return (
    <div
      className={`${bgClass} ${borderClass} ${backdrop ?? ""} rounded-xl p-6 min-w-[200px] min-h-[120px] flex flex-col justify-between`}
    >
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <div className="flex flex-col gap-0.5 mt-3">
        <span className="text-[11px] text-muted-foreground">{bgClass}</span>
        <span className="text-[11px] text-muted-foreground">{borderClass}</span>
        {backdrop && (
          <span className="text-[11px] text-muted-foreground">{backdrop}</span>
        )}
      </div>
    </div>
  );
}

export const GlassSurfaces: Story = {
  render: () => (
    <div
      className="p-8 rounded-2xl min-h-[400px]"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.55 0.28 293), oklch(0.7 0.15 175))",
      }}
    >
      <h3 className="text-sm font-semibold text-white mb-6">
        Glass surfaces (shown over gradient to reveal translucency)
      </h3>
      <div className="flex flex-wrap gap-4">
        <SurfaceCard
          label="surface-translucent"
          bgClass="bg-surface-translucent"
          borderClass="border border-border-glass"
          backdrop="backdrop-panel"
        />
        <SurfaceCard
          label="surface-translucent-hover"
          bgClass="bg-surface-translucent-hover"
          borderClass="border border-border-glass"
          backdrop="backdrop-panel"
        />
        <SurfaceCard
          label="surface-inset"
          bgClass="bg-surface-inset"
          borderClass="border border-border-subtle"
        />
        <SurfaceCard
          label="surface-overlay"
          bgClass="bg-surface-overlay"
          borderClass="border border-border-glass"
          backdrop="backdrop-overlay"
        />
        <SurfaceCard
          label="surface-overlay-hover"
          bgClass="bg-surface-overlay-hover"
          borderClass="border border-border-glass"
          backdrop="backdrop-overlay"
        />
      </div>
    </div>
  ),
};

export const BorderStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      <div className="bg-card border-2 border-border-glass rounded-xl p-6 min-w-[200px]">
        <p className="text-sm font-semibold text-foreground">border-glass</p>
        <p className="text-xs text-muted-foreground mt-1">
          Subtle glass edge for translucent panels
        </p>
      </div>
      <div className="bg-card border-2 border-border-subtle rounded-xl p-6 min-w-[200px]">
        <p className="text-sm font-semibold text-foreground">border-subtle</p>
        <p className="text-xs text-muted-foreground mt-1">
          Ultra-light border for inset surfaces
        </p>
      </div>
      <div className="bg-card border-2 border-border rounded-xl p-6 min-w-[200px]">
        <p className="text-sm font-semibold text-foreground">border</p>
        <p className="text-xs text-muted-foreground mt-1">
          Default component border
        </p>
      </div>
    </div>
  ),
};
