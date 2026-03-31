# Ploy Component Registry — MCP Server Implementation

## What This Is

An MCP server that serves Ploy's component library, design tokens, and usage rules to AI agents. When an AI agent connects, it can query components, get real source code, and compose screens using the actual Ploy design system — no hallucination.

Storybook and the MCP read from the same `src/components/` directory. There is no build step, no JSON snapshots, no sync issue. Change a component file → both Storybook and MCP serve the updated version immediately.

---

## Architecture

```
src/components/**/*.tsx        ← single source of truth
src/app/globals.css            ← design tokens
src/lib/icons.ts               ← icon registry
src/app/fonts/*.woff2          ← font files
        │
        ├──→ Storybook (visual docs for humans)
        │      reads same files at dev time
        │
        └──→ Ploy MCP Server (AI interface)
               reads same files at request time
               serves code + tokens + rules
```

No duplication. No drift. One directory, two consumers.

---

## How the MCP Server Works (No LLM)

The MCP server has **no intelligence**. It is a structured file reader — a glorified `cat` command with auth.

```
┌─────────────────────────┐         ┌──────────────────────┐
│  AI Agent (the LLM)     │         │  MCP Server (no LLM) │
│                         │         │                       │
│  Understands the user   │  ──→    │  list_components()    │
│  Picks which tools      │  ←──    │  → returns JSON array │
│  Composes the screen    │         │                       │
│                         │  ──→    │  get_component("card")│
│                         │  ←──    │  → returns file string│
└─────────────────────────┘         └───────────────────────┘
       has intelligence                 has no intelligence
       makes decisions                  serves data
```

- `list_components()` → reads the component index, returns JSON. No reasoning.
- `get_component("button")` → reads `button.tsx` from disk, returns the string. No reasoning.
- `search_components("form input")` → fuzzy string match via `fuse.js`. No LLM, just string similarity.
- `get_design_system()` → reads `globals.css`, `icons.ts`, returns them with rules. No reasoning.

All intelligence lives in the AI agent that calls the MCP. The MCP just answers exactly what's asked. Same query always returns the same result. No hallucination possible in the MCP layer.

---

## First-Time Setup Flow

When an AI agent connects for the first time on behalf of a user who doesn't have Ploy's dependencies installed:

```
AI Agent connects → calls get_design_system()

Response includes:
  npm_dependencies:
    required: ["@hugeicons/react", "@hugeicons/core-free-icons",
               "class-variance-authority", "@radix-ui/react-slot"]
    optional: ["@xyflow/react", "zustand", "motion"]
  font_setup:
    css: "@font-face { font-family: 'Clash Grotesk'; src: url('https://assets.ploy.dev/fonts/...') ... }"
  tokens: "/* globals.css — full design tokens */"
  icons: "/* icons.ts — full icon registry */"
  rules: "Only use <Icon name='...' />, never import directly..."

Agent checks the user's package.json:
  - @hugeicons/react missing     → runs npm install
  - Clash Grotesk not set up     → adds @font-face CSS to root stylesheet
  - icons.ts doesn't exist       → writes it to src/lib/icons.ts
  - globals.css tokens missing   → merges tokens into user's CSS

Then starts composing with real components.
```

Second time the same user connects, everything's already installed. The agent skips setup and goes straight to composing. The MCP returns the same data every time — the agent is smart enough not to reinstall.

---

## MCP Server Tools

### Tool 1: `get_design_system`

Returns the foundation layer. AI agents call this **once** at the start of a session.

**Returns:**
- `globals.css` — full design tokens (OKLCH color scales, semantic tokens, typography, motion, shadows, layout, z-index, radii)
- `icons` — the full icon registry (`src/lib/icons.ts`) so the agent knows available icons
- `font_setup` — instructions for font integration (CDN URL, not binary files)
- `rules` — system prompt / constraints for the AI agent (see Rules section below)
- `dependencies` — required npm packages (`@hugeicons/react`, `@hugeicons/core-free-icons`, `class-variance-authority`, `@radix-ui/react-*`, etc.)

**Why this exists:** establishes the design system context so every subsequent `get_component` call makes sense. Tokens are sent once here, not repeated per component.

### Tool 2: `list_components`

Returns an index of all available components.

**Returns per component:**
- `name` — component identifier (e.g. `button`, `trigger-node`)
- `category` — `ui` | `workflow` | `ai-elements`
- `description` — one-line description
- `file_path` — relative path from project root
- `dependencies` — other Ploy components this depends on

