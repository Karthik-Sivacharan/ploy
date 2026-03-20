import type { IconName } from "@/lib/icons";

export interface ProviderConfig {
  /** Hugeicons icon name — used when no brand logo exists */
  icon?: IconName;
  /** Brandfetch domain — used to fetch the real brand logo */
  logo?: string;
  /** Tailwind classes for the icon badge background + text color */
  colors: string;
}

/**
 * Single source of truth for provider branding.
 *
 * Every provider used anywhere (nodes, sidebar, action grid) should be
 * registered here. Components use `<ProviderIcon>` to render the correct
 * visual automatically.
 *
 * - `logo` (Brandfetch domain) takes priority when present.
 * - `icon` (Hugeicons) is the fallback.
 * - Provide both for graceful degradation if the CDN image fails to load.
 */
export const PROVIDERS: Record<string, ProviderConfig> = {
  // --- Internal / generic ---
  System: {
    icon: "settings",
    colors: "bg-muted text-foreground",
  },
  "AI Gateway": {
    icon: "sparkles",
    colors: "bg-primary/15 text-primary",
  },
  Ploy: {
    icon: "workflow",
    colors: "bg-primary/15 text-primary",
  },

  // --- Integrations (with brand logos) ---
  Gmail: {
    icon: "mail",
    logo: "gmail.com",
    colors: "bg-red-500/15 text-red-500",
  },
  GitHub: {
    icon: "github",
    logo: "github.com",
    colors: "bg-muted text-foreground",
  },
  Slack: {
    icon: "message-square",
    logo: "slack.com",
    colors: "bg-muted text-foreground",
  },
  Resend: {
    icon: "mail",
    logo: "resend.com",
    colors: "bg-blue-500/15 text-blue-500",
  },
  Stripe: {
    icon: "credit-card",
    logo: "stripe.com",
    colors: "bg-purple-500/15 text-purple-500",
  },
  Webflow: {
    icon: "layout-template",
    logo: "webflow.com",
    colors: "bg-blue-500/15 text-blue-500",
  },
  Mailchimp: {
    icon: "mail",
    logo: "mailchimp.com",
    colors: "bg-yellow-500/15 text-yellow-500",
  },
  LinkedIn: {
    icon: "message-square",
    logo: "linkedin.com",
    colors: "bg-blue-600/15 text-blue-600",
  },
  CMS: {
    icon: "book-open",
    logo: "wordpress.com",
    colors: "bg-sky-500/15 text-sky-500",
  },

  // --- Toolbar triggers (logo-only, used in ToolbarTab) ---
  Outlook: { logo: "outlook.com", colors: "bg-blue-500/15 text-blue-500" },
  "RSS Feed": { logo: "rss.com", colors: "bg-orange-500/15 text-orange-500" },
  Telegram: { logo: "telegram.org", colors: "bg-sky-500/15 text-sky-500" },
  "Twilio Voice": { logo: "twilio.com", colors: "bg-red-500/15 text-red-500" },
  Typeform: { logo: "typeform.com", colors: "bg-muted text-foreground" },
  WhatsApp: { logo: "whatsapp.com", colors: "bg-green-500/15 text-green-500" },
};

/** Resolve a provider config with safe fallbacks. */
export function getProvider(name: string): ProviderConfig {
  return PROVIDERS[name] ?? { icon: "zap", colors: "bg-muted text-muted-foreground" };
}
