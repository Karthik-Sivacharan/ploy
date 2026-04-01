export const designSystemRules: string = `
# Ploy Design System Rules

## Installation Protocol (IMPORTANT — read before doing anything)
- Call get_design_system() ONCE at session start to get tokens, icons, fonts, and these rules.
- Call list_components() to see what's available in the registry.
- Before copying ANY component, CHECK if it already exists in the user's project:
  - Look in src/components/ui/, src/components/workflow/, src/components/ai-elements/
  - If it EXISTS → just import and use it. Do NOT overwrite or duplicate.
  - If it does NOT exist → call get_component("name") → copy source to the install_path in the response.
- Always resolve dependencies: if "button" depends on "icon", check if "icon" exists first.
- After first setup, subsequent sessions should skip installation. The agent should check, not assume.
- NEVER re-copy a component that already exists. Import what's there.
- After installing components, call get_shared_files() to get library files (stores, hooks, types, utilities) that components import from.
- Copy these to their respective paths. They are required for components to compile.
- The workflow store (src/stores/workflow-store.ts) is the central state — install it if using any workflow components.

## Foundation Setup (first time only)
- If the user's project is missing design tokens → copy globals.css token block into their root CSS.
- If @hugeicons/react is not in package.json → run npm install for required dependencies.
- If icons.ts doesn't exist → copy it to src/lib/icons.ts.
- If Clash Grotesk font is not set up → add the Fontshare CDN link tag AND the Geist Mono Google Fonts CDN link tag to their HTML head, AND add the CSS variable declarations (:root { --font-clash-grotesk: 'Clash Grotesk', sans-serif; --font-geist-mono: 'Geist Mono', ui-monospace, monospace; }) to the root CSS. Both are required — the CDN loads the font files, the CSS variables connect them to the design tokens.
- If cn() utility doesn't exist → copy utils.ts to src/lib/utils.ts.
- If ALL of the above already exist → skip setup entirely and start composing.

## Components
- ONLY use components from this registry. Never create custom components that duplicate existing ones.
- Always check list_components before building anything to see what's available.
- Use get_component to get the real source code. Never guess at component APIs.

## Styling
- NEVER use raw Tailwind colors (bg-blue-500, text-gray-300, etc.)
- ALWAYS use semantic tokens: bg-primary, bg-muted, text-foreground, border-border, etc.
- Use the OKLCH color scales only through semantic mappings, not directly.
- Use cn() from @/lib/utils for conditional class merging.
- Use cva() for component variants.

## Icons
- ONLY use the <Icon name="..." size="sm" /> component from @/components/ui/icon.tsx.
- NEVER import directly from @hugeicons/core-free-icons or @hugeicons/react.
- NEVER import from lucide-react or any other icon library.
- The icon registry (src/lib/icons.ts) maps semantic names to Hugeicons data. Only use names that exist in the registry.
- Available sizes: xs (14px), sm (16px), md (20px), lg (24px). Can also pass a raw number.
- If you need an icon that doesn't exist in the registry, tell the user — do NOT create a direct import.
- The full icon registry is returned by get_design_system. Check it before using any icon name.

## Typography
- Use font-size tokens: txt-caption, txt-sm, txt-base, txt-lg, txt-xl, txt-2xl, heading-sm, heading-md, heading-lg, heading-xl.
- Primary font: Clash Grotesk (--font-clash-grotesk) — loaded via Fontshare CDN.
- Code font: Geist Mono (--font-geist-mono) — loaded via Google Fonts CDN.
- IMPORTANT: Both fonts need TWO things to work: (1) a CDN link tag in <head> to load the font files, and (2) a CSS variable declaration in :root to bridge the font name to the design token. Without the CSS variable, the font loads but never applies because globals.css references var(--font-clash-grotesk) and var(--font-geist-mono).

## Layout
- Sidebar width: var(--sidebar-width) = 208px
- Config panel width: var(--config-panel-width) = 360px
- Header height: var(--header-height) = 3.5rem
- Mobile breakpoint: 768px

## Motion
- Use motion duration tokens: --duration-instant, --duration-fast, --duration-normal, --duration-slow.
- Use easing tokens: --ease-out, --ease-out-expo, --ease-in-out, --ease-hover.
- Never hardcode animation durations or easing curves.

## Provider Branding
- Use <ProviderIcon provider="..." size="..." /> for third-party service logos.
- The provider registry at src/lib/providers.ts maps provider names to Brandfetch domains and fallback icons.
- Brand logos require a free Brandfetch client ID. Get one at https://developers.brandfetch.com/register
- Set NEXT_PUBLIC_BRANDFETCH_CLIENT_ID in the user's .env.local file. Without it, brand logos won't load and ProviderIcon falls back to Hugeicons icons.
- If you need a new provider, add it to the providers registry with its domain and a Hugeicons fallback.
- ProviderIcon automatically falls back to a Hugeicons icon if the brand logo fails to load.

## Workflow Nodes
- ALWAYS use action-node for workflow canvas nodes. It supports rich body rendering via actionType.
- NEVER use trigger-node directly for composed workflows — it only renders plain key-value fields.
- Every provider-specific node (Frontify, Anthropic, Meta, etc.) should use action-node with the appropriate actionType and provider values.
- Valid provider-specific actionType values: frontify-brand-assets, notion-brand-voice, hubspot-target-audience, ploy-ai-campaign, webflow-landing-page, mailchimp-email-sequence, meta-instagram-ads, onesignal-push-notification
- Generic action types (render plain key-value fields): generate-text, generate-image, http-request, database-query, condition, github-create-issue, github-list-issues, slack-send-message, resend-send-email, stripe-create-customer, stripe-create-invoice

## Page Composition
- The workflow builder page layout should compose these components:
  1. WorkflowHeader — top bar with branding, toolbar, and theme toggle
  2. LeftSidebar — workspace navigation (Sheet on mobile)
  3. WorkflowCanvas — React Flow canvas (center, takes remaining space)
  4. ConfigPanelSidebar — right panel for node configuration (Sheet on mobile)
  5. LogsPanel — bottom panel for logs (Sheet on mobile)
- All layout components read from useWorkflowStore (the Zustand store)
- The canvas must be wrapped in ReactFlowProvider

## Complex Dependencies
- brand-voice-editor requires the Lexical rich text editor framework (lexical, @lexical/react, @lexical/rich-text) plus custom editor components from @/components/editor/*. If you don't have Lexical set up, use a simple textarea placeholder instead.
- Components that import from @/components/editor/* are Lexical editor components — they are NOT provided by this MCP server.

## Images and Placeholders
- NEVER hardcode image paths like /assets/brands/logo.webp — consumer projects won't have these files.
- Use placeholder constants from @/lib/placeholder for mock/demo images: PLACEHOLDER_IMAGE, PLACEHOLDER_LOGO, PLACEHOLDER_AVATAR, PLACEHOLDER_BRAND.
- These are inline SVG data URIs that work in both light and dark mode with no external dependencies.
- When the user provides their own assets, replace the placeholder with the real image path.

## Architecture
- Server Components by default. Only add 'use client' when interactivity is needed.
- Push 'use client' boundary as low as possible (leaf components).
- React Flow components MUST be 'use client' and wrapped in ReactFlowProvider.
- Import alias: @/* maps to src/*.
`;
