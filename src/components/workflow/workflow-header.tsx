"use client";

import { useCallback } from "react";
import { WorkflowToolbar } from "@/components/workflow/workflow-toolbar";
import { UsageIndicator } from "@/components/workflow/usage-indicator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useWorkflowStore } from "@/stores/workflow-store";

export function WorkflowHeader() {
  const { leftSidebarOpen, setLeftSidebarOpen, configPanelOpen, setConfigPanelOpen } =
    useWorkflowStore();

  const toggleLeftSidebar = useCallback(
    () => setLeftSidebarOpen(!leftSidebarOpen),
    [leftSidebarOpen, setLeftSidebarOpen]
  );

  const toggleConfigPanel = useCallback(
    () => setConfigPanelOpen(!configPanelOpen),
    [configPanelOpen, setConfigPanelOpen]
  );

  return (
    <header className="flex h-[var(--layout-header-height)] items-center justify-between border-b border-border-glass bg-surface-translucent backdrop-toolbar px-4">
      {/* Left: mobile sidebar toggle + usage */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-xs"
          className="md:hidden text-muted-foreground"
          onClick={toggleLeftSidebar}
          aria-label="Toggle sidebar"
        >
          <Icon name={leftSidebarOpen ? "panel-left-close" : "menu"} size="sm" />
        </Button>
        <div className="hidden md:flex">
          <UsageIndicator />
        </div>
      </div>

      {/* Center: toolbar actions */}
      <div className="flex items-center gap-2">
        <WorkflowToolbar />
      </div>

      {/* Right: theme + config panel toggle (mobile) */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon-xs"
          className="md:hidden text-muted-foreground"
          onClick={toggleConfigPanel}
          aria-label="Toggle config panel"
        >
          <Icon name={configPanelOpen ? "panel-right-close" : "panel-right-open"} size="sm" />
        </Button>
      </div>
    </header>
  );
}
