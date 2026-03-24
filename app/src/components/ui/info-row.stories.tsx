import type { Meta, StoryObj } from "@storybook/react";
import { InfoRow } from "./info-row";
import { Badge } from "./badge";

const meta = {
  title: "Atoms/Info Row",
  component: InfoRow,
  tags: ["autodocs"],
  args: {
    label: "Library",
    value: "Brand Library",
  },
} satisfies Meta<typeof InfoRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBadgeValue: Story = {
  args: {
    label: "Assets",
    value: <Badge variant="success" className="text-badge">36 synced</Badge>,
  },
};

export const Stacked: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 max-w-sm">
      <InfoRow label="Type" value="Automation" />
      <InfoRow label="Trigger" value="Tag trigger" />
      <InfoRow label="Recipients" value="12,847 contacts" />
      <InfoRow
        label="Status"
        value={<Badge variant="success" className="text-badge">Active</Badge>}
      />
    </div>
  ),
};
