# Storybook + Chromatic Setup Plan for Ploy

## Overview

Set up Storybook as a full visual component catalog for the Ploy design system and MVP, with Chromatic for auto-publishing on every push. The team gets a shareable URL showing every component with all variants, updated automatically from GitHub.

**Scope:** 67 stories covering all 110+ components — design tokens, atoms, molecules, organisms (nodes, workflow UI, AI elements), full page compositions, and utilities.

## Prerequisites

- Node.js 20+
- Next.js 16.x (App Router) — already in place
- Tailwind CSS 4.x with OKLCH tokens in `globals.css` — already in place
- GitHub repo at `github.com/Karthik-Sivacharan/ploy.git`

---

## Phase 1: Install Storybook

### Step 1.1: Run the installer

```bash
cd app
npm create storybook@latest
```

When prompted:
- **Framework**: Pick `@storybook/nextjs-vite` (Vite-based, faster than Webpack)
- **Onboarding**: Pick "Minimal" (no example stories — we'll write our own)

This creates:
- `.storybook/main.ts` — framework config
- `.storybook/preview.ts` — global styles/decorators
- `package.json` scripts: `storybook` (dev) and `build-storybook` (production)

### Step 1.2: Import design tokens

Edit `.storybook/preview.ts` to import the global CSS:

```ts
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
```

This gives every story access to:
- All OKLCH semantic color tokens (primary, destructive, success, warning, etc.)
- Glass surface tokens (surface-translucent, border-glass, etc.)
- Motion tokens (duration-fast, ease-out, etc.)
- Typography scale (caption 9px through heading-xl 32px) in Clash Grotesk
- Icon size tokens (xs 14px, sm 16px, md 20px, lg 24px)
- Layout tokens (sidebar width, config panel width, header height, etc.)
- Z-index scale, focus ring, radius scale
- Tailwind utilities + shadcn/ui styles
- Dark mode via `.dark` class

### Step 1.3: Verify it runs

```bash
npm run storybook
```

Should open at `http://localhost:6006`. Expect an empty sidebar (no stories yet).

### Step 1.4: Delete example stories

Remove any auto-generated story files (usually in `src/stories/`).

---

## Phase 2: Dark Mode Support

### Step 2.1: Install the themes addon

```bash
npm install --save-dev @storybook/addon-themes
```

### Step 2.2: Register it

In `.storybook/main.ts`, add to addons:

```ts
addons: [
  // ... existing addons
  "@storybook/addon-themes",
],
```

### Step 2.3: Configure the dark mode toggle

In `.storybook/preview.ts`, add the decorator:

```ts
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
```

This adds a theme toggle in the Storybook toolbar. Selecting "dark" applies the `.dark` class, which activates all dark mode token overrides from `globals.css`.

---

## Phase 3: Mock Decorators

Organisms and page-level stories depend on React Flow context and Zustand state. Set up shared decorators before writing stories.

### Step 3.1: React Flow Decorator

Required for all node, edge, and canvas stories.

Create `.storybook/decorators/react-flow-decorator.tsx`:

```tsx
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export const ReactFlowDecorator = (Story: React.ComponentType) => (
  <ReactFlowProvider>
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <Story />
    </div>
  </ReactFlowProvider>
);
```

### Step 3.2: Zustand Store Decorator

Required for workflow components that read from `useWorkflowStore` (sidebars, config panel, logs panel, header).

Create `.storybook/decorators/store-decorator.tsx`:

```tsx
import { useEffect } from "react";
import { useWorkflowStore } from "@/stores/workflow-store";

// Pre-populate with mock data so panels have content to render
export const StoreDecorator = (Story: React.ComponentType) => {
  useEffect(() => {
    // Reset store to a known state with sample nodes/edges
    // Implementation: call useWorkflowStore.setState({ ... }) with mock data
  }, []);

  return <Story />;
};
```

### Step 3.3: Combined Decorator for Full Canvas Stories

```tsx
export const FullCanvasDecorator = (Story: React.ComponentType) => (
  <ReactFlowProvider>
    <StoreDecorator>
      <div style={{ width: "100%", height: "700px" }}>
        <Story />
      </div>
    </StoreDecorator>
  </ReactFlowProvider>
);
```

---

## Phase 4: Write Stories

### Story file convention

Place stories next to their components:

```
src/components/ui/button.tsx
src/components/ui/button.stories.tsx    <- story file
```

For design token stories (no matching component file), place in a dedicated folder:

```
src/stories/tokens/colors.stories.tsx
src/stories/tokens/surfaces.stories.tsx
```

### Story format (CSF)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name";

const meta = {
  title: "Category/ComponentName",  // controls sidebar placement
  component: ComponentName,
  tags: ["autodocs"],  // auto-generates docs page with props table
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* default props */ },
};
```

### Sidebar Taxonomy

Every story uses a `title` field that maps to the sidebar tree:

```
Design Tokens/Colors
Design Tokens/Surfaces
Design Tokens/Shadows
Design Tokens/Motion
Design Tokens/Typography
Atoms/Button
Atoms/Badge
Atoms/Icon
...
Molecules/ButtonGroup
Molecules/InputGroup
...
Organisms/Nodes/Base Node
Organisms/Nodes/Trigger Node
Organisms/Node Bodies/Brand Assets
Organisms/Node Bodies/AI Campaign
Organisms/Workflow/Toolbar
Organisms/Workflow/Canvas Controls
Organisms/AI Elements/Animated Edge
Organisms/AI Elements/Model Selector
...
Pages/Left Sidebar
Pages/Config Panel
Pages/Workflow Header
Pages/Full Canvas
Utilities/Theme Toggle
Utilities/Provider Registry
```

---

### Tier 1: Design Tokens (5 stories)

No component file — pure visual documentation of `globals.css` tokens.

| # | Story | Title | What to show |
|---|-------|-------|-------------|
| 1 | ColorTokens | `Design Tokens/Colors` | Swatches of all semantic OKLCH colors: primary, secondary, muted, accent, destructive, success, warning — light + dark |
| 2 | SurfaceTokens | `Design Tokens/Surfaces` | Glass surfaces: surface-translucent, surface-inset, surface-overlay, border-glass, border-subtle |
| 3 | ShadowTokens | `Design Tokens/Shadows` | All shadow tiers side by side: shadow-glass, shadow-elevated, shadow-glow-blue, shadow-glow-green, shadow-glow-ploy |
| 4 | MotionTokens | `Design Tokens/Motion` | Animated boxes showing 6 durations (instant/fast/normal/panel/moderate/slow) x 4 easing curves (ease-out/ease-out-expo/ease-in-out/ease-hover) |
| 5 | TypographyTokens | `Design Tokens/Typography` | Full type scale: caption (9px), badge (10px), detail (11px), body-sm (13px), body (14px), body-lg (16px), heading-sm (18px), heading (20px), heading-lg (24px), heading-xl (32px) in Clash Grotesk |

Location: `src/stories/tokens/`

---

### Tier 2: Atoms (24 stories)

Smallest building blocks from `src/components/ui/`. No workflow store or React Flow dependency.

#### Form Controls

| # | Component | File | Title | Variants / What to show |
|---|-----------|------|-------|------------------------|
| 6 | Button | `button.stories.tsx` | `Atoms/Button` | 6 variants (default, outline, secondary, ghost, destructive, link) x 8 sizes (default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg), with icon, disabled, AllVariants grid |
| 7 | Input | `input.stories.tsx` | `Atoms/Input` | Default, disabled, with placeholder, error state |
| 8 | Textarea | `textarea.stories.tsx` | `Atoms/Textarea` | Default, auto-sizing (field-sizing-content), disabled |
| 9 | Label | `label.stories.tsx` | `Atoms/Label` | With input, required indicator |
| 10 | Switch | `switch.stories.tsx` | `Atoms/Switch` | On/off, size default/sm, disabled |
| 11 | Toggle | `toggle.stories.tsx` | `Atoms/Toggle` | variant default/outline, size default/sm/lg, pressed state |
| 12 | Select | `select.stories.tsx` | `Atoms/Select` | Default with options, groups, scroll buttons, disabled |

#### Display & Feedback

| # | Component | File | Title | Variants / What to show |
|---|-----------|------|-------|------------------------|
| 13 | Badge | `badge.stories.tsx` | `Atoms/Badge` | 6 variants: default, secondary, destructive, outline, ghost, link |
| 14 | Icon | `icon.stories.tsx` | `Atoms/Icon` | Full 70+ icon grid from registry with names, 4 sizes (xs/sm/md/lg) |
| 15 | Spinner | `spinner.stories.tsx` | `Atoms/Spinner` | Loading animation |
| 16 | Progress | `progress.stories.tsx` | `Atoms/Progress` | 0%, 50%, 100%, with ProgressLabel/ProgressValue |
| 17 | Alert | `alert.stories.tsx` | `Atoms/Alert` | variant default/destructive, with AlertTitle/Description/Action |
| 18 | Avatar | `avatar.stories.tsx` | `Atoms/Avatar` | size default/sm/lg, with Image, Fallback, Badge, AvatarGroup with Count |
| 19 | Separator | `separator.stories.tsx` | `Atoms/Separator` | Horizontal, vertical |

#### Layout & Containers

| # | Component | File | Title | Variants / What to show |
|---|-----------|------|-------|------------------------|
| 20 | Card | `card.stories.tsx` | `Atoms/Card` | size default/sm, Card/CardHeader/CardTitle/CardDescription/CardAction/CardContent/CardFooter composition |
| 21 | Tabs | `tabs.stories.tsx` | `Atoms/Tabs` | variant default/line, multiple tab panels |
| 22 | Accordion | `accordion.stories.tsx` | `Atoms/Accordion` | Single item, multiple items, with auto chevron icon |

#### Overlays & Popovers

| # | Component | File | Title | Variants / What to show |
|---|-----------|------|-------|------------------------|
| 23 | Tooltip | `tooltip.stories.tsx` | `Atoms/Tooltip` | Basic with button trigger, positioning options |
| 24 | Popover | `popover.stories.tsx` | `Atoms/Popover` | With Header/Title/Description, positioning |
| 25 | HoverCard | `hover-card.stories.tsx` | `Atoms/HoverCard` | Preview content on hover |
| 26 | Dialog | `dialog.stories.tsx` | `Atoms/Dialog` | With Header/Footer/Title/Description, overlay, close button |
| 27 | Sheet | `sheet.stories.tsx` | `Atoms/Sheet` | 4 sides (top/right/bottom/left), with Header/Footer/Title/Description |
| 28 | DropdownMenu | `dropdown-menu.stories.tsx` | `Atoms/DropdownMenu` | Groups, items, checkbox items, radio items, separators, shortcuts |
| 29 | Command | `command.stories.tsx` | `Atoms/Command` | CommandDialog, search input, groups, items, separators, shortcuts |

Location: `src/components/ui/` (co-located with component files)

---

### Tier 3: Molecules (7 stories)

Composed from atoms. Still no workflow store or React Flow dependency.

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 30 | ButtonGroup | `button-group.stories.tsx` | `Molecules/ButtonGroup` | Horizontal/vertical orientation, with Separator, ButtonGroupText |
| 31 | InputGroup | `input-group.stories.tsx` | `Molecules/InputGroup` | Input + Addon + Button combos, with icon prefix |
| 32 | ToggleGroup | `toggle-group.stories.tsx` | `Molecules/ToggleGroup` | Horizontal/vertical, spacing prop, variant default/outline |
| 33 | ScrollArea | `scroll-area.stories.tsx` | `Molecules/ScrollArea` | Vertical scrollbar, horizontal scrollbar, both |
| 34 | Collapsible | `collapsible.stories.tsx` | `Molecules/Collapsible` | Open/closed states, with trigger and content |
| 35 | Carousel | `carousel.stories.tsx` | `Molecules/Carousel` | Horizontal/vertical orientation, with Previous/Next buttons |
| 36 | ProviderIcon | `provider-icon.stories.tsx` | `Molecules/ProviderIcon` | Grid of all providers (Notion, Frontify, HubSpot, Gmail, GitHub, Slack, Resend, Stripe, Webflow, Mailchimp, LinkedIn, Meta, OneSignal) with Brandfetch logos and Hugeicons fallback |

Location: `src/components/ui/` (co-located with component files)

---

### Tier 4: Organisms (30 stories)

Complex compositions. These require mock decorators (React Flow and/or Zustand store).

#### 4a. Nodes — Base Components

Require: **React Flow Decorator**

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 37 | Node (base) | `src/components/ai-elements/node.stories.tsx` | `Organisms/Nodes/Base Node` | NodeHeader + NodeTitle + NodeDescription + NodeContent + NodeFields + NodeFieldRow + NodeFooter + NodeStatusBar in all states (idle, running, success, error) |
| 38 | TriggerNode | `src/components/workflow/nodes/trigger-node.stories.tsx` | `Organisms/Nodes/Trigger Node` | Manual trigger, Schedule trigger, Webhook trigger types |
| 39 | ActionNode | `src/components/workflow/nodes/action-node.stories.tsx` | `Organisms/Nodes/Action Node` | Empty shell, with different actionType props |
| 40 | NodeHoverToolbar | `src/components/workflow/node-hover-toolbar.stories.tsx` | `Organisms/Nodes/Hover Toolbar` | Floating toolbar with delete, duplicate actions |

#### 4b. Node Bodies — Domain-Specific Editors

Require: **React Flow Decorator**

Each node body has compact and expanded variants.

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 41 | BrandAssetsBody | `node-bodies/brand-assets-body.stories.tsx` | `Organisms/Node Bodies/Brand Assets` | Frontify brand assets, compact + expanded |
| 42 | BrandVoiceBody | `node-bodies/brand-voice-body.stories.tsx` | `Organisms/Node Bodies/Brand Voice` | Notion brand voice guidelines display |
| 43 | TargetAudienceBody | `node-bodies/target-audience-body.stories.tsx` | `Organisms/Node Bodies/Target Audience` | HubSpot audience segment display |
| 44 | AICampaignBody | `node-bodies/ai-campaign-body.stories.tsx` | `Organisms/Node Bodies/AI Campaign` | Campaign generator with variant support |
| 45 | LandingPageBody | `node-bodies/landing-page-body.stories.tsx` | `Organisms/Node Bodies/Landing Page` | Webflow landing page preview |
| 46 | EmailSequenceBody | `node-bodies/email-sequence-body.stories.tsx` | `Organisms/Node Bodies/Email Sequence` | Mailchimp email campaign display |
| 47 | InstagramAdsBody | `node-bodies/instagram-ads-body.stories.tsx` | `Organisms/Node Bodies/Instagram Ads` | Meta Instagram ad builder |
| 48 | PushNotificationBody | `node-bodies/push-notification-body.stories.tsx` | `Organisms/Node Bodies/Push Notification` | OneSignal push notification UI |
| 49 | BrandVoiceEditor | `node-bodies/brand-voice-editor.stories.tsx` | `Organisms/Node Bodies/Brand Voice Editor` | Rich text Lexical editor |

Location: `src/components/workflow/node-bodies/`

#### 4c. Workflow UI

Require: **Zustand Store Decorator** (and React Flow Decorator for canvas-related ones)

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 50 | WorkflowToolbar | `workflow-toolbar.stories.tsx` | `Organisms/Workflow/Toolbar` | Deploy + Run buttons with tooltips |
| 51 | UsageIndicator | `usage-indicator.stories.tsx` | `Organisms/Workflow/Usage Indicator` | Usage stats display |
| 52 | CanvasControls | `canvas-controls.stories.tsx` | `Organisms/Workflow/Canvas Controls` | Zoom in, zoom out, fit to view buttons |
| 53 | ActionGrid | `action-grid.stories.tsx` | `Organisms/Workflow/Action Grid` | All 6 action groups (System, AI Gateway, GitHub, Slack, Resend, Stripe) with provider icons |
| 54 | LogsPanel | `logs-panel.stories.tsx` | `Organisms/Workflow/Logs Panel` | Execution log entries, expand/collapse |
| 55 | NodeConfigPanel | `node-config-panel.stories.tsx` | `Organisms/Workflow/Config Panel` | Copilot tab, Toolbar tab, Editor tab — with mock selected node |

Location: `src/components/workflow/`

#### 4d. AI Elements

Require: **React Flow Decorator** (for edge/connection stories)

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 56 | AnimatedEdge | `edge.stories.tsx` | `Organisms/AI Elements/Animated Edge` | SVG circle animation along edge path |
| 57 | TemporaryEdge | `edge.stories.tsx` | `Organisms/AI Elements/Temporary Edge` | Dashed connection preview |
| 58 | ConnectionLine | `connection.stories.tsx` | `Organisms/AI Elements/Connection Line` | Drag-to-connect preview line |
| 59 | Checkpoint | `checkpoint.stories.tsx` | `Organisms/AI Elements/Checkpoint` | Workflow checkpoint marker |
| 60 | StackTrace | `stack-trace.stories.tsx` | `Organisms/AI Elements/Stack Trace` | Error stack trace display |
| 61 | ModelSelector | `model-selector.stories.tsx` | `Organisms/AI Elements/Model Selector` | LLM model picker dropdown |
| 62 | FileTree | `file-tree.stories.tsx` | `Organisms/AI Elements/File Tree` | File/folder tree explorer |
| 63 | Sources | `sources.stories.tsx` | `Organisms/AI Elements/Sources` | Citation/source links list |
| 64 | InlineCitation | `inline-citation.stories.tsx` | `Organisms/AI Elements/Inline Citation` | Inline reference marker |
| 65 | Tool | `tool.stories.tsx` | `Organisms/AI Elements/Tool` | Tool invocation display |
| 66 | Confirmation | `confirmation.stories.tsx` | `Organisms/AI Elements/Confirmation` | Yes/no confirmation dialog |

Location: `src/components/ai-elements/`

---

### Tier 5: Pages / Full Compositions (4 stories)

Full assembled views. Require: **React Flow Decorator + Zustand Store Decorator + Theme Decorator** (all three).

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 67 | LeftSidebar | `left-sidebar.stories.tsx` | `Pages/Left Sidebar` | Desktop expanded, desktop collapsed, mobile (Sheet variant) |
| 68 | ConfigPanelSidebar | `config-panel-sidebar.stories.tsx` | `Pages/Config Panel` | Desktop panel with mock selected node, mobile (Sheet variant) |
| 69 | WorkflowHeader | `workflow-header.stories.tsx` | `Pages/Workflow Header` | Full header with toolbar, usage indicator, theme toggle, sidebar toggles |
| 70 | WorkflowCanvas | `workflow-canvas.stories.tsx` | `Pages/Full Canvas` | Complete canvas with pre-populated nodes, edges, and auto-layout |

Location: `src/components/workflow/`

---

### Tier 6: Utilities (2 stories)

| # | Component | File | Title | What to show |
|---|-----------|------|-------|-------------|
| 71 | ThemeToggle | `theme-toggle.stories.tsx` | `Utilities/Theme Toggle` | Sun/moon icon toggle with animation |
| 72 | ProviderRegistry | `src/stories/utilities/providers.stories.tsx` | `Utilities/Provider Registry` | Grid of all providers from `lib/providers.ts` showing name, icon, Brandfetch logo, color scheme |

---

## Phase 5: Story Examples

### Example: Button story (Atom)

```tsx
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Icon } from "./icon";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Button" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Link: Story = {
  args: { variant: "link", children: "Link" },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Icon name="plus" size="xs" />
      Add Item
    </Button>
  ),
};

