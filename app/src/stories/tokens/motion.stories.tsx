import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

const meta: Meta = {
  title: "Design Tokens/Motion",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const DURATIONS = [
  { name: "instant", value: "0ms", css: "var(--duration-instant)" },
  { name: "fast", value: "150ms", css: "var(--duration-fast)" },
  { name: "normal", value: "200ms", css: "var(--duration-normal)" },
  { name: "panel", value: "250ms", css: "var(--duration-panel)" },
  { name: "moderate", value: "300ms", css: "var(--duration-moderate)" },
  { name: "slow", value: "400ms", css: "var(--duration-slow)" },
];

const EASINGS = [
  { name: "ease-out", css: "var(--ease-out)", desc: "quart — snappy enter/exit" },
  { name: "ease-out-expo", css: "var(--ease-out-expo)", desc: "expo — dramatic panels" },
  { name: "ease-in-out", css: "var(--ease-in-out)", desc: "quart — on-screen movement" },
  { name: "ease-hover", css: "var(--ease-hover)", desc: "ease — hover/color" },
];

function DurationBox({
  name,
  value,
  css,
}: {
  name: string;
  value: string;
  css: string;
}) {
  const [moved, setMoved] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="w-28 text-right">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="txt-detail text-muted-foreground">{value}</p>
      </div>
      <div className="flex-1 h-12 bg-muted rounded-lg relative overflow-hidden">
        <div
          className="absolute top-1 bottom-1 w-12 rounded-md bg-primary cursor-pointer"
          style={{
            left: moved ? "calc(100% - 3.5rem)" : "0.25rem",
            transitionProperty: "left",
            transitionDuration: css,
            transitionTimingFunction: "var(--ease-out)",
          }}
          onClick={() => setMoved((m) => !m)}
        />
      </div>
    </div>
  );
}

function EasingBox({
  name,
  css,
  desc,
}: {
  name: string;
  css: string;
  desc: string;
}) {
  const [moved, setMoved] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="w-32 text-right">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="txt-detail text-muted-foreground">{desc}</p>
      </div>
      <div className="flex-1 h-12 bg-muted rounded-lg relative overflow-hidden">
        <div
          className="absolute top-1 bottom-1 w-12 rounded-md bg-primary cursor-pointer"
          style={{
            left: moved ? "calc(100% - 3.5rem)" : "0.25rem",
            transitionProperty: "left",
            transitionDuration: "var(--duration-moderate)",
            transitionTimingFunction: css,
          }}
          onClick={() => setMoved((m) => !m)}
        />
      </div>
    </div>
  );
}

export const Durations: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-xl">
      <p className="text-xs text-muted-foreground mb-2">
        Click each box to trigger the animation
      </p>
      {DURATIONS.map((d) => (
        <DurationBox key={d.name} {...d} />
      ))}
    </div>
  ),
};

export const EasingCurves: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-xl">
      <p className="text-xs text-muted-foreground mb-2">
        Click each box to trigger the animation
      </p>
      {EASINGS.map((e) => (
        <EasingBox key={e.name} {...e} />
      ))}
    </div>
  ),
};
