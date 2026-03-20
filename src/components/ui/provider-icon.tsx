"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { getProvider } from "@/lib/providers";

const BRANDFETCH_CLIENT_ID = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID ?? "";

/**
 * Build a Brandfetch CDN URL for a brand icon.
 *
 * Requests a high-res icon (512×512) so it stays crisp on retina displays
 * even when rendered at 16–24 px. The CDN serves WebP by default which is
 * lightweight despite the higher resolution.
 */
function brandfetchUrl(domain: string): string {
  const base = `https://cdn.brandfetch.io/${domain}/w/512/h/512/icon`;
  return BRANDFETCH_CLIENT_ID ? `${base}?c=${BRANDFETCH_CLIENT_ID}` : base;
}

type IconSize = "xs" | "sm" | "md";

const SIZE_PX: Record<IconSize, number> = {
  xs: 14,
  sm: 18,
  md: 24,
};

interface ProviderIconProps {
  /** Provider name — must match a key in PROVIDERS (or falls back to generic icon). */
  provider: string;
  /** Display size. Defaults to "sm". */
  size?: IconSize;
  /** Extra classes applied to the wrapper. */
  className?: string;
}

/**
 * Renders a provider's brand logo (via Brandfetch) or a Hugeicons icon,
 * depending on what's configured in the provider registry.
 *
 * Falls back to the Hugeicons icon if the brand image fails to load.
 */
export function ProviderIcon({ provider, size = "sm", className }: ProviderIconProps) {
  const config = getProvider(provider);
  const [logoFailed, setLogoFailed] = useState(false);

  const px = SIZE_PX[size];

  // Prefer brand logo when available and not failed
  if (config.logo && !logoFailed) {
    return (
      <img
        src={brandfetchUrl(config.logo)}
        alt={provider}
        width={px}
        height={px}
        className={cn("rounded", className)}
        style={{ width: px, height: px }}
        onError={() => setLogoFailed(true)}
      />
    );
  }

  // Fallback to Hugeicons
  return (
    <Icon
      name={config.icon ?? "zap"}
      size={size === "md" ? "sm" : size}
      className={className}
    />
  );
}