export const IconOnly: Story = {
  args: { variant: "outline", size: "icon" },
  render: (args) => (
    <Button {...args}>
      <Icon name="settings" size="xs" />
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Icon name="plus" size="xs" /></Button>
      <Button size="icon-xs"><Icon name="plus" size="xs" /></Button>
      <Button size="icon-sm"><Icon name="plus" size="xs" /></Button>
      <Button size="icon-lg"><Icon name="plus" size="sm" /></Button>
    </div>
  ),
};
```

### Example: Icon registry story (Atom)

```tsx
// src/components/ui/icon.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";
import { icons, type IconName } from "@/lib/icons";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "plus", size: "md" },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      {(Object.keys(icons) as Array<IconName>).map((name) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-lg border p-3">
          <Icon name={name} size="md" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-1">
        <Icon name="settings" size="xs" />
        <span className="text-xs text-muted-foreground">xs (14px)</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon name="settings" size="sm" />
        <span className="text-xs text-muted-foreground">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon name="settings" size="md" />
        <span className="text-xs text-muted-foreground">md (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon name="settings" size="lg" />
        <span className="text-xs text-muted-foreground">lg (24px)</span>
      </div>
    </div>
  ),
};
```

### Example: Color tokens story (Design Token)

```tsx
// src/stories/tokens/colors.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design Tokens/Colors",
} satisfies Meta;

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ name, bg, text }: { name: string; bg: string; text?: string }) => (
  <div className="flex items-center gap-3">
    <div className={`h-10 w-10 rounded-lg border ${bg}`} />
    <div>
      <div className="text-sm font-medium">{name}</div>
      {text && <div className={`text-xs ${text}`}>Foreground</div>}
    </div>
  </div>
);

