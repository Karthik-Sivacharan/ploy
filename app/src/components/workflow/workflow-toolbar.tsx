"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WorkflowToolbar() {
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger render={
          <Button variant="outline" size="sm" className="gap-1.5">
            <Icon name="upload" size="xs" />
            <span className="hidden md:inline">Deploy</span>
          </Button>
        } />
        <TooltipContent>Deploy workflow</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger render={
          <Button variant="default" size="sm" className="gap-1.5">
            <Icon name="play" size="xs" />
            <span className="hidden md:inline">Run</span>
          </Button>
        } />
        <TooltipContent>Run workflow</TooltipContent>
      </Tooltip>
    </div>
  );
}
