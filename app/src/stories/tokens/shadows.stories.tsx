import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design Tokens/Shadows",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

function ShadowCard({
  label,
  shadowClass,
}: {
  label: string;
  shadowClass: string;
}) {
  return (
    <div
      className={`bg-card ${shadowClass} rounded-xl p-6 min-w-[200px] min-h-[120px] flex flex-col justify-between`}
    >
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <span className="txt-detail text-muted-foreground mt-2">
        {shadowClass}
      </span>
    </div>
  );
}

export const AllShadows: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8">
      <ShadowCard label="Glass" shadowClass="shadow-glass" />
      <ShadowCard label="Elevated" shadowClass="shadow-elevated" />
      <ShadowCard label="Glow Blue" shadowClass="shadow-glow-blue" />
      <ShadowCard label="Glow Green" shadowClass="shadow-glow-green" />
      <ShadowCard label="Glow Ploy" shadowClass="shadow-glow-ploy" />
    </div>
  ),
};

export const ShadowComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Ambient shadows
        </h3>
        <div className="flex gap-6">
          <ShadowCard label="Glass" shadowClass="shadow-glass" />
          <ShadowCard label="Elevated" shadowClass="shadow-elevated" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Glow shadows
        </h3>
        <div className="flex gap-6">
          <ShadowCard label="Glow Blue" shadowClass="shadow-glow-blue" />
          <ShadowCard label="Glow Green" shadowClass="shadow-glow-green" />
          <ShadowCard label="Glow Ploy" shadowClass="shadow-glow-ploy" />
        </div>
      </div>
    </div>
  ),
};
