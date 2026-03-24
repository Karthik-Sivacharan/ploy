# Node API Research

Reference doc for designing workflow node UIs based on real API surfaces. Each section covers what the API returns, what users can configure, and what that means for collapsed (canvas) and expanded (sidebar) node states.

---

## 1. Frontify — Brand Assets

**API type:** GraphQL
**Endpoint:** `https://{instance}.frontify.com/graphql`
**Auth:** OAuth 2.0 / Bearer token

### What the API returns

- **Brand object:** `id`, `name`, `slug`, `rgbaColor` (red/green/blue/alpha), `avatar`, `customMetadataProperties`
- **Library object:** `id`, `name`, assets (paginated), folders, metadata field definitions
- **Asset object:** `id`, `title`, `filename`, `description`, `creator` (id, name, email), `createdAt`, `modifiedAt`, `tags`, `metadata`, `downloadUrl`, `previewUrl`, `externalId`, `fileSize`, `fileType`, location info (brand, library, folder), comments
- **Brand Guidelines:** 38+ content block types — color palettes (HEX, RGB, CMYK), typography rules, logo usage specs, downloadable assets

### What users can configure

- Which brand to pull from (brand ID)
- Which library/folder to sync
- Asset filters (by type, tags, metadata)
- Which fields to fetch (GraphQL — pick exactly what you need)

### Notable features

- GraphQL flexibility — clients request only the fields they need
- Asset categories, metadata, and tags are all queryable
- Color palettes include HEX, RGB, and CMYK values
- Brand Guidelines queryable as structured data (not just rendered pages)
- Custom metadata properties on brands — extensible schema

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Brand name + library name, color swatches, font preview, logo thumbnail, dynamic asset count, sync status badge, last synced timestamp |
| **Expanded** | Source config (brand/library selector), full color palette with HEX/RGB, typography with roles, logo grid, asset library by type with counts, asset tags, sync timestamp, "Add assets from Frontify" action |

**Key config surface:** Brand ID, Library ID, folder filter, asset type filter

---

## 2. Notion — Brand Voice

**API type:** REST (JSON)
**Base URL:** `https://api.notion.com/v1/`
**Auth:** Bearer token (internal integration or OAuth)

### What the API returns

- **Page:** `id`, `title`, `properties` (title, rich_text, select, multi_select, date, status, people, etc.), block content (headings, paragraphs, lists, callouts, quotes)
- **Rich text:** Structured array of text segments with annotations (bold, italic, color, links)
- **Metadata:** `created_time`, `last_edited_time`, `created_by`, `last_edited_by`
- **Database rows:** Filterable/sortable by any property

### What users can configure

- Database ID or Page ID to pull from
- Filter conditions (compound AND/OR on any property)
- Sort order
- Which properties to fetch (`filter_properties`)

### Notable features

- Compound filters with arbitrary nesting of AND/OR conditions
- 18+ property types (title, rich_text, number, select, multi_select, date, people, status, etc.)
- `filter_properties` parameter for performance — only fetch needed columns
- Cursor-based pagination (`start_cursor` / `has_more`)

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Notion page title, key property values (tone, audience), last edited by + timestamp, status badge if page has status property |
| **Expanded** | Source config (page/database ID), property mapping preview, voice attributes from Notion properties, rich text editor for guidelines, "Avoid" rules from multi_select, tags from multi_select, "Open in Notion" link, sync timestamp |

**Key config surface:** Page ID or Database ID, property mapping (which Notion properties feed into tone, audience, style)

---

## 3. HubSpot — Target Audience

**API type:** REST (JSON)
**Base URL:** `https://api.hubapi.com/`
**Auth:** Bearer token (OAuth 2.0 or private app token)

### What the API returns

- **List/Segment:** `name`, `listId`, `processingType` (MANUAL/DYNAMIC/SNAPSHOT), `hs_list_size`, `createdAt`, `updatedAt`
- **Contact properties:** `email`, `firstname`, `lastname`, `company`, `phone`, `lifecyclestage`, `createdate`, custom properties
- **Filter criteria:** For dynamic lists — property + operator + value (max 3 filter groups x 3 filters each)
- **Associations:** Companies, deals, tickets linked to contacts

### What users can configure

- List/segment to pull from (list ID)
- Processing type (Manual, Dynamic, Snapshot)
- Filter groups — propertyName + operator (EQ, NEQ, CONTAINS_TOKEN, BETWEEN, GT, etc.) + value
- Which contact properties to include
- Sort order

### Notable features

