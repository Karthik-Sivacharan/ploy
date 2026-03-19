"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { CanvasControls } from "@/components/workflow/canvas-controls";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useWorkflowStore } from "@/stores/workflow-store";

function LogsContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-4 py-2">
        <div className="flex items-center gap-1.5">
          <Icon name="scroll-text" size="sm" className="text-muted-foreground" />
          <span className="text-sm font-medium">Logs</span>
          <Icon name="chevron-down" size="xs" className="text-muted-foreground" />
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground"
          onClick={onClose}
          aria-label="Close logs"
        >
          <Icon name="close" size="xs" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-muted-foreground">
          No logs yet. Run your workflow to see output here.
        </p>
      </div>
    </>
  );
}

export function LogsPanel() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { logsPanelOpen, setLogsPanelOpen } = useWorkflowStore();

  const toggle = useCallback(() => setOpen((v) => !v), []);

  /* On mobile: bottom sheet trigger + Sheet */
  if (isMobile) {
    return (
      <>
        {/* Collapsed trigger — centered pill at bottom */}
        <div className="absolute bottom-[var(--layout-panel-gap)] left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          <button
            onClick={() => setLogsPanelOpen(true)}
            className="flex h-10 items-center gap-1.5 rounded-xl border border-border-glass bg-surface-translucent px-3 shadow-glass backdrop-panel transition-colors duration-[var(--duration-fast)] ease-[var(--ease-hover)] hover:bg-surface-translucent-hover"
          >
            <Icon name="scroll-text" size="sm" className="text-muted-foreground" />
            <span className="text-sm font-medium">Logs</span>
            <Icon name="chevron-up" size="xs" className="text-muted-foreground" />
          </button>
          <CanvasControls />
        </div>

        <Sheet open={logsPanelOpen} onOpenChange={setLogsPanelOpen}>
          <SheetContent side="bottom" showCloseButton={false} className="h-[50vh] p-0">
            <SheetTitle className="sr-only">Workflow logs</SheetTitle>
            <LogsContent onClose={() => setLogsPanelOpen(false)} />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  /* Desktop: inline floating panel */
  return (
    <>
      {/* Collapsed trigger — centered pill at bottom */}
      <div
        className={cn(
          "absolute bottom-[var(--layout-panel-gap)] left-1/2 z-10 flex -translate-x-1/2 items-center gap-2",
          "transition-opacity ease-[var(--ease-out)]",
          open
            ? "pointer-events-none opacity-0 duration-[var(--duration-fast)]"
            : "opacity-100 duration-[var(--duration-normal)]"
        )}
      >
        <button
          onClick={toggle}
          className="flex h-10 items-center gap-1.5 rounded-xl border border-border-glass bg-surface-translucent px-3 shadow-glass backdrop-panel transition-colors duration-[var(--duration-fast)] ease-[var(--ease-hover)] hover:bg-surface-translucent-hover"
          tabIndex={open ? -1 : 0}
        >
          <Icon name="scroll-text" size="sm" className="text-muted-foreground" />
          <span className="text-sm font-medium">Logs</span>
          <Icon name="chevron-up" size="xs" className="text-muted-foreground" />
        </button>
        <CanvasControls />
      </div>

      {/* Expanded panel — spans between sidebar and config panel */}
      <div
        className={cn(
          "absolute bottom-[var(--layout-panel-gap)] left-60 z-10 flex flex-col overflow-hidden will-change-transform",
          "rounded-2xl border border-border-glass bg-surface-translucent shadow-glass backdrop-panel",
          "transition-[opacity,transform] ease-[var(--ease-out-expo)]",
          open
            ? "opacity-100 translate-y-0 duration-[var(--duration-panel)]"
            : "pointer-events-none opacity-0 translate-y-3 duration-[calc(var(--duration-panel)*0.8)]"
        )}
        style={{
          height: "var(--layout-logs-panel-height)",
          right: "calc(var(--layout-panel-gap) + var(--layout-config-panel-width) + var(--layout-panel-gap))",
        }}
      >
        <LogsContent onClose={toggle} />
      </div>
    </>
  );
}
