"use client";

import { useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWorkflowStore } from "@/stores/workflow-store";
import type { IconName } from "@/lib/icons";

export function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const layoutNodes = useWorkflowStore((s) => s.layoutNodes);

  const actions: { icon: IconName; label: string; onClick: () => void }[] = [
    { icon: "zoom-out", label: "Zoom out", onClick: () => zoomOut() },
    { icon: "zoom-in", label: "Zoom in", onClick: () => zoomIn() },
    { icon: "maximize", label: "Fit view", onClick: () => fitView({ padding: 0.3, maxZoom: 0.85 }) },
    { icon: "layout-template", label: "Auto layout", onClick: () => { layoutNodes(); fitView({ padding: 0.3, maxZoom: 0.85 }); } },
  ];

  return (
    <div className="flex h-12 items-center gap-1 rounded-2xl border border-border-glass bg-surface-translucent px-1.5 shadow-glass backdrop-panel">
      {actions.map(({ icon, label, onClick }) => (
        <Tooltip key={label}>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-9 text-muted-foreground hover:text-foreground"
                onClick={onClick}
              >
                <Icon name={icon} size="lg" />
              </Button>
            }
          />
          <TooltipContent side="top" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
