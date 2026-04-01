import type { Meta, StoryObj } from "@storybook/react";
import { PROVIDERS } from "@/lib/providers";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";

const meta = {
  title: "Canvas/Provider Registry",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ProviderCard({ name, icon, logo, colors }: {
  name: string;
  icon?: IconName;
  logo?: string;
  colors: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colors}`}>
        {icon ? (
          <Icon name={icon} size="md" />
        ) : (
          <span className="text-xs font-medium">?</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        {logo && (
          <p className="truncate text-xs text-muted-foreground">{logo}</p>
        )}
        {!logo && icon && (
          <p className="truncate text-xs text-muted-foreground">icon: {icon}</p>
        )}
      </div>
    </div>
  );
}

function AllProvidersGrid() {
  const entries = Object.entries(PROVIDERS);
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-foreground">
        Provider Registry
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {entries.length} providers registered in PROVIDERS record
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {entries.map(([name, config]) => (
          <ProviderCard
            key={name}
            name={name}
            icon={config.icon}
            logo={config.logo}
            colors={config.colors}
          />
        ))}
      </div>
    </div>
  );
}

export const AllProviders: Story = {
  name: "All Providers",
  render: () => <AllProvidersGrid />,
};
