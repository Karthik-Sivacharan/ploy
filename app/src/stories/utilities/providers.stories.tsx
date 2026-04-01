import type { Meta, StoryObj } from "@storybook/react";
import { PROVIDERS } from "@/lib/providers";
import { ProviderIcon } from "@/components/ui/provider-icon";

const meta = {
  title: "Primitives/Provider Registry",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
          >
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.colors}`}>
              <ProviderIcon provider={name} size="md" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {config.logo ?? `icon: ${config.icon}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const AllProviders: Story = {
  name: "All Providers",
  render: () => <AllProvidersGrid />,
};