export const SemanticColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <ColorSwatch name="Primary" bg="bg-primary" text="text-primary-foreground" />
      <ColorSwatch name="Secondary" bg="bg-secondary" text="text-secondary-foreground" />
      <ColorSwatch name="Muted" bg="bg-muted" text="text-muted-foreground" />
      <ColorSwatch name="Accent" bg="bg-accent" text="text-accent-foreground" />
      <ColorSwatch name="Destructive" bg="bg-destructive" text="text-destructive-foreground" />
      <ColorSwatch name="Success" bg="bg-success" text="text-success-foreground" />
      <ColorSwatch name="Warning" bg="bg-warning" text="text-warning-foreground" />
    </div>
  ),
};

export const SurfaceColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-border-glass bg-surface-translucent p-4">
        surface-translucent
      </div>
      <div className="rounded-xl bg-surface-inset p-4">
        surface-inset
      </div>
      <div className="rounded-xl bg-surface-overlay p-4">
        surface-overlay
      </div>
    </div>
  ),
};
```

### Example: TriggerNode story (Organism with React Flow Decorator)

```tsx
// src/components/workflow/nodes/trigger-node.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { TriggerNode } from "./trigger-node";
import { ReactFlowDecorator } from "../../../../.storybook/decorators/react-flow-decorator";

