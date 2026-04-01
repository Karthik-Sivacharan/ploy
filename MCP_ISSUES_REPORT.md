# Ploy Design System MCP Server - Issues Report

This document catalogues every error, missing dependency, wrong export name, and manual fix that was required when using the `ploy-design-system` MCP server to scaffold a workflow builder project from scratch.

**Project path:** `/Users/karthiksivacharan/Projects/ploy-mcp-test`

---

## 1. Missing npm Dependencies

The MCP server's `get_design_system()` response includes `init_commands` and `npm_dependencies`, but multiple packages required by the generated component source code were not listed.

| Package | Where it is needed | Was it listed by MCP? |
|---|---|---|
| `@base-ui/react` | `button`, `badge`, `separator`, `tooltip`, `sheet`, `dialog`, `select`, `tabs`, `collapsible`, `progress` all import from `@base-ui/react/*` | No |
| `cmdk` | `src/components/ui/command.tsx` imports from `cmdk` | No |
| `clsx` | `src/lib/utils.ts` - the `cn()` utility function | No |
| `tailwind-merge` | `src/lib/utils.ts` - the `cn()` utility function | No |
| `tw-animate-css` | `src/app/globals.css` contains `@import "tw-animate-css"` | No |
| `shadcn` | `src/app/globals.css` contains `@import "shadcn/tailwind.css"` | Partially (was installed but not in listed deps) |
| `zustand` | `src/stores/workflow-store.ts` | No |
| `@xyflow/react` | Workflow canvas, nodes, edges | No (needed to be discovered from component source) |
| `motion` | Animation utilities used in several components | No |
| `next-themes` | `src/components/theme-toggle.tsx` imports `useTheme` | No |
| `sonner` | Toast notifications | No |

**Recommendation:** The `get_design_system()` response must include a complete `npm_dependencies` list covering every package that any component may import from. Alternatively, each component returned by `get_component()` should declare its npm dependencies explicitly so they can be installed on demand.

---

## 2. Missing Library/Utility Files Not Provided by MCP

The `get_component()` tool returns component source code that imports from shared library files, hooks, and stores. These files were never provided by the MCP server and had to be created manually.

### 2.1 `src/lib/providers.ts`
- **Used by:** `src/components/ui/provider-icon.tsx`, `src/components/workflow/nodes/action-node.tsx`
- **Exports:** `getProvider()` - a registry of provider configs (name, logo, icon, colors) for providers like Anthropic, OpenAI, Meta, Frontify, etc.
- **Impact:** Without this file, provider icons and branding throughout all action nodes fail to render.

### 2.2 `src/lib/workflow/types.ts`
- **Used by:** `trigger-node.tsx`, `action-node.tsx`, `node-config-panel.tsx`, `action-grid.tsx`
- **Exports:** `TriggerNodeData`, `ActionNodeData`, `ActionDefinition`, `ActionGroup`, `TriggerType`
- **Impact:** Core type definitions required by every workflow node component. Nothing compiles without them.

### 2.3 `src/lib/workflow/utils.ts`
- **Used by:** `src/components/workflow/node-hover-toolbar.tsx`
- **Exports:** `nanoid()` - ID generation utility
- **Impact:** Adding new nodes from the hover toolbar fails without this.

### 2.4 `src/lib/workflow/constants.ts`
- **Used by:** `src/components/workflow/action-grid.tsx`
- **Exports:** `ACTION_GROUPS` - the list of available actions grouped by category
- **Impact:** The action picker grid renders empty without this constant.

### 2.5 `src/stores/workflow-store.ts`
- **Used by:** `workflow-header.tsx`, `workflow-canvas.tsx`, `left-sidebar.tsx`, `logs-panel.tsx`, `node-hover-toolbar.tsx`, `config-panel-sidebar.tsx`
- **Exports:** `useWorkflowStore` - Zustand store managing all workflow state
- **Impact:** This is the central state management for the entire application. Without it, nothing works. The MCP server provided zero guidance on what store shape, methods, or state the components expect.

### 2.6 `src/hooks/use-is-mobile.ts`
- **Used by:** `logs-panel.tsx`, `left-sidebar.tsx`, `config-panel-sidebar.tsx`, `workflow-canvas.tsx`
- **Exports:** `useIsMobile()` hook
- **Impact:** Responsive layout breaks without this hook.

