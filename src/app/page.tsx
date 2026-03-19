"use client";

import { WorkflowHeader } from "@/components/workflow/workflow-header";
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas";
import { ConfigPanelSidebar } from "@/components/workflow/config-panel-sidebar";
import { LeftSidebar } from "@/components/workflow/left-sidebar";
import { LogsPanel } from "@/components/workflow/logs-panel";

export default function WorkflowPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <WorkflowHeader />
      <div className="relative flex-1 overflow-hidden">
        <WorkflowCanvas>
          <LogsPanel />
        </WorkflowCanvas>
        <LeftSidebar />
        <ConfigPanelSidebar />
      </div>
    </div>
  );
}
