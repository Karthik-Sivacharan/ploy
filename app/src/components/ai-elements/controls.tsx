"use client";

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Controls as ControlsPrimitive } from "@xyflow/react";

export type ControlsProps = ComponentProps<typeof ControlsPrimitive>;

export const Controls = ({ className, ...props }: ControlsProps) => (
  <ControlsPrimitive
    className={cn(
      "gap-px overflow-hidden rounded-xl border border-border-glass bg-surface-translucent backdrop-toolbar p-1 shadow-glass",
      "[&>button]:rounded-lg [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-surface-overlay-hover!",
      className
    )}
    {...props}
  />
);
