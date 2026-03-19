"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0">
              <Icon name="sun" size="sm" />
            </span>
            <span className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100">
              <Icon name="moon" size="sm" />
            </span>
          </Button>
        }
      />
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  );
}