### 2.7 `src/components/theme-toggle.tsx`
- **Used by:** `workflow-header.tsx`
- **Exports:** `ThemeToggle` component
- **Impact:** Not in the MCP component registry. Had to be created manually.

**Recommendation:** The MCP server should either:
1. Include these shared files as part of the `get_design_system()` scaffolding output, or
2. List them as `dependency_sources` on every component that imports them, or
3. Provide a `get_utility()` or `get_library()` tool that returns these files on demand.

---

## 3. Wrong Export Names in `dependency_sources`

The `workflow-canvas` component's `dependency_sources` metadata listed export names that did not match the actual exports in the component files.

### 3.1 `edge.tsx` - Namespace export vs named exports
- **MCP claimed:** The component exports `AnimatedEdge` as a named export
- **Actual export:** `export const Edge = { Animated, Temporary }` (a single object with sub-properties)
- **File:** `src/components/ai-elements/edge.tsx` (line 141)
- **Fix required:** Import as `import { Edge } from "@/components/ai-elements/edge"` and use `Edge.Animated` / `Edge.Temporary`

### 3.2 `connection.tsx` - Wrong component name
- **MCP claimed:** The component exports `CustomConnectionLine`
- **Actual export:** `export const Connection: ConnectionLineComponent`
- **File:** `src/components/ai-elements/connection.tsx` (line 5)
- **Fix required:** Import as `import { Connection } from "@/components/ai-elements/connection"`

**Recommendation:** The `dependency_sources` metadata must use the exact export names that appear in the actual component source. Ideally this should be validated automatically by parsing the source AST.

---

## 4. Lexical Editor Dependency Tree (brand-voice-editor.tsx)

The original `brand-voice-editor.tsx` component from the MCP server imported from the Lexical rich text editor ecosystem. None of these dependencies were declared anywhere.

### Missing npm packages:
- `lexical`
- `@lexical/react` (provides `LexicalComposer`, `LexicalRichTextPlugin`, `LexicalErrorBoundary`, `LexicalHistoryPlugin`, `LexicalOnChangePlugin`)
- `@lexical/rich-text`

### Missing custom components/files (not in MCP registry):
- `@/components/editor/editor-ui/content-editable`
- `@/components/editor/plugins/toolbar/toolbar-plugin`
- `@/components/editor/plugins/toolbar/font-format-toolbar-plugin`
- `@/components/editor/themes/editor-theme`

### Resolution:
The component was replaced with a simple placeholder (`src/components/workflow/node-bodies/brand-voice-editor.tsx`) that renders a static div, since the full Lexical editor stack was impossible to reconstruct from the MCP output alone.

**Recommendation:** When a component depends on an entire third-party framework (like Lexical), the MCP server should either:
1. Provide the complete dependency tree including all custom wrappers, or
2. Offer a simplified version that does not require the framework, or
3. Clearly flag the component as requiring additional manual setup.

---

## 5. Undocumented Node Data Shape / Action Types

`src/components/workflow/nodes/action-node.tsx` uses a `switch` statement on `nodeData.actionType` to decide which body component to render (lines 101-191). The valid `actionType` values are:

- `frontify-brand-assets`
- `notion-brand-voice`
- `hubspot-target-audience`
- `ploy-ai-campaign`
- `webflow-landing-page`
- `mailchimp-email-sequence`
- `meta-instagram-ads`
- `onesignal-push-notification`

Plus generic types handled by `DEFAULT_ACTION_FIELDS`:
- `generate-text`, `generate-image`, `http-request`, `database-query`, `condition`, `github-create-issue`, `github-list-issues`, `slack-send-message`, `resend-send-email`, `stripe-create-customer`, `stripe-create-invoice`

None of these values were documented by the MCP server. The only way to discover them was by reading the switch statement source code.

**Recommendation:** The MCP server should provide a schema or documentation for the data contract each component expects -- particularly for components that branch behavior based on data field values.

---

## 6. Store Methods Mismatch

`src/components/workflow/workflow-canvas.tsx` destructures from `useWorkflowStore()`:

```typescript
const {
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNodeId,
  setSelectedEdgeId,
  setConfigPanelOpen,
} = useWorkflowStore();
```

