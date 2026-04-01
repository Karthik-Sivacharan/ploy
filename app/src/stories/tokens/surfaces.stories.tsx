import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Foundations/Surfaces",
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
        <span className="txt-detail text-muted-foreground">{bgClass}</span>
        <span className="txt-detail text-muted-foreground">{borderClass}</span>
        {backdrop && (
          <span className="txt-detail text-muted-foreground">{backdrop}</span>
        )}
      </div>
    </div>
  );
}

export const GlassSurfaces: Story = {
  render: () => (
    <div
      className="p-8 rounded-2xl min-h-[400px] bg-cover bg-center"
      style={{ backgroundImage: "url(/storybook-assets/surface-bg.jpg)" }}
    >
      <h3 className="text-sm font-semibold text-white mb-6 drop-shadow-sm">
        Glass surfaces (shown over image to reveal translucency)
      </h3>
      {/* Container surfaces — these carry content directly */}
      <p className="txt-detail font-medium uppercase tracking-wider text-white/70 mb-2 drop-shadow-sm">
        Container surfaces
      </p>
      <div className="flex flex-wrap gap-4 mb-8">
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
      </div>

      {/* State overlays — tint layers applied on top of containers */}
      <p className="txt-detail font-medium uppercase tracking-wider text-white/70 mb-2 drop-shadow-sm">
        State overlays (layered on a card, not standalone)
      </p>
      <div className="flex flex-wrap gap-4">
        {[
          { label: "surface-overlay", bgClass: "bg-surface-overlay", desc: "Default state" },
          { label: "surface-overlay-hover", bgClass: "bg-surface-overlay-hover", desc: "Hover state" },
        ].map(({ label, bgClass, desc }) => (
          <div key={label} className="flex flex-col gap-2">
            {/* Base card with overlay on top */}
            <div className="relative rounded-xl border border-border bg-card p-6 min-w-[200px] min-h-[120px]">
              <div className={`absolute inset-0 rounded-xl ${bgClass}`} />
              <div className="relative">
                <p className="text-sm font-semibold text-foreground">{desc}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Card content remains readable
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 px-1">
              <span className="txt-detail text-white/80 drop-shadow-sm">{label}</span>
              <span className="txt-detail text-white/60 drop-shadow-sm">{bgClass}</span>
            </div>
          </div>
        ))}
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