**Example response:**
```json
[
  { "name": "button", "category": "ui", "description": "Primary action button with variant and size props", "dependencies": [] },
  { "name": "card", "category": "ui", "description": "Container with header, content, footer sections", "dependencies": [] },
  { "name": "trigger-node", "category": "workflow", "description": "Workflow trigger node for React Flow canvas", "dependencies": ["card", "badge", "icon"] }
]
```

### Tool 3: `get_component`

Given a component name, returns everything needed to use it.

**Parameters:**
- `name` (required) — component name (e.g. `"button"`)
- `include_dependencies` (optional, default `true`) — also return source of dependent Ploy components

**Returns:**
- `source` — full `.tsx` file content (the real implementation)
- `story_source` — the `.stories.tsx` file (usage examples)
- `install_path` — where to place this file in the user's project (e.g. `src/components/ui/button.tsx`)
- `check_before_install` — instruction to check if the file already exists before copying
- `dependencies` — list of other Ploy components referenced (check if each exists too)
- `npm_dependencies` — external packages needed (check package.json before installing)
- `storybook_url` — link to Storybook docs page for this component

### Tool 4: `search_components`

Fuzzy search across component names and descriptions.

**Parameters:**
- `query` (required) — search term (e.g. `"form input"`, `"workflow node"`)

**Returns:** same shape as `list_components`, filtered by relevance.

---

## Rules Sent With `get_design_system`

The MCP server includes a `rules` field — a system-prompt-style string that the AI agent receives as context. This is how you keep the AI on track.

```markdown
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
```

These rules travel with every `get_design_system` response. The AI agent has them in context before it starts composing.

---

## Icons — How They're Served

Icons in Ploy use a **registry pattern** — no component ever imports from Hugeicons directly.

### The Two Layers

**Layer 1: Icon Registry** (`src/lib/icons.ts`)

A single file that maps ~90 semantic names to Hugeicons icon data:

```ts
export const icons = {
  "search": Search01Icon,      // from @hugeicons/core-free-icons
  "sparkles": SparklesIcon,
  "delete": Delete02Icon,
  "sidebar": SidebarLeft01Icon,
  // ...90+ mappings
} as const;

export type IconName = keyof typeof icons;
```

This is the **only file** that imports from `@hugeicons/core-free-icons`. Every other file in the codebase uses semantic names.

**Layer 2: Icon Component** (`src/components/ui/icon.tsx`)

A thin wrapper that looks up the registry and renders:

```tsx
<Icon name="search" size="sm" />
<Icon name="sparkles" size="md" className="text-primary" />
<Icon name="delete" size="lg" strokeWidth={1.5} />
```

Props:
- `name` — must be a key from the icon registry (`IconName` type)
- `size` — `"xs"` (14px) | `"sm"` (16px) | `"md"` (20px) | `"lg"` (24px) | raw number
- `strokeWidth` — defaults to 2
- `className` — for color/spacing via Tailwind

### What the MCP Returns

The `get_design_system` tool returns the **full `icons.ts` source** so the AI agent can see every available icon name. The agent:

1. Reads the registry → knows `"search"`, `"sparkles"`, `"delete"`, etc. exist
2. Uses `<Icon name="search" size="sm" />` → works immediately
3. Never imports from `@hugeicons/core-free-icons` → because the rules say don't
4. Needs an icon that's not in the registry → tells the user to add it to `icons.ts`

The `icon.tsx` component source is also returned via `get_component("icon")` so the agent understands the API.

### Why This Pattern Matters for the MCP

Without the registry pattern, the AI would need to know about 10,000+ Hugeicons and pick the right one. With the registry, it only sees the ~90 icons you've curated. It can't pick a wrong icon because the `IconName` type constrains it. And if it uses a name that doesn't exist, TypeScript catches it.

---

## Fonts — How They're Served

**Font files are NEVER sent through MCP responses.** They're too large and would be duplicated on every request.

### Approach: CDN-Hosted Fonts

Host the 6 Clash Grotesk `.woff2` files on a CDN. The MCP `get_design_system` response includes setup instructions:

