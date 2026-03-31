export type ComponentEntry = {
  name: string;
  category: "ui" | "workflow" | "ai-elements";
  description: string;
  filePath: string;
  dependencies: string[];
};

export const componentIndex: ComponentEntry[] = [
  // ── UI Components ──────────────────────────────────────────────────────────

  {
    name: "accordion",
    category: "ui",
    description:
      "Expandable content sections built on Base UI accordion primitive",
    filePath: "src/components/ui/accordion.tsx",
    dependencies: [],
  },
  {
    name: "alert",
    category: "ui",
    description:
      "Status alert banner with default and destructive variants via cva",
    filePath: "src/components/ui/alert.tsx",
    dependencies: [],
  },
  {
    name: "avatar",
    category: "ui",
    description:
      "User avatar with image support and fallback initials, multiple sizes",
    filePath: "src/components/ui/avatar.tsx",
    dependencies: [],
  },
  {
    name: "badge",
    category: "ui",
    description:
      "Small status label with color variants (default, secondary, destructive, outline, success, warning)",
    filePath: "src/components/ui/badge.tsx",
    dependencies: [],
  },
  {
    name: "button",
    category: "ui",
    description:
      "Primary action button with variant (default, destructive, outline, secondary, ghost, link) and size props, supports asChild via Slot",
    filePath: "src/components/ui/button.tsx",
    dependencies: [],
  },
  {
    name: "button-group",
    category: "ui",
    description:
      "Group of related buttons with shared border and separator styling",
    filePath: "src/components/ui/button-group.tsx",
    dependencies: ["separator"],
  },
  {
    name: "card",
    category: "ui",
    description:
      "Container with header, title, description, action, content, and footer sections",
    filePath: "src/components/ui/card.tsx",
    dependencies: [],
  },
  {
    name: "carousel",
    category: "ui",
    description:
      "Horizontal scrolling content carousel with previous/next navigation buttons",
    filePath: "src/components/ui/carousel.tsx",
    dependencies: ["button"],
  },
  {
    name: "collapsible",
    category: "ui",
    description:
      "Toggle visibility of a content section, re-exports Base UI collapsible primitives",
    filePath: "src/components/ui/collapsible.tsx",
    dependencies: [],
  },
  {
    name: "command",
    category: "ui",
    description:
      "Command palette / search input with filterable results list, groups, and keyboard navigation",
    filePath: "src/components/ui/command.tsx",
    dependencies: ["dialog", "input-group"],
  },
  {
    name: "dialog",
    category: "ui",
    description:
      "Modal dialog overlay with title, description, close button, and footer sections",
    filePath: "src/components/ui/dialog.tsx",
    dependencies: ["button", "icon"],
  },
  {
    name: "dropdown-menu",
    category: "ui",
    description:
      "Contextual menu triggered by a button with items, checkboxes, radio groups, and submenus",
    filePath: "src/components/ui/dropdown-menu.tsx",
    dependencies: [],
  },
  {
    name: "hover-card",
    category: "ui",
    description: "Card that appears on hover, anchored to a trigger element",
    filePath: "src/components/ui/hover-card.tsx",
    dependencies: [],
  },
  {
    name: "icon",
    category: "ui",
    description:
      "Hugeicons wrapper with named lookup from the icon registry and size variants (xs/sm/md/lg)",
    filePath: "src/components/ui/icon.tsx",
    dependencies: [],
  },
  {
    name: "info-row",
    category: "ui",
    description:
      "Label-value row for detail displays with subtle bordered background",
    filePath: "src/components/ui/info-row.tsx",
    dependencies: [],
  },
  {
    name: "input",
    category: "ui",
    description: "Text input field with consistent styling and focus ring",
    filePath: "src/components/ui/input.tsx",
    dependencies: [],
  },
  {
    name: "input-group",
    category: "ui",
    description:
      "Input with optional prefix/suffix addons, icon buttons, and textarea support",
    filePath: "src/components/ui/input-group.tsx",
    dependencies: ["button", "input", "textarea"],
  },
  {
    name: "label",
    category: "ui",
    description: "Form field label with disabled state styling",
    filePath: "src/components/ui/label.tsx",
    dependencies: [],
  },
  {
    name: "popover",
    category: "ui",
    description:
      "Floating content panel anchored to a trigger element via Base UI popover",
    filePath: "src/components/ui/popover.tsx",
    dependencies: [],
  },
  {
    name: "progress",
    category: "ui",
    description:
      "Progress bar with track and indicator, supports indeterminate state",
    filePath: "src/components/ui/progress.tsx",
    dependencies: [],
  },
  {
    name: "provider-icon",
    category: "ui",
    description:
      "Third-party service provider icon (e.g. Anthropic, OpenAI, Google) rendered from a provider registry",
    filePath: "src/components/ui/provider-icon.tsx",
    dependencies: ["icon"],
  },
  {
    name: "scroll-area",
    category: "ui",
    description:
      "Custom scrollbar container with horizontal and vertical scroll support",
    filePath: "src/components/ui/scroll-area.tsx",
    dependencies: [],
  },
  {
    name: "section-header",
    category: "ui",
    description:
      "Uppercase muted section title for grouping content areas",
    filePath: "src/components/ui/section-header.tsx",
    dependencies: [],
  },
  {
    name: "select",
    category: "ui",
    description:
      "Dropdown select input with trigger, content, items, groups, and separators",
    filePath: "src/components/ui/select.tsx",
    dependencies: [],
  },
  {
    name: "separator",
    category: "ui",
    description:
      "Visual divider line supporting horizontal and vertical orientations",
    filePath: "src/components/ui/separator.tsx",
    dependencies: [],
  },
  {
    name: "sheet",
    category: "ui",
    description:
      "Slide-out panel from any edge of the screen with overlay backdrop",
    filePath: "src/components/ui/sheet.tsx",
    dependencies: ["button"],
  },
  {
    name: "source-info",
    category: "ui",
    description:
      "Data source attribution display showing provider icon, name, and sync timestamp",
    filePath: "src/components/ui/source-info.tsx",
    dependencies: ["icon"],
  },
  {
    name: "spinner",
    category: "ui",
    description: "Loading spinner animation with size variants",
    filePath: "src/components/ui/spinner.tsx",
    dependencies: [],
  },
  {
    name: "switch",
    category: "ui",
    description: "Toggle switch for boolean values built on Base UI switch",
    filePath: "src/components/ui/switch.tsx",
    dependencies: [],
  },
  {
    name: "tabs",
    category: "ui",
    description:
      "Tabbed content navigation with list, trigger, and content panels",
    filePath: "src/components/ui/tabs.tsx",
    dependencies: [],
  },
  {
    name: "textarea",
    category: "ui",
    description: "Multi-line text input with consistent styling",
    filePath: "src/components/ui/textarea.tsx",
    dependencies: [],
  },
  {
    name: "toggle",
    category: "ui",
    description:
      "Toggle button with pressed state and variant/size props via cva",
    filePath: "src/components/ui/toggle.tsx",
    dependencies: [],
  },
  {
    name: "toggle-group",
    category: "ui",
    description:
      "Group of mutually exclusive toggles with single or multiple selection",
    filePath: "src/components/ui/toggle-group.tsx",
    dependencies: ["toggle"],
  },
  {
    name: "tooltip",
    category: "ui",
    description:
      "Hover tooltip with text content, wraps Base UI tooltip primitives",
    filePath: "src/components/ui/tooltip.tsx",
    dependencies: [],
  },

  // ── Workflow Components ────────────────────────────────────────────────────

  {
    name: "action-grid",
    category: "workflow",
    description:
      "Searchable grid of available workflow actions grouped by category with collapsible sections",
    filePath: "src/components/workflow/action-grid.tsx",
    dependencies: ["button", "collapsible", "icon", "input", "provider-icon"],
  },
  {
    name: "canvas-controls",
    category: "workflow",
    description:
      "Zoom in/out/fit view controls for the React Flow canvas",
    filePath: "src/components/workflow/canvas-controls.tsx",
    dependencies: ["button", "icon", "tooltip"],
  },
  {
    name: "config-panel-sidebar",
    category: "workflow",
    description:
      "Right sidebar config panel that renders as a Sheet on mobile and an absolute panel on desktop",
    filePath: "src/components/workflow/config-panel-sidebar.tsx",
    dependencies: ["sheet", "node-config-panel"],
  },
  {
    name: "left-sidebar",
    category: "workflow",
    description:
      "Workspace navigation sidebar with workflow list and bottom actions, Sheet on mobile",
    filePath: "src/components/workflow/left-sidebar.tsx",
    dependencies: ["button", "icon", "sheet", "tooltip"],
  },
  {
    name: "logs-panel",
    category: "workflow",
    description:
      "Bottom logs panel with expandable content, renders as a Sheet on mobile",
    filePath: "src/components/workflow/logs-panel.tsx",
    dependencies: ["button", "icon", "sheet", "canvas-controls"],
  },
  {
    name: "node-config-panel",
    category: "workflow",
    description:
      "Node editor panel with copilot chat, toolbar, and configuration tabs for all node body types",
    filePath: "src/components/workflow/node-config-panel.tsx",
    dependencies: [
      "button",
      "icon",
      "input",
      "provider-icon",
      "select",
      "tabs",
      "action-grid",
      "ai-campaign-body",
      "brand-assets-body",
      "brand-voice-body",
      "email-sequence-body",
      "instagram-ads-body",
      "landing-page-body",
      "push-notification-body",
      "target-audience-body",
    ],
  },
  {
    name: "node-hover-toolbar",
    category: "workflow",
    description:
      "Floating toolbar that appears on node hover with duplicate, delete, lock, and add-after actions",
    filePath: "src/components/workflow/node-hover-toolbar.tsx",
    dependencies: ["button", "icon", "tooltip"],
  },
  {
    name: "trigger-node",
    category: "workflow",
    description:
      "Workflow trigger node (manual, schedule, webhook) for the React Flow canvas",
    filePath: "src/components/workflow/nodes/trigger-node.tsx",
    dependencies: ["node", "icon", "node-hover-toolbar"],
  },
  {
    name: "action-node",
    category: "workflow",
    description:
      "Workflow action node with provider icon, badge, and body variants for the React Flow canvas",
    filePath: "src/components/workflow/nodes/action-node.tsx",
    dependencies: [
      "node",
      "badge",
      "icon",
      "provider-icon",
      "node-hover-toolbar",
      "ai-campaign-body",
      "brand-assets-body",
      "brand-voice-body",
      "email-sequence-body",
      "instagram-ads-body",
      "landing-page-body",
      "push-notification-body",
      "target-audience-body",
    ],
  },
  {
    name: "usage-indicator",
    category: "workflow",
    description:
      "Plan usage metrics display with segmented progress bar and pricing info",
    filePath: "src/components/workflow/usage-indicator.tsx",
    dependencies: ["badge", "button", "separator"],
  },
  {
    name: "workflow-canvas",
    category: "workflow",
    description:
      "React Flow canvas wrapper with custom node/edge types, touch support, and auto-layout",
    filePath: "src/components/workflow/workflow-canvas.tsx",
    dependencies: [
      "canvas",
      "edge",
      "connection",
      "canvas-controls",
      "trigger-node",
      "action-node",
    ],
  },
  {
    name: "workflow-header",
    category: "workflow",
    description:
      "Top header bar with sidebar toggles, workflow toolbar, usage indicator, and theme toggle",
    filePath: "src/components/workflow/workflow-header.tsx",
    dependencies: [
      "button",
      "icon",
      "usage-indicator",
      "workflow-toolbar",
    ],
  },
  {
    name: "workflow-toolbar",
    category: "workflow",
    description:
      "Toolbar with deploy and run action buttons for the workflow editor",
    filePath: "src/components/workflow/workflow-toolbar.tsx",
    dependencies: ["button", "icon", "tooltip"],
  },

  // ── Workflow Node Bodies ───────────────────────────────────────────────────

  {
    name: "ai-campaign-body",
    category: "workflow",
    description:
      "AI campaign node body with model selector, prompt display, and channel output preview",
    filePath:
      "src/components/workflow/node-bodies/ai-campaign-body.tsx",
    dependencies: [
      "badge",
      "icon",
      "provider-icon",
      "model-selector",
      "section-header",
      "select",
      "source-info",
    ],
  },
  {
    name: "brand-assets-body",
    category: "workflow",
    description:
      "Brand assets node body displaying brand colors, fonts, logo, and asset library metadata",
    filePath:
      "src/components/workflow/node-bodies/brand-assets-body.tsx",
    dependencies: [
      "badge",
      "button",
      "icon",
      "info-row",
      "section-header",
      "source-info",
    ],
  },
  {
    name: "brand-voice-body",
    category: "workflow",
    description:
      "Brand voice node body with rich-text editor artifact, tags, and source attribution",
    filePath:
      "src/components/workflow/node-bodies/brand-voice-body.tsx",
    dependencies: [
      "artifact",
      "badge",
      "button",
      "icon",
      "brand-voice-editor",
      "info-row",
      "section-header",
      "source-info",
    ],
  },
  {
    name: "brand-voice-editor",
    category: "workflow",
    description:
      "Lexical rich-text editor configured for brand voice editing inside the sidebar",
    filePath:
      "src/components/workflow/node-bodies/brand-voice-editor.tsx",
    dependencies: ["tooltip"],
  },
  {
    name: "email-sequence-body",
    category: "workflow",
    description:
      "Email sequence node body with model selector, email cards, subject/preview, and metrics",
    filePath:
      "src/components/workflow/node-bodies/email-sequence-body.tsx",
    dependencies: [
      "badge",
      "button",
      "card",
      "icon",
      "info-row",
      "model-selector",
      "section-header",
      "select",
      "source-info",
    ],
  },
  {
    name: "instagram-ads-body",
    category: "workflow",
    description:
      "Instagram ads node body with ad image preview, targeting info, model selector, and CTA settings",
    filePath:
      "src/components/workflow/node-bodies/instagram-ads-body.tsx",
    dependencies: [
      "badge",
      "button",
      "icon",
      "info-row",
      "model-selector",
      "section-header",
      "select",
      "source-info",
    ],
  },
  {
    name: "landing-page-body",
    category: "workflow",
    description:
      "Landing page node body with page screenshot preview, publish status, and SEO metadata",
    filePath:
      "src/components/workflow/node-bodies/landing-page-body.tsx",
    dependencies: [
      "badge",
      "button",
      "icon",
      "info-row",
      "model-selector",
      "section-header",
      "select",
      "source-info",
    ],
  },
  {
    name: "push-notification-body",
    category: "workflow",
    description:
      "Push notification node body with notification preview, delivery metrics progress, and scheduling",
    filePath:
      "src/components/workflow/node-bodies/push-notification-body.tsx",
    dependencies: [
      "badge",
      "button",
      "icon",
      "info-row",
      "model-selector",
      "progress",
      "section-header",
      "select",
      "source-info",
    ],
  },
  {
    name: "target-audience-body",
    category: "workflow",
    description:
      "Target audience node body with segment filters, contact breakdown bars, and audience stats",
    filePath:
      "src/components/workflow/node-bodies/target-audience-body.tsx",
    dependencies: [
      "badge",
      "button",
      "icon",
      "info-row",
      "section-header",
      "source-info",
    ],
  },

  // ── AI Elements ────────────────────────────────────────────────────────────

  {
    name: "agent",
    category: "ai-elements",
    description:
      "AI agent tool-call display with accordion sections showing tool invocations and code blocks",
    filePath: "src/components/ai-elements/agent.tsx",
    dependencies: ["accordion", "badge", "icon"],
  },
  {
    name: "artifact",
    category: "ai-elements",
    description:
      "Bordered artifact container with header, title, toolbar actions, and content area",
    filePath: "src/components/ai-elements/artifact.tsx",
    dependencies: ["button", "icon", "tooltip"],
  },
  {
    name: "attachments",
    category: "ai-elements",
    description:
      "File and source-document attachment display with hover card previews and removal support",
    filePath: "src/components/ai-elements/attachments.tsx",
    dependencies: ["button", "hover-card", "icon"],
  },
  {
    name: "audio-player",
    category: "ai-elements",
    description:
      "Audio playback controls with play, seek, mute, and duration display via media-chrome",
    filePath: "src/components/ai-elements/audio-player.tsx",
    dependencies: ["button", "button-group"],
  },
  {
    name: "canvas",
    category: "ai-elements",
    description:
      "React Flow canvas wrapper with background grid, pan-on-scroll, and fit-view defaults",
    filePath: "src/components/ai-elements/canvas.tsx",
    dependencies: [],
  },
  {
    name: "chain-of-thought",
    category: "ai-elements",
    description:
      "Collapsible chain-of-thought reasoning display with step counter badge",
    filePath: "src/components/ai-elements/chain-of-thought.tsx",
    dependencies: ["badge", "collapsible", "icon"],
  },
  {
    name: "checkpoint",
    category: "ai-elements",
    description:
      "AI workflow checkpoint marker with restore action and separator dividers",
    filePath: "src/components/ai-elements/checkpoint.tsx",
    dependencies: ["button", "icon", "separator", "tooltip"],
  },
  {
    name: "code-block",
    category: "ai-elements",
    description:
      "Syntax-highlighted code block with shiki, language selector, copy button, and line numbers",
    filePath: "src/components/ai-elements/code-block.tsx",
    dependencies: ["button", "icon", "select"],
  },
  {
    name: "commit",
    category: "ai-elements",
    description:
      "Git commit display with avatar, collapsible file diff list, and copy hash action",
    filePath: "src/components/ai-elements/commit.tsx",
    dependencies: ["avatar", "button", "collapsible", "icon"],
  },
  {
    name: "confirmation",
    category: "ai-elements",
    description:
      "AI action confirmation dialog with approve/deny buttons and safety alert",
    filePath: "src/components/ai-elements/confirmation.tsx",
    dependencies: ["alert", "button"],
  },
  {
    name: "connection",
    category: "ai-elements",
    description:
      "React Flow connection line component rendering a bezier curve with endpoint circle",
    filePath: "src/components/ai-elements/connection.tsx",
    dependencies: [],
  },
  {
    name: "context",
    category: "ai-elements",
    description:
      "Token usage context display with circular progress ring and hover card breakdown",
    filePath: "src/components/ai-elements/context.tsx",
    dependencies: ["button", "hover-card", "progress"],
  },
  {
    name: "controls",
    category: "ai-elements",
    description:
      "Styled React Flow controls panel with glass morphism border and backdrop",
    filePath: "src/components/ai-elements/controls.tsx",
    dependencies: [],
  },
  {
    name: "conversation",
    category: "ai-elements",
    description:
      "Chat conversation container with auto-scroll-to-bottom and scroll-down button",
    filePath: "src/components/ai-elements/conversation.tsx",
    dependencies: ["button", "icon"],
  },
  {
    name: "edge",
    category: "ai-elements",
    description:
      "React Flow edge variants (animated bezier and temporary simple bezier) with dynamic curvature",
    filePath: "src/components/ai-elements/edge.tsx",
    dependencies: [],
  },
  {
    name: "environment-variables",
    category: "ai-elements",
    description:
      "Environment variable editor with add/remove, masked values, and toggle switches",
    filePath: "src/components/ai-elements/environment-variables.tsx",
    dependencies: ["badge", "button", "icon", "switch"],
  },
  {
    name: "file-tree",
    category: "ai-elements",
    description:
      "Hierarchical file/folder tree navigator with collapsible directories and file type icons",
    filePath: "src/components/ai-elements/file-tree.tsx",
    dependencies: ["collapsible", "icon"],
  },
  {
    name: "image",
    category: "ai-elements",
    description:
      "AI-generated image display rendering base64 data with media type",
    filePath: "src/components/ai-elements/image.tsx",
    dependencies: [],
  },
  {
    name: "inline-citation",
    category: "ai-elements",
    description:
      "Inline source citation badge with hover card carousel showing referenced sources",
    filePath: "src/components/ai-elements/inline-citation.tsx",
    dependencies: ["badge", "carousel", "hover-card", "icon"],
  },
  {
    name: "jsx-preview",
    category: "ai-elements",
    description:
      "Live JSX preview renderer with react-jsx-parser and error boundary fallback",
    filePath: "src/components/ai-elements/jsx-preview.tsx",
    dependencies: ["icon"],
  },
  {
    name: "message",
    category: "ai-elements",
    description:
      "Chat message bubble with markdown rendering, copy/retry actions, and part-based content layout",
    filePath: "src/components/ai-elements/message.tsx",
    dependencies: ["button", "button-group", "icon", "tooltip"],
  },
  {
    name: "mic-selector",
    category: "ai-elements",
    description:
      "Microphone device selector with command palette search and popover picker",
    filePath: "src/components/ai-elements/mic-selector.tsx",
    dependencies: ["button", "command", "icon", "popover"],
  },
  {
    name: "model-selector",
    category: "ai-elements",
    description:
      "AI model picker with command dialog, grouped model list, and provider logo display",
    filePath: "src/components/ai-elements/model-selector.tsx",
    dependencies: ["command", "dialog"],
  },
  {
    name: "node",
    category: "ai-elements",
    description:
      "React Flow node wrapper built on Card with source/target handles, header, fields, and status bar",
    filePath: "src/components/ai-elements/node.tsx",
    dependencies: ["card"],
  },
  {
    name: "open-in-chat",
    category: "ai-elements",
    description:
      "Dropdown menu to open a prompt in external AI chat providers (ChatGPT, Claude, Gemini, etc.)",
    filePath: "src/components/ai-elements/open-in-chat.tsx",
    dependencies: ["button", "dropdown-menu", "icon"],
  },
  {
    name: "package-info",
    category: "ai-elements",
    description:
      "NPM package info display with version badge, change type indicator, and details",
    filePath: "src/components/ai-elements/package-info.tsx",
    dependencies: ["badge", "icon"],
  },
  {
    name: "panel",
    category: "ai-elements",
    description:
      "Styled React Flow panel with card-like border and background",
    filePath: "src/components/ai-elements/panel.tsx",
    dependencies: [],
  },
  {
    name: "persona",
    category: "ai-elements",
    description:
      "Animated AI persona avatar using Rive with state machine for idle, listening, thinking, and speaking",
    filePath: "src/components/ai-elements/persona.tsx",
    dependencies: [],
  },
  {
    name: "plan",
    category: "ai-elements",
    description:
      "AI execution plan display with collapsible step cards showing status, title, and details",
    filePath: "src/components/ai-elements/plan.tsx",
    dependencies: ["button", "card", "collapsible", "icon"],
  },
  {
    name: "prompt-input",
    category: "ai-elements",
    description:
      "Multi-feature prompt input with slash commands, file attachments, model selector, and submit button",
    filePath: "src/components/ai-elements/prompt-input.tsx",
    dependencies: [
      "command",
      "dropdown-menu",
      "hover-card",
      "icon",
      "input-group",
      "select",
      "spinner",
      "tooltip",
    ],
  },
  {
    name: "queue",
    category: "ai-elements",
    description:
      "Message queue panel with collapsible list of pending messages and scroll area",
    filePath: "src/components/ai-elements/queue.tsx",
    dependencies: ["button", "collapsible", "icon", "scroll-area"],
  },
  {
    name: "reasoning",
    category: "ai-elements",
    description:
      "Collapsible AI reasoning/thinking display with streaming markdown content",
    filePath: "src/components/ai-elements/reasoning.tsx",
    dependencies: ["collapsible", "icon"],
  },
  {
    name: "sandbox",
    category: "ai-elements",
    description:
      "Code sandbox execution display with collapsible output tabs for terminal and preview",
    filePath: "src/components/ai-elements/sandbox.tsx",
    dependencies: ["collapsible", "icon", "tabs"],
  },
  {
    name: "schema-display",
    category: "ai-elements",
    description:
      "API schema/endpoint display with HTTP method badge, parameters, and collapsible details",
    filePath: "src/components/ai-elements/schema-display.tsx",
    dependencies: ["badge", "collapsible", "icon"],
  },
  {
    name: "shimmer",
    category: "ai-elements",
    description:
      "Animated shimmer/skeleton loading effect using motion with gradient sweep",
    filePath: "src/components/ai-elements/shimmer.tsx",
    dependencies: [],
  },
  {
    name: "snippet",
    category: "ai-elements",
    description:
      "Copyable code/text snippet with input group display and copy-to-clipboard action",
    filePath: "src/components/ai-elements/snippet.tsx",
    dependencies: ["icon", "input-group"],
  },
  {
    name: "sources",
    category: "ai-elements",
    description:
      "Collapsible source references list with toggle trigger and icon",
    filePath: "src/components/ai-elements/sources.tsx",
    dependencies: ["collapsible", "icon"],
  },
  {
    name: "speech-input",
    category: "ai-elements",
    description:
      "Speech-to-text input button using the Web Speech API with recording state and spinner",
    filePath: "src/components/ai-elements/speech-input.tsx",
    dependencies: ["button", "icon", "spinner"],
  },
  {
    name: "stack-trace",
    category: "ai-elements",
    description:
      "Collapsible error stack trace display with expandable frames and error message",
    filePath: "src/components/ai-elements/stack-trace.tsx",
    dependencies: ["button", "collapsible", "icon"],
  },
  {
    name: "suggestion",
    category: "ai-elements",
    description:
      "Scrollable row of AI-suggested prompt buttons that users can click to send",
    filePath: "src/components/ai-elements/suggestion.tsx",
    dependencies: ["button", "scroll-area"],
  },
  {
    name: "task",
    category: "ai-elements",
    description:
      "Collapsible task item display with file indicators and completion status",
    filePath: "src/components/ai-elements/task.tsx",
    dependencies: ["collapsible", "icon"],
  },
  {
    name: "terminal",
    category: "ai-elements",
    description:
      "Terminal output display with ANSI color support, auto-scroll, and shimmer loading state",
    filePath: "src/components/ai-elements/terminal.tsx",
    dependencies: ["button", "icon"],
  },
  {
    name: "test-results",
    category: "ai-elements",
    description:
      "Test suite results display with pass/fail/skip summary badges and collapsible test details",
    filePath: "src/components/ai-elements/test-results.tsx",
    dependencies: ["badge", "collapsible", "icon"],
  },
  {
    name: "tool",
    category: "ai-elements",
    description:
      "AI tool invocation display with status badge, collapsible arguments/result, and code block output",
    filePath: "src/components/ai-elements/tool.tsx",
    dependencies: ["badge", "collapsible", "icon"],
  },
  {
    name: "toolbar",
    category: "ai-elements",
    description:
      "React Flow NodeToolbar wrapper positioned at the bottom of a node",
    filePath: "src/components/ai-elements/toolbar.tsx",
    dependencies: [],
  },
  {
    name: "transcription",
    category: "ai-elements",
    description:
      "Audio transcription display with timed segments, speaker labels, and seek-to-time support",
    filePath: "src/components/ai-elements/transcription.tsx",
    dependencies: [],
  },
  {
    name: "voice-selector",
    category: "ai-elements",
    description:
      "AI voice picker with command dialog, grouped voice list, and audio preview samples",
    filePath: "src/components/ai-elements/voice-selector.tsx",
    dependencies: ["button", "command", "dialog", "icon", "spinner"],
  },
  {
    name: "web-preview",
    category: "ai-elements",
    description:
      "Collapsible web page preview with URL bar, iframe sandbox, and device-width controls",
    filePath: "src/components/ai-elements/web-preview.tsx",
    dependencies: [
      "button",
      "collapsible",
      "icon",
      "input",
      "tooltip",
    ],
  },
];
