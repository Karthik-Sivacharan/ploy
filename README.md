# Ploy

**AI-native marketing platform** — brand, website, and multi-channel growth from one visual canvas.

Ploy collapses the 10-15 tools a marketing team juggles into a single workflow builder. Connect your brand assets, voice guidelines, and CRM audience — an AI agent generates a complete multi-channel campaign (landing page, email drip, Instagram ads, push notifications) all on-brand, from one canvas.

**Live demo:** [useploy.vercel.app](https://useploy.vercel.app)

---

## The Prototype

The current prototype tells the story of a **Peloton Summer Launch** campaign through 8 connected nodes on a visual canvas:

```
[Brand Assets]  ────────┐
  (Frontify)            |
                        |
[Brand Voice]  ─────────+──>  [AI Campaign Agent]  ──+──>  [Landing Page]      (Webflow)
  (Notion)              |      (Claude Opus)         |
                        |                            +──>  [Email Sequence]    (Mailchimp)
[Target Audience] ──────┘                            |
  (HubSpot)                                          +──>  [Instagram Ads]     (Meta)
                                                     |
                                                     +──>  [Push Notification] (OneSignal)
```

### Input Nodes (left)
- **Brand Assets** — Color swatches, typography, and logo from Frontify
- **Brand Voice** — Tone guidelines with Lexical rich-text editor from Notion
- **Target Audience** — HubSpot segment with 12,847 contacts, filter pills, dynamic list

### Center Node
- **AI Campaign Agent** — Claude Opus-powered brief with model selector, connected sources, and channel output pills

### Output Nodes (right)
- **Landing Page** — Webflow page preview with screenshot, slug, and staging URL
- **Email Sequence** — 3-email Mailchimp drip (Day 1/3/7) with recipient count
- **Instagram Ads** — Gemini 2.0 Flash-powered ad creative with targeting and budget
- **Push Notification** — OneSignal mobile push mockup with delivery progress bar

Every node has a **compact canvas view** and an **expanded sidebar editor** when clicked.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 with OKLCH design tokens |
| Components | shadcn/ui |
| Canvas | React Flow (@xyflow/react v12) |
| State | Zustand |
| Auto-layout | Dagre |
| Icons | Hugeicons |
| Animation | Motion (Framer Motion) |
| Rich Text | Lexical (shadcn-editor) |
| Dark Mode | next-themes |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── ai-elements/              # Canvas, Node, Edge, ModelSelector
│   ├── workflow/
│   │   ├── nodes/                # Trigger + Action node renderers
│   │   ├── node-bodies/          # 8 visual body components
│   │   ├── workflow-canvas.tsx   # React Flow wrapper
│   │   ├── node-config-panel.tsx # Sidebar editor (Copilot/Toolbar/Editor tabs)
│   │   └── canvas-controls.tsx   # Zoom + layout controls
│   └── editor/                   # Lexical rich-text editor
├── stores/
│   └── workflow-store.ts         # Zustand store (nodes, edges, history)
└── lib/
    ├── providers.ts              # Provider branding registry
    ├── icons.ts                  # Hugeicons registry
    └── workflow/
        ├── types.ts              # Node/edge type definitions
        ├── layout.ts             # Dagre auto-layout
        └── constants.ts          # Action groups
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run storybook    # Storybook dev server (localhost:6006)
npm run build-storybook  # Build static Storybook
```

---

## Storybook & Chromatic

Visual component catalog covering all design system tokens, UI primitives, workflow nodes, and page compositions.

### Run Storybook locally

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

### Build static Storybook

```bash
npm run build-storybook
```

Output goes to `storybook-static/` (gitignored).

### Chromatic (Visual Testing & Auto-Publishing)

Chromatic publishes Storybook on every push via GitHub Actions, giving the team a shareable URL with visual diffs.

**Setup (one-time):**

1. Sign up at [chromatic.com/start](https://www.chromatic.com/start) with your GitHub account
2. Select the `ploy` repository
3. Copy the `CHROMATIC_PROJECT_TOKEN`
4. Add it as a GitHub Actions secret:
   - Go to **Settings > Secrets and variables > Actions** in the GitHub repo
   - Click **New repository secret**
   - Name: `CHROMATIC_PROJECT_TOKEN`, Value: paste the token

**Manual publish:**

```bash
npx chromatic --project-token=<your-token>
```

The `.github/workflows/chromatic.yml` workflow handles CI — it runs automatically on every push.

---

## Design Decisions

- **All static data** — No real API calls. Content is pre-filled to tell the Peloton campaign story.
- **Design tokens only** — No hardcoded colors. Everything uses semantic tokens (`text-foreground`, `bg-muted`, `border-border-subtle`).
- **Hugeicons only** — Single icon family across the entire app. Registered in `lib/icons.ts`.
- **Provider logos via Brandfetch** — Real brand logos fetched from CDN, with Hugeicons fallbacks.
- **Model badges via models.dev** — AI model logos (Anthropic, Google, OpenAI) from the models.dev CDN.
- **Per-node height layout** — Dagre auto-layout with height overrides per node type to prevent overlap.

---

## License

Private — not open source.
