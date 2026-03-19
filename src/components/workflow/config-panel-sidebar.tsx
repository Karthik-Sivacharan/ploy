"use client";

import { NodeConfigPanel } from "@/components/workflow/node-config-panel";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useWorkflowStore } from "@/stores/workflow-store";

/** Desktop: floating absolute panel. Mobile: slide-in Sheet from right. */
export function ConfigPanelSidebar() {
  const isMobile = useIsMobile();
  const { configPanelOpen, setConfigPanelOpen } = useWorkflowStore();

  if (isMobile) {
    return (
      <Sheet open={configPanelOpen} onOpenChange={setConfigPanelOpen}>
        <SheetContent side="right" showCloseButton={false} className="w-[var(--layout-config-panel-width)] max-w-[85vw] p-0">
          <SheetTitle className="sr-only">Node configuration</SheetTitle>
          <div className="flex h-full flex-col overflow-y-auto">
            <NodeConfigPanel />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="absolute top-[var(--layout-panel-gap)] right-[var(--layout-panel-gap)] bottom-[var(--layout-panel-gap)] z-10 flex rounded-2xl border border-border-glass bg-surface-translucent backdrop-panel shadow-glass"
      style={{ width: "var(--layout-config-panel-width)" }}
    >
      <div className="flex-1 overflow-y-auto">
        <NodeConfigPanel />
      </div>
    </div>
  );
}
