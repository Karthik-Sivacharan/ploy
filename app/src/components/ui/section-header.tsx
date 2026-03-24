import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "text-xs font-medium text-muted-foreground uppercase tracking-wider",
        className
      )}
    >
      {children}
    </h4>
  );
}
