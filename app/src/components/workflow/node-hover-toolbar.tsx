"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWorkflowStore } from "@/stores/workflow-store";
import { nanoid } from "@/lib/workflow/utils";
import type { IconName } from "@/lib/icons";

interface NodeHoverToolbarProps {
  nodeId: string;
}

export function NodeHoverToolbar({ nodeId }: NodeHoverToolbarProps) {
  const { deleteNode, duplicateNode, updateNodeData, addNode, nodes } =
    useWorkflowStore();

  const node = nodes.find((n) => n.id === nodeId);
  const isEnabled = node?.data.enabled ?? true;
  const isLocked = node?.data.locked ?? false;

  const handleAddAfter = useCallback(() => {
    if (!node) return;
    addNode({
      id: nanoid(),
      type: "action",
      position: { x: node.position.x + 250, y: node.position.y },
      data: {
        type: "action",
        actionType: "",
        label: "",
        description: "",
        provider: "",
        enabled: true,
        locked: false,
      },
    });
  }, [node, addNode]);

  const handleToggleEnabled = useCallback(() => {
    updateNodeData(nodeId, { enabled: !isEnabled });
  }, [nodeId, isEnabled, updateNodeData]);

  const handleToggleLocked = useCallback(() => {
    updateNodeData(nodeId, { locked: !isLocked });
  }, [nodeId, isLocked, updateNodeData]);

  const actions: { icon: IconName; label: string; onClick: () => void }[] = [
    { icon: "play", label: "Run node", onClick: () => {} },
    {
      icon: isEnabled ? "eye-off" : "eye",
      label: isEnabled ? "Disable" : "Enable",
      onClick: handleToggleEnabled,
    },
    {
      icon: isLocked ? "unlock" : "lock",
      label: isLocked ? "Unlock" : "Lock",
      onClick: handleToggleLocked,
    },
    { icon: "copy", label: "Duplicate", onClick: () => duplicateNode(nodeId) },
    { icon: "arrow-left-right", label: "Swap", onClick: () => {} },
    { icon: "delete", label: "Delete", onClick: () => deleteNode(nodeId) },
    { icon: "plus", label: "Add step", onClick: handleAddAfter },
  ];

  return (
    <div className="absolute -top-11 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-xl border border-border-glass bg-surface-translucent p-1 shadow-glass backdrop-toolbar opacity-0 transition-opacity duration-200 group-hover/node:opacity-100">
      {actions.map(({ icon, label, onClick }) => (
        <Tooltip key={label}>
          <TooltipTrigger render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-lg text-muted-foreground hover:text-foreground [&_svg]:!size-4"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Icon name={icon} size={16} />
            </Button>
          } />
          <TooltipContent side="top" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
