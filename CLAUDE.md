# Ploy — AI-Native Marketing Platform Prototype

## Project Overview
A prototype for Ploy, an AI-native marketing platform that combines brand, website, and multi-channel growth into a single visual workflow builder. Built on top of a React Flow canvas with a polished design system.

## Tech Stack
- **Framework:** Next.js 16.x (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x with OKLCH design tokens
- **Components:** shadcn/ui (via CLI)
- **Workflow Canvas:** @xyflow/react (React Flow v12+)
- **State Management:** Zustand
- **Auto-Layout:** Dagre
- **Animation:** Motion (Framer Motion)
- **Icons:** Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`)
- **Dark Mode:** next-themes
- **Variants:** class-variance-authority (cva)
- **Notifications:** Sonner

## Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main workflow editor page
│   └── globals.css               # Design tokens, glass utilities, motion tokens
├── components/
│   ├── ui/                       # shadcn/ui primitives (all use Hugeicons)
│   ├── ai-elements/              # Reusable AI component library (canvas, node, edge)
│   ├── workflow/                  # Workflow-specific components
│   │   ├── workflow-canvas.tsx    # React Flow wrapper with touch support
│   │   ├── workflow-header.tsx    # Header with branding
│   │   ├── left-sidebar.tsx      # Workspace sidebar (Sheet on mobile)
│   │   ├── config-panel-sidebar.tsx # Config panel (Sheet on mobile)
│   │   ├── logs-panel.tsx        # Logs panel (bottom Sheet on mobile)
│   │   ├── node-config-panel.tsx  # Copilot, toolbar, and editor tabs
│   │   ├── node-hover-toolbar.tsx # Node actions toolbar
│   │   ├── nodes/                 # Custom node types (trigger, action)
│   │   └── canvas-controls.tsx    # Zoom in/out/fit controls
│   └── theme-toggle.tsx           # Light/dark mode toggle
├── stores/
│   └── workflow-store.ts          # Zustand (nodes, edges, history, panel state)
├── hooks/
│   └── use-is-mobile.ts          # SSR-safe mobile breakpoint hook
├── lib/
│   ├── icons.ts                   # Icon registry (Hugeicons, single source of truth)
│   ├── utils.ts                   # cn() utility
│   ├── providers.ts               # Provider registry (Brandfetch domains, fallback icons)
│   ├── mcp/                       # MCP server data layer
│   │   ├── component-index.ts     # Component metadata (names, descriptions, deps)
│   │   ├── rules.ts               # Design system rules for AI agents
│   │   └── tools/                 # MCP tool implementations
│   │       ├── get-design-system.ts  # Returns tokens, icons, rules, setup info
│   │       ├── list-components.ts    # Returns component index
│   │       ├── get-component.ts      # Returns component source code
│   │       ├── get-shared-files.ts   # Returns stores, hooks, types, utilities
│   │       └── search-components.ts  # Fuzzy search via fuse.js
│   └── workflow/                  # Types, constants, helpers
```

## MCP Server
The Ploy Design System MCP server is served as a Next.js API route at `/api/mcp`.
- **Endpoint:** `https://useploy.vercel.app/api/mcp` (Streamable HTTP transport)
- **5 tools:** `get_design_system`, `list_components`, `get_component`, `search_components`, `get_shared_files`
- **Reads from disk** at request time — no build step, no sync needed
- **Docs:** `docs/PLOY-MCP-REGISTRY.md`

## Coding Conventions

### File Naming
- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Types/interfaces: `PascalCase`

### Import Alias
- `@/*` maps to `src/*`

### Component Rules
- **Server Components by default** — no `'use client'` unless needed for interactivity
- **`'use client'` boundary as low as possible** — keep it on leaf components
- React Flow components MUST be `'use client'` and wrapped in `<ReactFlowProvider>`
- Composition over inheritance (Card/CardHeader/CardBody pattern)
- Use `React.memo` for pure components to prevent unnecessary re-renders

### State Management
- Zustand for workflow state (nodes, edges, selection, undo/redo)
- Never mutate state — always create new copies (spread, .map(), etc.)
- Custom hooks to encapsulate store access patterns

### Styling Rules
- **Never use raw Tailwind colors** (e.g., `bg-blue-500`) — always semantic tokens (`bg-primary`, `bg-muted`)
- Use CSS variables for all design tokens
- Use `cn()` utility for conditional class merging
- Use `cva()` for component variants

### Icons
- **Single icon family:** Hugeicons only — never import from `lucide-react`
- All icons are registered in `src/lib/icons.ts` (single source of truth)
- Custom components use `<Icon name="..." size="sm" />` from `src/components/ui/icon.tsx`
- shadcn/ui primitives use `<HugeiconsIcon icon={icons["..."]} />` directly
- To add a new icon: import from `@hugeicons/core-free-icons` in `icons.ts`, add to the `icons` map

### Code Quality
- Functions < 50 lines
- Files < 400 lines (800 max)
- No deep nesting (> 4 levels)
- No hardcoded values — use constants or tokens

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Never commit secrets or .env files

## Quick Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```
