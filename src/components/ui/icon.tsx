import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { icons, type IconName } from "@/lib/icons";

const sizeMap = {
  xs: "var(--icon-xs)",
  sm: "var(--icon-sm)",
  md: "var(--icon-md)",
  lg: "var(--icon-lg)",
} as const;

type IconSize = keyof typeof sizeMap;

interface IconProps {
  name: IconName;
  size?: IconSize | number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({
  name,
  size = "sm",
  strokeWidth = 2,
  className,
}: IconProps) {
  const iconData = icons[name];

  const resolvedSize = typeof size === "number" ? size : sizeMap[size];

  return (
    <HugeiconsIcon
      icon={iconData}
      size={resolvedSize}
      strokeWidth={strokeWidth}
      color="currentColor"
      className={cn("shrink-0", className)}
    />
  );
}
