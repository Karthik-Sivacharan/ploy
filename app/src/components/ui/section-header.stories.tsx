import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./section-header";

const meta = {
  title: "Primitives/Section Header",
  component: SectionHeader,
  tags: ["autodocs"],
  args: {
    children: "Section Title",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-2">
        <SectionHeader>Campaign Config</SectionHeader>
        <div className="rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2 text-xs text-foreground">
          Content goes here
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SectionHeader>Model</SectionHeader>
        <div className="rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2 text-xs text-foreground">
          Claude Opus 4.6
        </div>
      </div>
    </div>
  ),
};
