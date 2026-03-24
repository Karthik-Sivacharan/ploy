"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PLAN = "Free";
const USED = 2.45;
const LIMIT = 20.0;
const SEGMENTS = 10;

export function UsageIndicator() {
  const percentage = (USED / LIMIT) * 100;
  const filledSegments = Math.round((percentage / 100) * SEGMENTS);

  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className="font-medium text-sm md:text-xs">
        {PLAN}
      </Badge>

      <Separator orientation="vertical" className="h-4" />

      <span className="text-sm tabular-nums text-muted-foreground">
        ${USED.toFixed(2)}{" "}
        <span className="text-muted-foreground/60">/</span>{" "}
        ${LIMIT.toFixed(2)}
      </span>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-3 rounded-full transition-colors ${
              i < filledSegments
                ? "bg-primary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Button variant="outline" size="xs">
        Upgrade
      </Button>

      <Button variant="ghost" size="xs" className="text-muted-foreground">
        Invite
      </Button>
    </div>
  );
}
