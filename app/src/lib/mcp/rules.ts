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

## Foundation Setup (first time only)
- If the user's project is missing design tokens → copy globals.css token block into their root CSS.
- If @hugeicons/react is not in package.json → run npm install for required dependencies.
- If icons.ts doesn't exist → copy it to src/lib/icons.ts.
- If Clash Grotesk font is not set up → add the Fontshare CDN link tag to their HTML head.
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
- Primary font: Clash Grotesk (--font-clash-grotesk).
- Code font: Geist Mono (--font-geist-mono).

## Layout
- Sidebar width: var(--sidebar-width) = 208px
- Config panel width: var(--config-panel-width) = 360px
- Header height: var(--header-height) = 3.5rem
- Mobile breakpoint: 768px

## Motion
- Use motion duration tokens: --duration-instant, --duration-fast, --duration-normal, --duration-slow.
- Use easing tokens: --ease-out, --ease-out-expo, --ease-in-out, --ease-hover.
- Never hardcode animation durations or easing curves.

## Architecture
- Server Components by default. Only add 'use client' when interactivity is needed.
- Push 'use client' boundary as low as possible (leaf components).
- React Flow components MUST be 'use client' and wrapped in ReactFlowProvider.
- Import alias: @/* maps to src/*.
`;