```json
{
  "font_setup": {
    "instructions": "Add this CSS to your root stylesheet. Fonts are served from the CDN — do not download or duplicate them.",
    "css": "@font-face {\n  font-family: 'Clash Grotesk';\n  src: url('https://assets.ploy.dev/fonts/ClashGrotesk-Extralight.woff2') format('woff2');\n  font-weight: 200;\n  font-display: swap;\n}\n@font-face {\n  font-family: 'Clash Grotesk';\n  src: url('https://assets.ploy.dev/fonts/ClashGrotesk-Light.woff2') format('woff2');\n  font-weight: 300;\n  font-display: swap;\n}\n@font-face {\n  font-family: 'Clash Grotesk';\n  src: url('https://assets.ploy.dev/fonts/ClashGrotesk-Regular.woff2') format('woff2');\n  font-weight: 400;\n  font-display: swap;\n}\n@font-face {\n  font-family: 'Clash Grotesk';\n  src: url('https://assets.ploy.dev/fonts/ClashGrotesk-Medium.woff2') format('woff2');\n  font-weight: 500;\n  font-display: swap;\n}\n@font-face {\n  font-family: 'Clash Grotesk';\n  src: url('https://assets.ploy.dev/fonts/ClashGrotesk-Semibold.woff2') format('woff2');\n  font-weight: 600;\n  font-display: swap;\n}\n@font-face {\n  font-family: 'Clash Grotesk';\n  src: url('https://assets.ploy.dev/fonts/ClashGrotesk-Bold.woff2') format('woff2');\n  font-weight: 700;\n  font-display: swap;\n}",
    "css_variable": "--font-clash-grotesk: 'Clash Grotesk', sans-serif;",
    "code_font": "Geist Mono — install via next/font/google or use: font-family: 'Geist Mono', monospace;"
  }
}
```

### Where to Host Fonts

| Option | How | Cost |
|---|---|---|
| **Cloudflare R2** | Upload woff2 files, public bucket, custom domain `assets.ploy.dev` | Free tier: 10GB storage, 10M reads/month |
| **Vercel Blob** | Upload via Vercel dashboard, get permanent URLs | Free tier: 1GB |
| **AWS S3 + CloudFront** | S3 bucket + CDN distribution | ~$0.02/GB |
| **Same Vercel deployment** | Put fonts in `public/fonts/`, served at `registry.ploy.dev/fonts/` | Free (included in deployment) |

**Recommended: Cloudflare R2** — free, fast, custom domain, no egress fees. Set `Cache-Control: public, max-age=31536000, immutable` on the font files since they never change.

---

## Hosting the MCP Server

### Option A: Vercel (recommended to start)

The MCP server runs as a Vercel serverless function with SSE transport.

**Project structure:**
```
ploy-registry/                    ← separate repo or monorepo package
├── src/
│   ├── server.ts                 ← MCP server entry point
│   ├── tools/
│   │   ├── get-design-system.ts  ← reads globals.css, icons.ts, builds rules
│   │   ├── list-components.ts    ← scans component directories
│   │   ├── get-component.ts      ← reads .tsx + .stories.tsx files
│   │   └── search-components.ts  ← fuzzy search
│   ├── auth.ts                   ← API key validation
│   ├── component-index.ts        ← component metadata (names, descriptions, deps)
│   └── rules.ts                  ← design system rules string
├── components/                   ← git submodule or copy of src/components/
│   ├── ui/
│   ├── workflow/
│   └── ai-elements/
├── tokens/
│   ├── globals.css               ← git submodule or copy
│   └── icons.ts
├── vercel.json
├── package.json
└── tsconfig.json
```

**Deployment:** `vercel deploy --prod` → lives at `registry.ploy.dev`

**Endpoint:** `https://registry.ploy.dev/mcp` (SSE transport)

### Option B: Cloudflare Workers

Lighter weight, runs at the edge (faster globally), generous free tier.

Same code, different runtime adapter. Use `@modelcontextprotocol/sdk` with the Cloudflare Workers adapter.

### Option C: Standalone Node process (for local dev)

Run the MCP server as a stdio process. No hosting needed. Add to `.mcp.json`:

```json
{
  "mcpServers": {
    "ploy": {
      "command": "node",
      "args": ["./ploy-registry/dist/stdio.mjs"]
    }
  }
}
```

This is how your internal team uses it during development. Zero infra.

### Recommended Setup

| Environment | Transport | Auth | Where |
|---|---|---|---|
| Local dev (your team) | stdio | None needed | Runs as subprocess |
| Remote (external consumers) | SSE over HTTPS | API key | Vercel or Cloudflare |

