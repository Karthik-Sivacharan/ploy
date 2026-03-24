# Icon Migration: Lucide → Hugeicons

## Status

### Done (Workflow Components)
- [x] `src/components/ui/icon.tsx` — Icon component with size tokens
- [x] `src/lib/icons.ts` — Icon registry (semantic name → Hugeicons data)
- [x] `src/app/globals.css` — Icon size tokens (`--icon-xs/sm/md/lg`)
- [x] `src/components/workflow/left-sidebar.tsx`
- [x] `src/components/workflow/logs-panel.tsx`
- [x] `src/components/workflow/canvas-controls.tsx`
- [x] `src/components/workflow/workflow-toolbar.tsx`
- [x] `src/components/workflow/node-config-panel.tsx`
- [x] `src/components/workflow/node-hover-toolbar.tsx`
- [x] `src/components/workflow/nodes/action-node.tsx`
- [x] `src/components/workflow/nodes/trigger-node.tsx`
- [x] `src/components/workflow/action-grid.tsx`

### TODO (AI Elements — 30 files)
Each file needs: remove `lucide-react` import, add `Icon`/`HugeiconsIcon` import, update JSX.
Some icons may need to be added to the registry first.

- [ ] `src/components/ai-elements/agent.tsx` — BotIcon
- [ ] `src/components/ai-elements/artifact.tsx` — XIcon, LucideIcon type
- [ ] `src/components/ai-elements/attachments.tsx` — FileTextIcon, GlobeIcon, ImageIcon, Music2Icon, PaperclipIcon, VideoIcon, XIcon
- [ ] `src/components/ai-elements/chain-of-thought.tsx` — BrainIcon, ChevronDownIcon, DotIcon
- [ ] `src/components/ai-elements/checkpoint.tsx` — BookmarkIcon
- [ ] `src/components/ai-elements/code-block.tsx` — CheckIcon, CopyIcon
- [ ] `src/components/ai-elements/commit.tsx` — CheckIcon, CopyIcon, FileIcon, GitCommitIcon, MinusIcon, PlusIcon
- [ ] `src/components/ai-elements/conversation.tsx` — ArrowDownIcon, DownloadIcon
- [ ] `src/components/ai-elements/environment-variables.tsx` — CheckIcon, CopyIcon, EyeIcon, EyeOffIcon
- [ ] `src/components/ai-elements/file-tree.tsx` — ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon
- [ ] `src/components/ai-elements/inline-citation.tsx` — ArrowLeftIcon, ArrowRightIcon
- [ ] `src/components/ai-elements/jsx-preview.tsx` — AlertCircle
- [ ] `src/components/ai-elements/message.tsx` — ChevronLeftIcon, ChevronRightIcon
- [ ] `src/components/ai-elements/mic-selector.tsx` — ChevronsUpDownIcon
- [ ] `src/components/ai-elements/open-in-chat.tsx` — ChevronDownIcon, ExternalLinkIcon, MessageCircleIcon
- [ ] `src/components/ai-elements/package-info.tsx` — ArrowRightIcon, MinusIcon, PackageIcon, PlusIcon
- [ ] `src/components/ai-elements/plan.tsx` — ChevronsUpDownIcon
- [ ] `src/components/ai-elements/prompt-input.tsx` — CornerDownLeftIcon, ImageIcon, PlusIcon, SquareIcon, XIcon
- [ ] `src/components/ai-elements/queue.tsx` — ChevronDownIcon, PaperclipIcon
- [ ] `src/components/ai-elements/reasoning.tsx` — BrainIcon, ChevronDownIcon
- [ ] `src/components/ai-elements/sandbox.tsx` — ChevronDownIcon, Code
- [ ] `src/components/ai-elements/schema-display.tsx` — ChevronRightIcon
- [ ] `src/components/ai-elements/snippet.tsx` — CheckIcon, CopyIcon
- [ ] `src/components/ai-elements/sources.tsx` — BookIcon, ChevronDownIcon
- [ ] `src/components/ai-elements/speech-input.tsx` — MicIcon, SquareIcon
- [ ] `src/components/ai-elements/stack-trace.tsx` — AlertTriangleIcon, CheckIcon, ChevronDownIcon, CopyIcon
- [ ] `src/components/ai-elements/task.tsx` — ChevronDownIcon, SearchIcon
- [ ] `src/components/ai-elements/terminal.tsx` — CheckIcon, CopyIcon, TerminalIcon, Trash2Icon
- [ ] `src/components/ai-elements/test-results.tsx` — CheckCircle2Icon, ChevronRightIcon, CircleDotIcon, CircleIcon, XCircleIcon
- [ ] `src/components/ai-elements/tool.tsx` — CheckCircleIcon, ChevronDownIcon, CircleIcon, ClockIcon, WrenchIcon, XCircleIcon
- [ ] `src/components/ai-elements/voice-selector.tsx` — Various gender/play icons
- [ ] `src/components/ai-elements/web-preview.tsx` — ChevronDownIcon

### NOT migrating (shadcn/ui internals — leave as Lucide)
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/spinner.tsx`
- `src/components/ui/carousel.tsx`
- `src/components/ui/command.tsx`

### Standalone components (low priority)
- [ ] `src/components/theme-toggle.tsx` — Moon, Sun

## Icons to add to registry before AI elements migration

Many of these already exist in the free pack but need registry entries:
- File types: `FileTextIcon`, `FileIcon`, `FolderIcon`, `FolderOpenIcon`
- Media: `Music2Icon`, `VideoIcon`, `MicIcon`
- UI: `DotIcon`, `CircleIcon`, `SquareIcon`, `MinusIcon`, `CheckIcon`
- Actions: `DownloadIcon`, `ExternalLinkIcon`, `CornerDownLeftIcon`
- Dev: `TerminalIcon`, `WrenchIcon`, `GitCommitIcon`
- Misc: `BookmarkIcon`, `PaperclipIcon`, `GlobeIcon`, `PackageIcon`

## Architecture Notes

- **`<Icon name="..." size="sm" />`** — use for static icons in components
- **`<HugeiconsIcon icon={icons[name]} size={48} />`** — use for dynamic icons (maps, large display)
- **Size tokens**: `xs=14px`, `sm=16px`, `md=20px`, `lg=24px`
- **strokeWidth**: 1.5 (default, matches Lucide)
- shadcn/ui components keep Lucide — they get overwritten on `npx shadcn` updates
