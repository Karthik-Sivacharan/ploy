import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function InfoRow({
  label,
  value,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2",
        className
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}
