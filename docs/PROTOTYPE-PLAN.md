# Ploy Prototype Plan — Product Launch Campaign

## The Story

> "Here's how a marketer at Peloton uses Ploy: connect your brand assets, voice guidelines, and CRM audience — AI generates a complete multi-channel campaign — landing page, email drip, Instagram ads, blog post — all on-brand, from one canvas."

---

## Flow Architecture (8 nodes, 7 edges)

```
[Brand Assets]  ────────┐
  (Frontify)            |
                        |
[Brand Voice]  ─────────+──>  [AI Campaign Agent]  ──+──>  [Landing Page]      (Webflow)
  (Notion)              |      (Claude Opus)         |
                        |      The brief + prompt    +──>  [Email Sequence]    (Mailchimp)
[Target Audience] ──────┘      lives HERE            |
  (HubSpot)                                          +──>  [Instagram Ads]     (Meta)
                                                     |
                                                     +──>  [Push Notification] (OneSignal)
```

### Edge connections

```
brand-assets    -->  ai-agent
brand-voice     -->  ai-agent
target-audience -->  ai-agent
ai-agent        -->  landing-page
ai-agent        -->  email-sequence
ai-agent        -->  instagram-ads
ai-agent        -->  push-notification
```

---

## Node Specifications

### INPUT NODES (left side)

#### 1. Brand Assets — Frontify

Provider: `Frontify` | Type: `action` | Width: `w-64`

