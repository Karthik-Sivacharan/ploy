# Design System Migration TODO

## 1. Lucide → Hugeicons Migration (32 files)

All files in `src/components/ai-elements/` that still import from `lucide-react`.
Pattern: replace `import { XIcon } from "lucide-react"` → `import { Icon } from "@/components/ui/icon"`, then swap `<XIcon className="size-4" />` → `<Icon name="..." size="xs" />`.

- [ ] `agent.tsx`
- [ ] `checkpoint.tsx`
- [ ] `sources.tsx`
- [ ] `reasoning.tsx`
- [ ] `inline-citation.tsx`
- [ ] `file-tree.tsx`
- [ ] `model-selector.tsx`
- [ ] `stack-trace.tsx`
- [ ] `confirmation.tsx`
- [ ] `schema-display.tsx`
- [ ] `toolbar.tsx`
- [ ] `commit.tsx`
- [ ] `task.tsx`
- [ ] `suggestion.tsx`
- [ ] `queue.tsx`
- [ ] `audio-player.tsx`
- [ ] `voice-selector.tsx`
- [ ] `mic-selector.tsx`
- [ ] `persona.tsx`
- [ ] `terminal.tsx`
- [ ] `speech-input.tsx`
- [ ] `attachments.tsx`
- [ ] `prompt-input.tsx`
- [ ] `panel.tsx`
- [ ] `jsx-preview.tsx`
- [ ] `package-info.tsx`
- [ ] `conversation.tsx`
- [ ] `web-preview.tsx`
- [ ] `artifact.tsx`
- [ ] `test-results.tsx`
- [ ] `canvas.tsx`
- [ ] `controls.tsx`
- [ ] `ui/dialog.tsx` (1 lucide import: `XIcon`)

## 2. Hardcoded Colors → Semantic Tokens (4 files)

Replace raw Tailwind colors with `text-success`, `text-warning`, `text-destructive`, `text-primary`, `bg-success/10`, etc.

- [ ] `file-tree.tsx` — `text-blue-500` on folder icons → `text-primary`
- [ ] `schema-display.tsx` — HTTP method colors (`bg-red-100 text-red-700`, `bg-green-100 text-green-700`, etc.) → semantic tokens
- [ ] `test-results.tsx` — pass/fail badge colors → `bg-success/10 text-success`, `bg-destructive/10 text-destructive`
- [ ] `node.tsx` — `bg-chart-2` used for success status → `bg-success`

## 3. Unused Token Cleanup (globals.css)

Optional — remove or document tokens with zero usage in the codebase.

- [ ] `--radius-3xl`, `--radius-4xl`
- [ ] `--duration-instant`
- [ ] `--shadow-glow-green`
- [ ] `--chart-4`, `--chart-5`
- [ ] `--sidebar-accent`, `--sidebar-accent-foreground`

## Reference

See `tool.tsx` (committed `769c5fa`) for the canonical migration pattern.
