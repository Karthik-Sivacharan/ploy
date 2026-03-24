import type { Meta, StoryObj } from "@storybook/react";
import { SourceInfo } from "./source-info";

const meta = {
  title: "Atoms/Source Info",
  component: SourceInfo,
  tags: ["autodocs"],
  args: {
    children: "Synced from Frontify \u00B7 Mar 18, 2026",
  },
} satisfies Meta<typeof SourceInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Synced: Story = {};

export const Scheduled: Story = {
  args: {
    icon: "clock",
    children: "Scheduled \u00B7 Jun 1, 2026",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <SourceInfo>Synced from Frontify &middot; Mar 18, 2026</SourceInfo>
      <SourceInfo>Generated &middot; All channels ready</SourceInfo>
      <SourceInfo>Ready to send &middot; 3 emails queued</SourceInfo>
      <SourceInfo icon="clock">Scheduled &middot; Jun 1, 2026</SourceInfo>
    </div>
  ),
};