Visual body:
- Color swatches: 4 circles (#6C3AED, #1E1E1E, #F9FAFB, #10B981)
- Font preview: "Aa" styled text + "Inter - Semibold" label
- Logo thumbnails: 2 small placeholder boxes ("Logo" + "Mark")
- Footer: "24 assets synced" with checkmark

Data source reference (Frontify GraphQL API):
- Colors from Brand Guidelines > Color blocks
- Typography from Brand Guidelines > Typography blocks
- Logos from Asset Libraries

---

#### 2. Brand Voice — Notion

Provider: `Notion` | Type: `action` | Width: `w-64`

Visual body (doc-style, uses Artifact component + Lexical rich text editor):
- Document title: "Brand Voice Guidelines"
- Blockquote snippet: "Motivating without being pushy. Inclusive, never exclusive."
- Key-values: Audience > "Fitness adults, 25-54" | Tone > "Empowering & warm" | Style > "Community-first"
- Footer: "Last edited Mar 12, 2026"

Data source reference (Notion API):
- Page title from page > title property
- Content from page > paragraph blocks (retrieve block children endpoint)
- Last edited from page > last_edited_time

---

#### 3. Target Audience — HubSpot

Provider: `HubSpot` | Type: `action` | Width: `w-64`

Visual body:
- Segment name: "Summer Trial Prospects"
- Contact count (large text): **12,847** contacts
- Filter pills: `Fitness` `25-54` `Urban`
- List type: "Dynamic - Auto-updating"
- Status: green "Active" badge

Data source reference (HubSpot Lists/Segments API v3):
- Segment name from list name
- Contact count from list > membershipCount
- Filters from list > filter definitions
- Type from list > processingType (MANUAL / DYNAMIC / SNAPSHOT)

---

### CENTER NODE

#### 4. AI Campaign Agent — Ploy (Claude Opus)

Provider: `Ploy` | Type: `action` | Width: `w-80` (wider, centerpiece)

Visual body:
- Model badge (top-right): `Claude Opus` pill with Anthropic logo (via ModelSelectorLogo)
- Campaign title (bold): "Peloton Summer Launch"
- Doc-style prompt body (the brief IS the prompt):
  "Launch our summer campaign targeting fitness-motivated adults (25-54).
  Goal: drive free trial signups. Tone: empowering, warm, community-first.
  Generate on-brand assets across web, email, Instagram, and push."
- Connected source icons (bottom row): Frontify, Notion, HubSpot provider icons
- Channel output pills: `Web` `Email` `Instagram` `Push`
- Status: "Generated" with checkmark

When clicked, the right sidebar (Editor tab) shows the full expanded prompt — editable.
The canvas node shows a condensed preview.

---

### OUTPUT NODES (right side, fanned out)

Each output node has its own **model badge** showing which AI model generates that specific asset.

#### 5. Landing Page — Webflow

Provider: `Webflow` | Type: `action` | Width: `w-64`
Model: `Claude Sonnet 4.6` (text/copy generation)

Visual body:
- Model badge: `Claude Sonnet 4.6`
- Mini wireframe: colored hero block + CTA button shape + 2-3 section lines
- Page title: "Start Your Free Trial"
- CTA: mini button shape "Try Free for 30 Days"
- Collection: "Landing Pages"
- Footer: "Published" with green dot

Data source reference (Webflow CMS API):
- Page from CMS Item > name
- CTA from CMS Item > custom field
- Collection from Collection name
- Status from published state (staged vs live)

---

#### 6. Email Sequence — Mailchimp

Provider: `Mailchimp` | Type: `action` | Width: `w-64`
Model: `Claude Sonnet 4.6` (copywriting)

Visual body:
- Model badge: `Claude Sonnet 4.6`
- 3 stacked mini cards (using Card size="sm"):
  - Day 1 - Welcome
  - Day 3 - Key Features
  - Day 7 - Start Trial
- Recipients: "12,847 contacts"
- Automation type: "Classic - Tag trigger"
- Footer: "Ready to send" with checkmark

Data source reference (Mailchimp Automations API):
- Emails from automation > emails list
- Subject lines from email > subject_line
- Delay from email > delay settings
- Recipient count from automation list membership

---

#### 7. Instagram Ads — Meta

Provider: `Meta` | Type: `action` | Width: `w-64`
Model: `Gemini 2.0 Flash` (image generation)

Visual body:
- Model badge: `Gemini 2.0 Flash` (with Google logo via ModelSelectorLogo)
- Ad preview card: image placeholder + headline "Your Journey Starts Here" + "Sponsored" tag
- Format: "Carousel - 4 slides"
- Targeting: `Fitness` `25-54` `Urban` pills
- Budget: "$500/day"
- Footer: "Campaign draft"

Data source reference (Meta Marketing API):
- Campaign format from campaign > objective
- Creative title from ad creative > title
- Media from ad creative > image_url (Images API)
- Targeting from ad set > targeting spec
- Budget from ad set > daily_budget

---

#### 8. Push Notification — OneSignal

Provider: `OneSignal` | Type: `action` | Width: `w-64`
Model: `Claude Sonnet 4.6` (copy generation)

Visual body:
- Model badge: `Claude Sonnet 4.6`
- Phone notification mockup: rounded card simulating a mobile push notification
  - App icon placeholder (small rounded square) + "Peloton" app name + "now" timestamp
  - Title (bold): "Your Summer Starts Here 🚴"
  - Body: "Start your free trial today and join millions riding together."
- Delivery stats row: "12,847 recipients"
- Platform pills: `iOS` `Android`
- Footer: "Scheduled" with clock icon

Data source reference (OneSignal REST API v1):
- Title from notification > headings
- Body from notification > contents
- Recipients from notification > included_segments / filters
- Platforms from notification > isIos, isAndroid
- Delivery stats from notification > successful, failed, converted
- Status from notification > completed_at / send_after

---

## Canvas Layout (approximate positions)

```
x=0,   y=0     Brand Assets (Frontify)
x=0,   y=400   Brand Voice (Notion)
x=0,   y=560   Target Audience (HubSpot)

x=400, y=200   AI Campaign Agent (Ploy) — centered vertically

x=800, y=-80   Landing Page (Webflow)
x=800, y=140   Email Sequence (Mailchimp)
x=800, y=360   Instagram Ads (Meta)
x=800, y=580   Push Notification (OneSignal)
```

---

## Component Reuse Map

### DIRECT REUSE (no changes)

| Existing component | File | Used for |
|---|---|---|
| `Node` shell | `ai-elements/node.tsx` | Every node's outer wrapper (Card + handles + toolbar) |
| `NodeHeader` | `ai-elements/node.tsx` | Every node's top bar (provider icon + title) |
| `NodeContent` | `ai-elements/node.tsx` | Every node's body slot (accepts children — our custom visuals go here) |
| `NodeFooter` | `ai-elements/node.tsx` | Status lines: "Published", "Ready", "Active" |
| `NodeStatusBar` | `ai-elements/node.tsx` | Running/success/error colored accent strip |
| `Badge` | `ui/badge.tsx` | Channel pills, status badges, model name pills (variants: default, secondary, outline) |
| `Progress` | `ui/progress.tsx` | Delivery progress bar in Push Notification node |
| `ProviderIcon` | `ui/provider-icon.tsx` | Every node header icon — fetches brand logos via Brandfetch CDN |
| `ModelSelectorLogo` | `ai-elements/model-selector.tsx` | AI model logos (anthropic, google) inside model badges — fetches from models.dev |
| `Card` (size="sm") | `ui/card.tsx` | Email sequence stacked cards |
| `Artifact` + children | `ai-elements/artifact.tsx` | Brand Voice doc-style body (ArtifactHeader + ArtifactContent) |
| `Edge.Animated` | `ai-elements/edge.tsx` | All connections (moving dot animation) |
| `NodeHoverToolbar` | `workflow/node-hover-toolbar.tsx` | Hover actions on every node |

### COMPOSE (tiny inline compositions, not new components)

| Need | Built from | Lines |
|---|---|---|
| Model badge pill | `Badge` + `ModelSelectorLogo` | ~5 lines inline |
| Filter/channel pills | `Badge variant="outline"` | ~1 line each |
| Delivery progress | `Progress` + `Badge` | ~5 lines inline |
| Status footer | `NodeFooter` + checkmark icon | ~3 lines inline |

### BUILD NEW (custom visual body components)

All live in `src/components/workflow/node-bodies/`

| Component | What it renders | Approx lines |
|---|---|---|
| `BrandAssetsBody` | Color swatches + font preview + logo thumbnails | ~40 |
| `BrandVoiceBody` | Doc-style card using Artifact shell + blockquote + timestamp | ~30 |
| `TargetAudienceBody` | Large contact count + filter pills + dynamic badge | ~35 |
| `AiCampaignBody` | Campaign prompt as doc text + connected source icons + channel pills | ~45 |
| `LandingPageBody` | Mini wireframe (colored divs: hero + CTA + sections) | ~40 |
| `EmailSequenceBody` | 3 stacked mini Card components with day + subject | ~35 |
| `InstagramAdsBody` | Ad card mockup with image placeholder + headline + Sponsored tag | ~40 |
| `PushNotificationBody` | Phone notification mockup + delivery stats + platform pills | ~40 |

**Total new visual code: ~305 lines across 8 components**

---

## Files to Modify

| File | Change | Priority |
|---|---|---|
| `lib/workflow/types.ts` | Add `"campaign"` to TriggerType (if using trigger node) OR keep all as action nodes | P0 |
| `stores/workflow-store.ts` | Replace INITIAL_NODES (8 marketing nodes) + INITIAL_EDGES (7 edges) + workflowName default | P0 |
| `components/workflow/nodes/action-node.tsx` | Switch on `actionType` to render correct body component instead of generic field rows | P0 |
| `lib/providers.ts` | Add `Notion`, `HubSpot`, `OneSignal`, `Meta` provider entries (Frontify, Webflow, Mailchimp already exist) | P0 |
| `components/workflow/left-sidebar.tsx` | Replace WORKFLOWS array with marketing workflow names | P1 |
| `components/workflow/workflow-header.tsx` | Add "Ploy" wordmark to header left side | P1 |
| `components/workflow/node-config-panel.tsx` | Update TRIGGERS list, update ToolbarTab with marketing-relevant items | P2 |
| `lib/workflow/constants.ts` | Replace ACTION_GROUPS with marketing-relevant groups | P2 |
| `app/globals.css` | Optional: channel-specific glow colors for node accents | P3 |

## Files to Create

| File | What | Priority |
|---|---|---|
| `components/workflow/node-bodies/brand-assets-body.tsx` | Frontify visual body | P0 |
| `components/workflow/node-bodies/brand-voice-body.tsx` | Notion doc-style body | P0 |
| `components/workflow/node-bodies/target-audience-body.tsx` | HubSpot segment body | P0 |
| `components/workflow/node-bodies/ai-campaign-body.tsx` | Campaign prompt body (center node) | P0 |
| `components/workflow/node-bodies/landing-page-body.tsx` | Webflow wireframe body | P0 |
| `components/workflow/node-bodies/email-sequence-body.tsx` | Mailchimp stacked emails body | P0 |
| `components/workflow/node-bodies/instagram-ads-body.tsx` | Instagram/Meta ad preview body | P0 |
| `components/workflow/node-bodies/push-notification-body.tsx` | OneSignal push notification body | P0 |

---

## What We're NOT Building

- No real AI generation — all content is static/pre-filled
- No actual integrations — no API calls to Frontify, Notion, HubSpot, etc.
- No drag-and-drop new nodes
- No auth/accounts
- No actual rich text editors — just components that LOOK like docs/editors with static content
- No real email editor — stacked cards that look like an email sequence
- Just one static, polished flow that tells the story

---

## Right Sidebar Behavior

When clicking the center AI Campaign Agent node, the right sidebar Editor tab shows the full campaign prompt — editable. The canvas node shows a condensed preview. This mirrors Jasper Canvas: canvas shows the card, clicking opens the full editor.

For all other nodes, the Editor tab shows standard config (label, description, provider info).

---

## Node Interaction Pattern (applies to ALL nodes)

Every node has two variants:
- **Minimal (canvas):** compact visual preview shown on the canvas by default
- **Expanded (editor sidebar):** full details shown in the right sidebar Editor tab when the node is clicked

The expanded variant always includes everything from the minimal variant plus additional detail and (where applicable) UI-only actions like "Add assets from Frontify".

---

## Implementation Notes

### Old demo nodes (Gmail 1, Agent 1, Gmail 2)
The original three demo nodes have been removed from `INITIAL_NODES` in `workflow-store.ts`. The hover toolbar component (`NodeHoverToolbar`) and related infrastructure (Node shell, NodeHeader, NodeFields, NodeFieldRow, etc.) are kept intact — they're reused by the new prototype nodes. The `DEFAULT_ACTION_FIELDS` map in `action-node.tsx` is also kept for now but can be cleaned up once all 8 prototype nodes are built.

### Brand: Peloton
The prototype uses Peloton as the brand throughout. All content (voice guidelines, audience targeting, campaign copy, push notifications) is Peloton-specific. Logo lives at `public/assets/brands/peloton-logo-big.webp`.

### Lexical rich text editor
Installed shadcn-editor (Lexical-based) for the Brand Voice expanded sidebar. Components live in `components/editor/` and `components/blocks/editor-00/`. The font-format toolbar plugin was modified to use Hugeicons (text-bold, text-italic, text-underline) instead of lucide-react, and trimmed to B/I/U only. The `toggle` and `toggle-group` shadcn components were added to support the toolbar.

### Completed nodes
- [x] Brand Assets (Frontify) — `node-bodies/brand-assets-body.tsx`
- [x] Brand Voice (Notion) — `node-bodies/brand-voice-body.tsx` + `brand-voice-editor.tsx` (Lexical rich text)
- [x] Target Audience (HubSpot) — `node-bodies/target-audience-body.tsx`
- [x] AI Campaign Agent (Ploy) — `node-bodies/ai-campaign-body.tsx`
- [x] Landing Page (Webflow) — `node-bodies/landing-page-body.tsx`
- [x] Email Sequence (Mailchimp) — `node-bodies/email-sequence-body.tsx`
- [x] Instagram Ads (Meta) — `node-bodies/instagram-ads-body.tsx`
- [x] Push Notification (OneSignal) — `node-bodies/push-notification-body.tsx`

### Auto-layout
Added Dagre-based auto-layout utility (`lib/workflow/layout.ts`) that arranges nodes left-to-right. Initial nodes are now auto-layouted on load. A layout button was added to canvas controls.

### All 8 prototype nodes complete
All nodes from the flow architecture are built. The canvas shows the full marketing workflow: 3 input nodes → AI Campaign Agent → 4 output nodes, all connected with animated edges.

### Key conventions established
- All provider icon badges use `size-9` with `rounded-lg` and show a "from Provider" subtitle
- All provider colors use `bg-muted text-foreground`
- Compact bodies render inside `NodeContent`, footer uses `NodeFooter`
- Expanded bodies are rendered inside `ActionConfig` with a provider header bar (`border-b border-border-subtle px-4 py-3`)
- Node spacing: ~400px vertical gap between input nodes