- `processingType` is a first-class enum (MANUAL/DYNAMIC/SNAPSHOT) — it's a state, not metadata
- Filters use structured `property -> operator -> value` format
- `hs_list_size` is the headline metric on every list
- Properties are opt-in on read — must explicitly request them
- Strict filter limits: max 3 groups x 3 filters
- Contact `lifecyclestage` property drives breakdown (subscriber, lead, MQL, customer, etc.)

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Segment name, contact count (hs_list_size), filter pills, processing type as badge, sync timestamp |
| **Expanded** | Source config (list selector), filters as property/operator/value rules, contact breakdown with proportional bar, processing type badge, "Open in HubSpot" link, updatedAt timestamp |

**Key config surface:** List ID, processing type, filter definitions, contact properties

---

## 4. Ploy AI — Campaign Generator (internal)

This is Ploy's own internal tool — no external API.

### What it does

- Takes brand assets, voice guidelines, and audience data as inputs
- Uses an LLM to generate multi-channel campaign content
- Outputs to downstream nodes (web, email, Instagram, push)

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Model badge, campaign title, prompt preview (3 lines), connected source icons, channel output pills, generation status |
| **Expanded** | Model selector, campaign title, editable prompt, temperature/creativity slider, connected sources, channel outputs, generation status, output checklist (what was generated, linking to downstream nodes) |

**Key config surface:** Model selection, campaign prompt, connected sources, channel outputs

---

## 5. Webflow — Landing Page

**API type:** REST (JSON)
**Base URL:** `https://api.webflow.com/v2/`
**Auth:** Bearer token (OAuth 2.0)

### What the API returns

- **CMS item:** `id`, `fieldData` (name, slug, custom fields per collection schema), `isDraft`, `isArchived`, `createdOn`, `lastUpdated`, `lastPublished`
- **Publish response:** 202 Accepted, `publishedItemIds`, `errors`
- **Site publish:** Rate limited to 1/min, targets custom domains or webflow.io subdomain
- **Pages:** List + DOM content update only (no page creation via Data API)

### What users can configure

- Collection ID (which CMS collection)
- Field data (must match collection schema — name, slug, plus custom fields)
- Draft/archive status (`isDraft`, `isArchived`)
- Publish targets (custom domains, webflow subdomain)
- Locale (for multi-locale sites)

### Notable features

- Batch creation of up to 100 items per request
- Dual-state system: "staged" (draft) vs "live" items
- Publish is a separate API call with rate limiting (1/min)
- No page creation via Data API — only CMS items
- `lastPublished` timestamp tracks when content went live

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Page screenshot (smaller), slug, status badge (Draft/Published/Archived), target domain, model badge |
| **Expanded** | Page preview, page config (collection name, title, slug), publish controls (draft/published toggle, target domain, lastPublished), model selector, "Edit in Webflow" + "Republish" actions |

**Key config surface:** Collection ID, publish target (domain), field data mapping, draft/publish toggle

---

## 6. Mailchimp — Email Sequence

**API type:** REST (JSON)
**Base URL:** Mailchimp Marketing API v3
**Auth:** Bearer token (OAuth 2.0 or API key)

### What the API returns

- **Campaign:** `id`, `type` (regular/automation/absplit/rss/variate), `status` (save/paused/schedule/sending/sent), `emails_sent`, `create_time`, `send_time`, `archive_url`
- **Settings:** `subject_line`, `preview_text`, `from_name`, `reply_to`, `template_id`
- **Recipients:** `list_id`, `segment_opts`
- **Tracking:** Opens, clicks, Google Analytics config
- **Report summary:** Post-send stats (opens, clicks, etc.)
- **Automation:** `id`, `status`, `emails_sent`, `trigger_settings`, individual emails with own status

### What users can configure

- Campaign type (regular, plaintext, A/B split, RSS, variate)
- Recipients (list_id + segment filters)
- Subject line, preview text, from name, reply-to
- Template or raw HTML content
- Tracking settings (opens, clicks, GA)
- Schedule / send timing
- Trigger settings (for automations)

### Notable features

- Campaign creation and content are separate API calls
- Status lifecycle: save -> paused -> schedule -> sending -> sent -> canceled -> archived
- A/B split testing and multivariate campaign types built in
- Classic Automations have trigger_settings (tag, date, API event, etc.)
- Individual emails within automation have their own status
- Report summary available post-send

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Model badge, stacked email cards with per-email status dots, recipient count, campaign status badge, automation type badge |
| **Expanded** | Model selector, campaign config (type, trigger), email cards with subject line + preview text + individual status, send window (from_name, reply_to, send time), tracking config, post-send metrics (opens, clicks, emails_sent) |

