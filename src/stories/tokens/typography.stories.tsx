import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design Tokens/Typography",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const TYPE_SCALE = [
  { name: "caption", size: "9px", css: "var(--font-size-caption)" },
  { name: "badge", size: "10px", css: "var(--font-size-badge)" },
  { name: "detail", size: "11px", css: "var(--font-size-detail)" },
  { name: "body-sm", size: "13px", css: "var(--font-size-body-sm)" },
  { name: "body", size: "14px", css: "var(--font-size-body)" },
  { name: "body-lg", size: "16px", css: "var(--font-size-body-lg)" },
  { name: "heading-sm", size: "18px", css: "var(--font-size-heading-sm)" },
  { name: "heading", size: "20px", css: "var(--font-size-heading)" },
  { name: "heading-lg", size: "24px", css: "var(--font-size-heading-lg)" },
  { name: "heading-xl", size: "32px", css: "var(--font-size-heading-xl)" },
];

export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {TYPE_SCALE.map((step) => (
        <div key={step.name} className="flex items-baseline gap-6">
          <div className="w-28 text-right shrink-0">
            <p className="text-xs font-semibold text-foreground">{step.name}</p>
            <p className="text-[10px] text-muted-foreground">{step.size}</p>
          </div>
          <p
            className="text-foreground"
            style={{ fontSize: step.css, fontFamily: "var(--font-sans)" }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      ))}
    </div>
  ),
};

export const TypeWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {[400, 500, 600, 700].map((weight) => (
        <p
          key={weight}
          className="text-foreground"
          style={{
            fontSize: "var(--font-size-heading)",
            fontWeight: weight,
            fontFamily: "var(--font-sans)",
          }}
        >
          Clash Grotesk {weight} — The quick brown fox
        </p>
      ))}
    </div>
  ),
};