The manually created store was missing:
- `edges` (added later)
- `onNodesChange` - React Flow change handler for nodes
- `onEdgesChange` - React Flow change handler for edges
- `onConnect` - React Flow connection handler
- `selectedEdgeId` / `setSelectedEdgeId` - edge selection state

These are React Flow-specific patterns that require using `applyNodeChanges`, `applyEdgeChanges`, and `addEdge` from `@xyflow/react`. Without knowing the expected store interface, the developer must reverse-engineer every consumer component to build a compatible store.

**Recommendation:** If the MCP components depend on a global store, the store file should be provided as a first-class artifact -- either via `get_design_system()` or as a dedicated `dependency_source` on the top-level layout component.

---

## 7. Config Panel Sidebar - Wiring and Deep Dependency Tree

`src/components/workflow/config-panel-sidebar.tsx` references `node-config-panel.tsx`, which in turn imports ALL node body components and the action-grid. This creates a dependency tree that includes:

- All 8 node body components (`brand-assets-body`, `brand-voice-body`, `target-audience-body`, `ai-campaign-body`, `landing-page-body`, `email-sequence-body`, `instagram-ads-body`, `push-notification-body`)
- `brand-voice-editor.tsx` (the Lexical component -- see issue 4)
- `action-grid.tsx` (which needs `ACTION_GROUPS` constant -- see issue 2.4)
- `tabs.tsx`, `sheet.tsx` (UI components)
- The full workflow store

Additionally, `config-panel-sidebar` was not wired into the `workflow-builder.tsx` layout by default. It had to be manually added to the page layout to make the right sidebar appear.

**Recommendation:** The MCP server should provide a complete layout/page component that wires all sub-components together, or at minimum document which components need to be composed in the page layout.

---

## 8. Trigger Node is a Base Primitive — Not for Direct Use

The `trigger-node` component is a low-level building block that renders a plain text table (key-value field rows like `URL: -`, `Method: POST`). It has **no body system** — it cannot render rich components like `BrandAssetsBody`, `AiCampaignBody`, etc.

The `action-node` component is the one that supports rich body rendering via its `actionType` switch statement. **All real workflow nodes (Frontify, Anthropic, Meta, etc.) should use `action-node`**, regardless of whether they serve as a trigger or an action in the workflow.

During this build, the Brand Assets (Frontify) node was initially set as `type: "trigger"`, which produced a plain text card instead of the rich body with color swatches, font previews, and logos. The fix was changing it to `type: "action"` with `actionType: "frontify-brand-assets"`.

**The MCP server gave no indication of this.** The component registry lists `trigger-node` and `action-node` as equal peers, and `brand-assets-body` as a dependency of `action-node` only — but never explains that `trigger-node` is a primitive not meant for direct use in composed workflows.

**Recommendation:** Add a rule to the design system rules (returned by `get_design_system()`) stating:

> Always use `action-node` for workflow canvas nodes. The `trigger-node` component is a low-level primitive — it only renders plain key-value fields and does not support body components. Every provider-specific node (Frontify, Anthropic, Meta, etc.) should use `action-node` with the appropriate `actionType` and `provider` values.

---

## Summary of Recommendations for MCP Server Improvements

1. **Complete dependency declaration:** Every component returned by `get_component()` must declare its full npm dependency list. The `get_design_system()` response must include all packages needed across the entire system.

2. **Provide shared utility files:** Library files (`lib/`, `hooks/`, `stores/`) that components import from must be included as first-class artifacts, not left for the consumer to reverse-engineer.

3. **Accurate export metadata:** The `dependency_sources` field must use exact export names matching the actual source code. Automate this with AST parsing.

4. **Document data contracts:** Components that branch on data values (like `actionType`) should have their expected data shapes and valid values documented in the component metadata.

5. **Provide the store:** If components depend on a centralized store, the store file must be provided with the correct interface, including all methods and state properties that any component consumes.

6. **Handle complex dependency trees gracefully:** Components like `brand-voice-editor.tsx` that depend on entire third-party frameworks (Lexical) should either ship with all required sub-components or offer a simplified fallback.

7. **Provide a wiring/layout component:** The top-level page composition showing how all pieces fit together should be part of the MCP output, not left to guesswork.

8. **Document primitive vs composed components:** The design system rules should clearly state that `trigger-node` is a base primitive not for direct use, and that all workflow nodes should use `action-node` with the appropriate `actionType` and `provider`.
