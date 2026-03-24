import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";

export function SourceInfo({
  icon = "check-circle",
  children,
}: {
  icon?: "check-circle" | "clock";
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 txt-badge text-muted-foreground">
      <Icon
        name={icon}
        size="xs"
        className={icon === "check-circle" ? "text-success" : "text-muted-foreground"}
      />
      {children}
    </div>
  );
}