const meta = {
  title: "Organisms/Nodes/Trigger Node",
  component: TriggerNode,
  decorators: [ReactFlowDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof TriggerNode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ManualTrigger: Story = {
  args: {
    id: "trigger-1",
    data: {
      label: "Manual Trigger",
      triggerType: "manual",
      description: "Run workflow manually",
    },
  },
};

export const ScheduleTrigger: Story = {
  args: {
    id: "trigger-2",
    data: {
      label: "Schedule",
      triggerType: "schedule",
      description: "Every Monday at 9am",
    },
  },
};

export const WebhookTrigger: Story = {
  args: {
    id: "trigger-3",
    data: {
      label: "Webhook",
      triggerType: "webhook",
      description: "POST /api/trigger",
    },
  },
};
```

---

## Phase 6: Connect Chromatic

### Step 6.1: Sign up

Go to [chromatic.com/start](https://www.chromatic.com/start) and sign in with GitHub. Select the `ploy` repo.

### Step 6.2: Get your project token

Chromatic gives you a `CHROMATIC_PROJECT_TOKEN`. Save it.

### Step 6.3: Install Chromatic

```bash
npm install --save-dev chromatic
```

### Step 6.4: First publish

```bash
npx chromatic --project-token=<your-token>
```

This takes snapshots of all stories and establishes baselines. You get a URL like `https://<hash>-ploy.chromatic.com`.

### Step 6.5: Add the token to GitHub secrets

Go to repo Settings > Secrets and variables > Actions > New repository secret:
- Name: `CHROMATIC_PROJECT_TOKEN`
- Value: the token from step 6.2

---

## Phase 7: Auto-Publish via GitHub Actions

### Step 7.1: Create the workflow

Create `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic

on: push

jobs:
  chromatic:
    name: Publish Storybook
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0  # Chromatic needs full git history

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci
        working-directory: app

      - name: Publish to Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          workingDir: app
```

### Step 7.2: What happens now

- **Every push**: Storybook auto-publishes to Chromatic
- **Every PR**: Gets a "UI Tests" check with a link to the published Storybook
- **Visual diffs**: If a component changes visually, Chromatic highlights it in the PR for review

---

## Phase 8: Optional Enhancements

### 8.1: Add to `.gitignore`

```
storybook-static/
```

### 8.2: Add npm scripts

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}
```

### 8.3: Font handling in Storybook

The project uses **Clash Grotesk** via local `.woff2` files loaded through `next/font/local` in `layout.tsx`. Storybook's `@storybook/nextjs-vite` framework should handle `next/font` automatically. If fonts don't render:
- Check that `.storybook/preview.ts` imports `globals.css` (which sets `--font-clash-grotesk`)
- The font files are in `src/app/fonts/` — Storybook needs access to these

### 8.4: React Server Components

If any story fails with RSC errors, add to `.storybook/main.ts`:

```ts
features: {
  experimentalRSC: true,
},
```

---

## Scaling Strategy

When adding a new component to the design system:

1. Create the component file (e.g., `src/components/ui/new-component.tsx`)
2. Create `new-component.stories.tsx` next to it
3. Set `title` to the appropriate tier:
   - Simple primitive with no dependencies → `Atoms/NewComponent`
   - Composed from atoms → `Molecules/NewComponent`
   - Complex with context/store deps → `Organisms/Category/NewComponent`
   - Full page view → `Pages/NewComponent`
4. Add `tags: ["autodocs"]` for automatic props documentation
5. The component auto-appears in the correct sidebar section
6. Chromatic auto-captures it on next push

---

## Implementation Priority

Recommended order of story creation:

| Phase | Stories | Count | Why first |
|-------|---------|-------|-----------|
| 1 | Design Tokens (#1-5) | 5 | Validates Storybook + Tailwind v4 integration works |
| 2 | Atoms (#6-29) | 24 | Core design system, no mock decorators needed |
| 3 | Molecules (#30-36) | 7 | Still no decorators, builds on atoms |
| 4 | Mock decorators setup | — | Required before organisms |
| 5 | Node base + bodies (#37-49) | 13 | Most visual, highest value for design review |
| 6 | Workflow UI (#50-55) | 6 | Requires store decorator |
| 7 | AI Elements (#56-66) | 11 | Some need React Flow decorator |
| 8 | Pages (#67-70) | 4 | Full compositions, need all decorators |
| 9 | Utilities (#71-72) | 2 | Low priority, quick wins |
| **Total** | | **72** | |

---

## Decorator Dependency Matrix

Quick reference for which decorators each tier needs:

| Tier | Theme (addon-themes) | React Flow | Zustand Store |
|------|---------------------|------------|---------------|
| Design Tokens | Yes | No | No |
| Atoms | Yes | No | No |
| Molecules | Yes | No | No |
| Nodes (base) | Yes | Yes | No |
| Node Bodies | Yes | Yes | No |
| Workflow UI | Yes | Some | Yes |
| AI Elements | Yes | Some | No |
| Pages | Yes | Yes | Yes |
| Utilities | Yes | No | No |

---

## Known Gotchas

| Issue | Solution |
|-------|----------|
| **Tailwind v4 `@theme inline`** | Should work since Storybook handles PostCSS — test after install |
| **Clash Grotesk font (local woff2)** | `@storybook/nextjs-vite` handles `next/font` — verify after Phase 1 |
| **React Server Components** | Enable `experimentalRSC: true` in `.storybook/main.ts` if needed |
| **`@base-ui/react` components** | Should work — they're client components |
| **Dark mode** | Handled by `@storybook/addon-themes` with `.dark` class toggle |
| **`@hugeicons/react`** | Should work — standard React components, no SSR issues |
| **`working-directory` in CI** | The `.git` is inside `app/` — checkout lands in `app/` directly |
| **Next.js 16 compatibility** | Very new — verify Storybook version supports it during install |
| **tsconfig excludes** | 6 AI element files are excluded from TS compilation — they cannot have stories unless excludes are removed |
| **Zustand store in stories** | Use `useWorkflowStore.setState()` in decorator to seed mock data |
| **React Flow context** | Nodes/edges crash without `<ReactFlowProvider>` — use decorator |
| **Node body heights** | Some nodes (landing-page) are 500px tall — set story container height accordingly |

---

## Reference Links

- [Storybook Install Guide](https://storybook.js.org/docs/get-started/install)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Storybook + Tailwind CSS Recipe](https://storybook.js.org/recipes/tailwindcss)
- [Writing Stories (CSF format)](https://storybook.js.org/docs/writing-stories)
- [Storybook Styling & CSS](https://storybook.js.org/docs/configure/styling-and-css)
- [Chromatic Setup](https://www.chromatic.com/docs/storybook/setup)
- [Chromatic GitHub Actions](https://www.chromatic.com/docs/github-actions/)
- [Chromatic Pricing](https://www.chromatic.com/pricing) (free: 5k snapshots/mo, unlimited users)
- [chromaui/action GitHub](https://github.com/chromaui/action)