Start with **local stdio** to validate the MCP works. Then deploy to **Vercel** when ready for external access.

---

## Security

### Must-Have (implement from day 1)

**1. API Key Authentication**

Every remote MCP connection must include a valid API key.

```
Authorization: Bearer ploy_sk_abc123def456...
```

- Generate keys with a `ploy_sk_` prefix (easy to identify in logs and secret scanners)
- Store valid keys in an environment variable or KV store (Vercel KV, Cloudflare KV)
- Validate on every SSE connection handshake — reject before any tool execution
- Keys are per-team or per-customer. Revoke individually without affecting others.

**2. HTTPS Only**

Vercel and Cloudflare enforce this by default. Never serve over plain HTTP. Component source code is intellectual property — it must be encrypted in transit.

**3. Rate Limiting**

Prevent abuse and runaway AI agents.

| Limit | Value |
|---|---|
| Connections per key | 5 concurrent |
| Requests per minute per key | 60 |
| `get_design_system` | 5/min (it's large) |
| `get_component` | 30/min |

Implement with Vercel's built-in rate limiting or Cloudflare's rate limiting rules.

**4. Read-Only**

The MCP server only reads files. It never writes, deletes, or modifies anything. There are no tools that accept file paths as input (prevents path traversal). Component names are validated against a hardcoded allowlist (the component index).

**5. No Secrets in Responses**

The server reads `.tsx` and `.css` files only. It never reads:
- `.env` / `.env.local`
- `node_modules/`
- `.git/`
- Any file outside the component directories

Enforce with an explicit allowlist of directories the server can read from:
```
ALLOWED_PATHS = [
  "src/components/ui/",
  "src/components/workflow/",
  "src/components/ai-elements/",
  "src/app/globals.css",
  "src/lib/icons.ts",
  "src/lib/utils.ts"
]
```

### Nice-to-Have (add later)

- **Audit logging** — log which API key accessed which component and when. Useful for understanding usage patterns.
- **IP allowlisting** — restrict to known office/VPN IPs if you want tighter control.
- **Key scoping** — some keys can only access `ui/` components, not `workflow/` or `ai-elements/`.
- **Response signing** — sign MCP responses so the client can verify they haven't been tampered with.

---

## Keeping MCP and Storybook in Sync

They read from the same directory. There is nothing to sync.

```
src/components/ui/button.tsx
  │
  ├── Storybook: imports it via button.stories.tsx → renders visual preview
  │
  └── MCP: reads the file content → returns source code string
```

When you edit `button.tsx`:
- Storybook hot-reloads (dev mode) or rebuilds (CI)
- MCP serves the updated file on next request (reads at request time, no cache)

### Local MCP (stdio)

Both Storybook and MCP read from `src/components/` on your machine. Always in sync. Nothing to do.

### Remote Hosted MCP

The remote server needs access to the latest component files. Options:

| Strategy | How it works |
|---|---|
| **Monorepo (recommended)** | MCP server lives in the same repo as the components. Single deploy pipeline. Push to `main` → both Storybook and MCP deploy from the same commit. |
| **Git submodule** | The MCP server repo includes `ploy/src/components` as a submodule. CI pulls latest on deploy. |
| **CI copy** | On push to `main`, CI copies component files to the MCP server's deploy directory and redeploys. |
| **Read from GitHub API** | MCP server fetches files from GitHub at request time (slow, but always current). Cache with short TTL. |

---

## Component Index

The MCP server needs to know which components exist, their descriptions, and dependencies. This is a manually maintained file (the only manual part).

**`ploy-registry/src/component-index.ts`:**

```ts
export const componentIndex = [
  // UI Components
  { name: "accordion", category: "ui", description: "Expandable content sections", dependencies: [] },
  { name: "alert", category: "ui", description: "Status alert with variant styles", dependencies: ["icon"] },
  { name: "avatar", category: "ui", description: "User avatar with image or fallback initials", dependencies: [] },
  { name: "badge", category: "ui", description: "Small status label with color variants", dependencies: [] },
  { name: "button", category: "ui", description: "Primary action button with variant and size props", dependencies: [] },
  { name: "button-group", category: "ui", description: "Group of related buttons with shared styling", dependencies: ["button"] },
  { name: "card", category: "ui", description: "Container with header, content, footer sections", dependencies: [] },
  { name: "carousel", category: "ui", description: "Horizontal scrolling content carousel", dependencies: ["button", "icon"] },
  { name: "collapsible", category: "ui", description: "Toggle visibility of a content section", dependencies: [] },
  { name: "command", category: "ui", description: "Command palette / search input with results", dependencies: ["dialog", "icon"] },
  { name: "dialog", category: "ui", description: "Modal dialog overlay", dependencies: [] },
  { name: "dropdown-menu", category: "ui", description: "Contextual menu triggered by a button", dependencies: ["icon"] },
  { name: "hover-card", category: "ui", description: "Card that appears on hover", dependencies: [] },
  { name: "icon", category: "ui", description: "Hugeicons wrapper with size variants (xs/sm/md/lg)", dependencies: [] },
  { name: "info-row", category: "ui", description: "Label-value row for detail displays", dependencies: [] },
  { name: "input", category: "ui", description: "Text input field", dependencies: [] },
  { name: "input-group", category: "ui", description: "Input with optional prefix/suffix elements", dependencies: ["input"] },
  { name: "label", category: "ui", description: "Form field label", dependencies: [] },
  { name: "popover", category: "ui", description: "Floating content panel anchored to a trigger", dependencies: [] },
  { name: "progress", category: "ui", description: "Progress bar with value indication", dependencies: [] },
  { name: "provider-icon", category: "ui", description: "Third-party service provider icon", dependencies: [] },
  { name: "scroll-area", category: "ui", description: "Custom scrollbar container", dependencies: [] },
  { name: "section-header", category: "ui", description: "Section title with optional action", dependencies: [] },
  { name: "select", category: "ui", description: "Dropdown select input", dependencies: ["icon"] },
  { name: "separator", category: "ui", description: "Visual divider line", dependencies: [] },
  { name: "sheet", category: "ui", description: "Slide-out panel from edge of screen", dependencies: [] },
  { name: "source-info", category: "ui", description: "Data source attribution display", dependencies: [] },
  { name: "spinner", category: "ui", description: "Loading spinner animation", dependencies: [] },
  { name: "switch", category: "ui", description: "Toggle switch for boolean values", dependencies: [] },
  { name: "tabs", category: "ui", description: "Tabbed content navigation", dependencies: [] },
  { name: "textarea", category: "ui", description: "Multi-line text input", dependencies: [] },
  { name: "toggle", category: "ui", description: "Toggle button with pressed state", dependencies: [] },
  { name: "toggle-group", category: "ui", description: "Group of mutually exclusive toggles", dependencies: ["toggle"] },
  { name: "tooltip", category: "ui", description: "Hover tooltip with text content", dependencies: [] },

  // Workflow Components
  { name: "action-grid", category: "workflow", description: "Grid of available workflow actions to add", dependencies: ["card", "icon"] },
  { name: "action-node", category: "workflow", description: "Workflow action node for React Flow canvas", dependencies: ["card", "badge", "icon"] },
  { name: "canvas-controls", category: "workflow", description: "Zoom in/out/fit controls for the canvas", dependencies: ["button", "icon", "tooltip"] },
  { name: "config-panel-sidebar", category: "workflow", description: "Right sidebar config panel (Sheet on mobile)", dependencies: ["sheet", "tabs"] },
  { name: "left-sidebar", category: "workflow", description: "Workspace navigation sidebar (Sheet on mobile)", dependencies: ["sheet", "button", "icon"] },
  { name: "logs-panel", category: "workflow", description: "Bottom logs panel (Sheet on mobile)", dependencies: ["sheet", "badge"] },
  { name: "node-config-panel", category: "workflow", description: "Node editor with copilot, toolbar, and editor tabs", dependencies: ["tabs", "button", "icon"] },
  { name: "node-hover-toolbar", category: "workflow", description: "Floating toolbar on node hover", dependencies: ["button", "icon", "tooltip"] },
  { name: "trigger-node", category: "workflow", description: "Workflow trigger node for React Flow canvas", dependencies: ["card", "badge", "icon"] },
  { name: "usage-indicator", category: "workflow", description: "Usage metrics display with progress", dependencies: ["progress"] },
  { name: "workflow-canvas", category: "workflow", description: "React Flow canvas wrapper with touch support", dependencies: ["trigger-node", "action-node"] },
  { name: "workflow-header", category: "workflow", description: "Top header bar with branding and actions", dependencies: ["button", "icon"] },
  { name: "workflow-toolbar", category: "workflow", description: "Main toolbar for workflow actions", dependencies: ["button", "icon", "tooltip"] },

  // AI Elements (subset — add more as needed)
  { name: "ai-node", category: "ai-elements", description: "React Flow node wrapper for AI canvas", dependencies: [] },
  { name: "ai-edge", category: "ai-elements", description: "React Flow edge wrapper for AI canvas", dependencies: [] },
  { name: "ai-canvas", category: "ai-elements", description: "AI rendering canvas/preview", dependencies: ["ai-node", "ai-edge"] },
  { name: "checkpoint", category: "ai-elements", description: "AI workflow checkpoint marker", dependencies: ["badge"] },
  { name: "code-block", category: "ai-elements", description: "Syntax-highlighted code block", dependencies: [] },
  { name: "confirmation", category: "ai-elements", description: "AI action confirmation dialog", dependencies: ["button", "card"] },
  { name: "file-tree", category: "ai-elements", description: "File/folder tree navigator", dependencies: ["icon"] },
  { name: "inline-citation", category: "ai-elements", description: "Inline source citation marker", dependencies: [] },
  { name: "model-selector", category: "ai-elements", description: "AI model picker dropdown", dependencies: ["select"] },
  { name: "sources", category: "ai-elements", description: "Source references list", dependencies: ["inline-citation"] },
  { name: "stack-trace", category: "ai-elements", description: "Error stack trace display", dependencies: ["code-block"] },
  { name: "tool", category: "ai-elements", description: "AI tool invocation display", dependencies: ["badge", "icon"] },
] as const
```

This index is the only thing you maintain manually. Everything else is read from the actual source files.

---

## Implementation Steps

### Phase 1: In-App MCP Server (Vercel API Route + Streamable HTTP)

The MCP server lives inside the existing Next.js app as an API route — no separate repo or service.

**Project structure:**
```
src/
├── app/
│   └── api/
│       └── mcp/
│           └── route.ts              ← MCP handler (Streamable HTTP)
├── lib/
│   └── mcp/
│       ├── component-index.ts        ← component metadata (names, descriptions, deps)
│       ├── rules.ts                  ← design system rules string
│       └── tools/
│           ├── get-design-system.ts  ← returns globals.css + icons.ts + rules + font setup
│           ├── list-components.ts    ← returns component index JSON
│           ├── get-component.ts      ← reads .tsx + .stories.tsx from disk
│           └── search-components.ts  ← fuzzy search via fuse.js
```

**Steps:**

1. **Install dependencies:** `mcp-handler`, `fuse.js`
2. **Write the component index** (`component-index.ts`) — metadata for all components
3. **Write the design system rules** (`rules.ts`) — constraints for AI agents
4. **Write the 4 MCP tools:**
   - `get_design_system` — reads `globals.css`, `icons.ts`, returns tokens + rules + font setup (Fontshare CDN)
   - `list_components` — returns the component index as JSON
   - `get_component` — reads `.tsx` + `.stories.tsx` from `src/components/` via `fs.readFileSync`
   - `search_components` — fuzzy search via `fuse.js` across names and descriptions
5. **Create the API route** (`src/app/api/mcp/route.ts`) using `mcp-handler`
6. **Add CORS headers** in `next.config.ts` — allow all origins for now
7. **Add basic rate limiting** — in-memory counter or `@upstash/ratelimit`
8. **Add `.mcp.json`** for local stdio transport (dev use)
9. **Deploy:** `vercel deploy --prod` → endpoint at `https://ploy.dev/api/mcp`
10. **Test:** connect an AI agent, ask it to build a page using only Ploy components

### Phase 2: Safety & Polish

11. **Add auth** — wrap with `withMcpAuth()` from `mcp-handler` (bearer tokens)
12. **Audit logging** — track which tools are called and how often
13. **Storybook URL linking** — include Storybook docs URLs in `get_component` responses
14. **Key management** — issue/revoke API keys via environment variables or KV

---

## Transport: Streamable HTTP (SSE is Deprecated)

The MCP spec deprecated SSE in March 2025. Streamable HTTP is the standard:
- Single endpoint (`/api/mcp`) handles POST (tool calls), GET (notifications), DELETE (session end)
- Stateless request/response — perfect for serverless
- Standard CORS works naturally
- `mcp-handler` (Vercel's official package) handles the protocol layer

Do NOT use SSE transport for new projects.

---

## Fonts: Fontshare CDN (No Self-Hosting Needed)

Clash Grotesk is from Fontshare (Indian Type Foundry). Their license is free for commercial use, self-hosting permitted, no attribution required.

**For the MCP `get_design_system` response**, include Fontshare CDN instructions:
```html
<link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap" rel="stylesheet">
```

**For our own app**, serve from `public/fonts/` (same-origin, no CORS issues, Vercel edge CDN).

No need for Cloudflare R2 or separate font hosting infrastructure.

---

## Why Vercel (Not Cloudflare Workers, Railway, or Fly.io)

| Factor | Vercel | Cloudflare Workers | Railway / Fly.io |
|---|---|---|---|
| **Filesystem access** | Yes (reads from deployment) | No (must use KV/R2) | Yes (container) |
| **MCP SDK** | `mcp-handler` (official) | `agents/mcp` (official) | Manual setup |
| **Free tier** | 1M invocations/month | 100K req/day (10ms CPU) | $5 one-time / no free |
| **Same repo** | Yes (API route) | Separate project | Separate project |
| **Auth (add later)** | `withMcpAuth()` one-liner | OAuth provider library | Manual |
| **Deploy** | Automatic on push | `wrangler deploy` | `railway up` / `fly deploy` |

Vercel wins because: same repo, filesystem access (critical for reading `.tsx` files), official `mcp-handler` package, and the free tier is generous for a read-only registry.

---

## Tech Stack for the MCP Server

| Dependency | Purpose |
|---|---|
| `mcp-handler` | Vercel MCP protocol handler (Streamable HTTP) |
| `@modelcontextprotocol/sdk` | MCP types and server primitives (peer dep of mcp-handler) |
| `fuse.js` | Fuzzy search for `search_components` |
| `zod` | Input validation for tool parameters |

That's it. The server is intentionally minimal — it reads files and returns strings.

---

## Example: What an AI Agent Sees

**Agent calls `get_design_system()`:**

```json
{
  "tokens": "/* Full globals.css content — 523 lines of OKLCH tokens, semantic colors, typography, motion, shadows, layout, z-index */",
  "icons": "/* Full icons.ts — 70+ icon mappings */",
  "utilities": "/* cn() utility from utils.ts */",
  "font_setup": {
    "instructions": "Add this link tag to your HTML head. Fonts served from Fontshare CDN — do not self-host.",
    "link_tag": "<link href=\"https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap\" rel=\"stylesheet\">",
    "css_variable": "--font-clash-grotesk: 'Clash Grotesk', sans-serif;",
    "code_font": "Geist Mono — install via next/font/google or use: font-family: 'Geist Mono', monospace;"
  },
  "rules": "# Ploy Design System Rules\n\n## Components\n- ONLY use components from this registry...",
  "npm_dependencies": {
    "required": ["@hugeicons/react", "@hugeicons/core-free-icons", "class-variance-authority", "@radix-ui/react-slot"],
    "optional": ["@xyflow/react", "zustand", "motion"]
  }
}
```

**Agent calls `get_component("button")`:**

```json
{
  "name": "button",
  "category": "ui",
  "source": "import * as React from \"react\"\nimport { Slot } from \"@radix-ui/react-slot\"\nimport { cva, type VariantProps } from \"class-variance-authority\"\nimport { cn } from \"@/lib/utils\"\n\nconst buttonVariants = cva(\n  \"inline-flex items-center justify-center ...\",\n  {\n    variants: {\n      variant: {\n        default: \"bg-primary text-primary-foreground ...\",\n        ...\n      },\n      size: { sm: \"...\", default: \"...\", lg: \"...\" }\n    }\n  }\n)\n\nexport function Button({ className, variant, size, asChild, ...props }) {\n  ...\n}\n",
  "story_source": "/* Full button.stories.tsx — all variants and usage examples */",
  "install_path": "src/components/ui/button.tsx",
  "check_before_install": "Check if src/components/ui/button.tsx already exists in the user's project. If it does, skip — just import and use it.",
  "dependencies": [],
  "npm_dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "storybook_url": "https://storybook.ploy.dev/?path=/docs/ui-button"
}
```

The AI now has the real component, knows where to install it, and knows to check first. It will use `<Button variant="outline">` not invent its own.
