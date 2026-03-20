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

  // --- Brand / DAM ---
  Notion: {
    icon: "book-open",
    logo: "notion.so",
    colors: "bg-muted text-foreground",
  },
  Frontify: {
    icon: "layers",
    logo: "frontify.com",
    colors: "bg-muted text-foreground",
  },

  // --- CRM ---
  HubSpot: {
    icon: "user-group",
    logo: "hubspot.com",
    colors: "bg-muted text-foreground",
  },

  // --- Integrations (with brand logos) ---
  Gmail: {
    icon: "mail",
    logo: "gmail.com",
    colors: "bg-muted text-foreground",
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
    colors: "bg-muted text-foreground",
  },
  Stripe: {
    icon: "credit-card",
    logo: "stripe.com",
    colors: "bg-muted text-foreground",
  },
  Webflow: {
    icon: "layout-template",
    logo: "webflow.com",
    colors: "bg-muted text-foreground",
  },
  Mailchimp: {
    icon: "mail",
    logo: "mailchimp.com",
    colors: "bg-muted text-foreground",
  },
  LinkedIn: {
    icon: "message-square",
    logo: "linkedin.com",
    colors: "bg-muted text-foreground",
  },
  Meta: {
    icon: "image",
    logo: "meta.com",
    colors: "bg-muted text-foreground",
  },
  CMS: {
    icon: "book-open",
    logo: "wordpress.com",
    colors: "bg-muted text-foreground",
  },

  // --- Toolbar triggers (logo-only, used in ToolbarTab) ---
  Outlook: { logo: "outlook.com", colors: "bg-muted text-foreground" },
  "RSS Feed": { logo: "rss.com", colors: "bg-muted text-foreground" },
  Telegram: { logo: "telegram.org", colors: "bg-muted text-foreground" },
  "Twilio Voice": { logo: "twilio.com", colors: "bg-muted text-foreground" },
  Typeform: { logo: "typeform.com", colors: "bg-muted text-foreground" },
  WhatsApp: { logo: "whatsapp.com", colors: "bg-muted text-foreground" },
};

/** Resolve a provider config with safe fallbacks. */
export function getProvider(name: string): ProviderConfig {
  return PROVIDERS[name] ?? { icon: "zap", colors: "bg-muted text-muted-foreground" };
}
