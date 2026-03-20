import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
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

export function SourceInfo({
  icon = "check-circle",
  children,
}: {
  icon?: "check-circle" | "clock";
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-badge text-muted-foreground">
      <Icon
        name={icon}
        size="xs"
        className={icon === "check-circle" ? "text-chart-2" : "text-muted-foreground"}
      />
      {children}
    </div>
  );
}
