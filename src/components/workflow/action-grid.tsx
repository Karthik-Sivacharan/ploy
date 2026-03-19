"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { HugeiconsIcon } from "@hugeicons/react";
import { icons } from "@/lib/icons";
import type { IconName } from "@/lib/icons";
import { ACTION_GROUPS } from "@/lib/workflow/constants";
import type { ActionDefinition, ActionGroup } from "@/lib/workflow/types";

const PROVIDER_ICONS: Record<string, IconName> = {
  System: "settings",
  "AI Gateway": "sparkles",
  GitHub: "github",
  Slack: "message-square",
  Resend: "mail",
  Stripe: "credit-card",
};

interface ActionGridProps {
  onSelectAction: (action: ActionDefinition) => void;
}

function ActionGroupSection({
  group,
  onSelectAction,
}: {
  group: ActionGroup;
  onSelectAction: (action: ActionDefinition) => void;
}) {
  const iconName = PROVIDER_ICONS[group.provider] ?? "settings";

  return (
    <Collapsible defaultOpen>
      <div className="flex items-center justify-between px-3 py-2">
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="sm" className="gap-1.5 px-1">
              <Icon name="chevron-down" size="xs" className="transition-transform [[data-open]_&]:rotate-0 [[data-closed]_&]:-rotate-90" />
              <HugeiconsIcon
                icon={icons[iconName]}
                size="var(--icon-sm)"
                strokeWidth={2}
                color="currentColor"
                className="shrink-0"
              />
              <span className="text-sm font-medium">{group.provider}</span>
            </Button>
          }
        />
        <Button variant="ghost" size="icon-xs">
          <Icon name="more-horizontal" size="xs" />
        </Button>
      </div>
      <CollapsibleContent>
        <div className="flex flex-col">
          {group.actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onSelectAction(action)}
              className="flex items-baseline gap-1 px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
            >
              <span className="font-medium text-foreground">
                {action.label}
              </span>
              <span className="text-muted-foreground">
                - {action.description}
              </span>
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ActionGrid({ onSelectAction }: ActionGridProps) {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return ACTION_GROUPS;

    const query = search.toLowerCase();
    return ACTION_GROUPS.map((group) => ({
      ...group,
      actions: group.actions.filter(
        (action) =>
          action.label.toLowerCase().includes(query) ||
          action.description.toLowerCase().includes(query) ||
          group.provider.toLowerCase().includes(query)
      ),
    })).filter((group) => group.actions.length > 0);
  }, [search]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <div className="relative flex-1">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon name="search" size="sm" />
          </div>
          <Input
            placeholder="Search actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {filteredGroups.map((group) => (
          <ActionGroupSection
            key={group.provider}
            group={group}
            onSelectAction={onSelectAction}
          />
        ))}
      </div>
    </div>
  );
}