**Key config surface:** Campaign type, list/segment selector, trigger config, per-email content, send window

---

## 7. Meta — Instagram Ads

**API type:** REST (JSON) — Marketing API
**Auth:** Bearer token (OAuth 2.0, long-lived token)

### What the API returns (4-layer hierarchy)

- **Campaign:** `id`, `name`, `objective` (OUTCOME_TRAFFIC, OUTCOME_SALES, etc.), `status` (PAUSED/ACTIVE), `bid_strategy`, `budget`
- **Ad Set:** `id`, `name`, `targeting` (geo, age, gender, interests, placements, custom audiences), `optimization_goal`, `billing_event`, scheduling
- **Ad Creative:** `id`, `name`, image/video, caption (message), CTA button type (SHOP_NOW, LEARN_MORE, SIGN_UP), destination URL
- **Insights:** `impressions`, `reach`, `clicks`, `spend`, `cpc`, `cpm`, `conversions`, cost_per_result

### What users can configure

- **Campaign level:** Name, objective, budget (daily/lifetime), bid strategy, schedule
- **Ad Set level:** Targeting — location (countries/cities/zips), age range, gender, interests/behaviors, publisher platforms (`["instagram"]`), Instagram positions (feed/story/reels/explore), custom/lookalike audiences
- **Creative level:** Image/video, caption text, CTA type, destination URL
- **Budget:** Daily or lifetime, in minor currency units (cents)

### Notable features

- 4-layer hierarchy: Campaign > Ad Set > Ad Creative > Ad (each a separate API call)
- Targeting spec is deeply nested (geo_locations, flexible_spec for interests, publisher_platforms, instagram_positions)
- CTA types: SHOP_NOW, LEARN_MORE, SIGN_UP, BOOK_TRAVEL, etc.
- Insights available per campaign/adset/ad with breakdowns by placement
- Advantage+ automated campaign types

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Ad preview (image + headline + CTA label), status badge (Draft/Active/Paused), structured targeting chips (location, age, interest), budget, model badge |
| **Expanded** | Model selector, targeting breakdown (demographics, locations, interests, placements as structured rows), creative preview (image + caption + CTA type + destination URL), budget & schedule (daily/lifetime, bid strategy, dates), post-launch performance metrics (impressions, reach, clicks, spend, CPC) |

**Key config surface:** Campaign objective, targeting (geo + demographics + interests + placements), creative (image + caption + CTA + URL), budget + bid strategy

---

## 8. OneSignal — Push Notifications

**API type:** REST (JSON)
**Endpoint:** `https://api.onesignal.com/notifications`
**Auth:** `Authorization: Key {REST_API_KEY}`

### What the API returns

- **On create:** `id` (notification UUID), `external_id`, `errors` array
- **On GET:** `successful` (delivered count), `failed`, `converted` (opened), `remaining`, platform breakdowns

### What users can configure

- **Content:** `headings` (title, per language), `contents` (body, per language), `subtitle` (iOS), `big_picture` (large image URL)
- **Targeting:** Segments (e.g., "Subscribed Users"), tag-based filters (`field: "tag", key: "level", relation: ">", value: "10"`), aliases/subscription IDs, platform booleans (is_ios, is_android, etc.)
- **Actions:** Up to 2 action buttons with id + text
- **URL:** Destination URL on tap, custom data payload
- **Scheduling:** `send_after` (ISO 8601, up to 30 days), `delayed_option` ("timezone" or "last-active"), `delivery_time_of_day`
- **Delivery:** `throttle_rate_per_minute`, `collapse_id` (replace previous), `thread_id` (iOS grouping), `ttl` (time-to-live)

### Notable features

- Multi-language content (`headings` and `contents` keyed by language code)
- Intelligent delivery (`delayed_option: "last-active"`) — sends at each user's most active time
- Timezone delivery — 9 AM notification arrives at 9 AM local time everywhere
- Segment-based + filter-based targeting (combinable)
- Action buttons (up to 2) with custom IDs
- Idempotency key for duplicate prevention
- Multi-channel: same API supports push, email, SMS via `target_channel`

### Node design implications

| State | Should show |
|---|---|
| **Collapsed** | Notification mockup (title + body), segment name, recipient count, schedule time, platform pills (iOS/Android), model badge |
| **Expanded** | Model selector, content (title + body + subtitle + big_picture preview), action buttons config, scheduling mode (immediate/scheduled/timezone/intelligent), targeting (segments + filter rules), destination URL, delivery stats post-send (delivered/failed/opened with progress bar) |

**Key config surface:** Segments, scheduling mode, content per language, action buttons, big picture image
