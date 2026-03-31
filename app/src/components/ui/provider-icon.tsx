"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { getProvider } from "@/lib/providers";

const BRAND_PROXY_URL = process.env.NEXT_PUBLIC_PLOY_BRAND_PROXY_URL ?? "";
const BRANDFETCH_CLIENT_ID = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID ?? "";

/** Default proxy hosted on Ploy's deployment — no API key needed. */
const DEFAULT_PROXY = "https://useploy.vercel.app";

/**
 * Build a brand logo URL for a given domain.
 *
 * Priority:
 * 1. NEXT_PUBLIC_PLOY_BRAND_PROXY_URL → custom proxy
 * 2. NEXT_PUBLIC_BRANDFETCH_CLIENT_ID → Brandfetch CDN directly
 * 3. Default Ploy proxy at useploy.vercel.app
 */
function brandfetchUrl(domain: string): string {
  if (BRAND_PROXY_URL) {
    return `${BRAND_PROXY_URL}/api/brand-logo/${domain}`;
  }
  if (BRANDFETCH_CLIENT_ID) {
    return `https://cdn.brandfetch.io/${domain}/w/512/h/512/icon?c=${BRANDFETCH_CLIENT_ID}`;
  }
  return `${DEFAULT_PROXY}/api/brand-logo/${domain}`;
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
