/**
 * Icon Registry — maps semantic names to Hugeicons free icon data.
 *
 * Single source of truth for all icons in the app.
 * To swap an icon, change its mapping here — every usage updates automatically.
 *
 * Naming: kebab-case, matching the concept (not the library name).
 * All components — including shadcn/ui primitives — consume this registry.
 * No Lucide icons should be imported directly anywhere in the app.
 */

import {
  // Navigation & Layout
  SidebarLeft01Icon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PanelRightCloseIcon,
  PanelRightOpenIcon,
  Menu01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftRightIcon,

  // Actions
  PlayIcon,
  Upload04Icon,
  Copy01Icon,
  Delete02Icon,
  Search01Icon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
  Maximize01Icon,
  PlusSignIcon,
  Settings01Icon,

  // Theme
  Sun01Icon,
  Moon02Icon,

  // Status
  CheckmarkCircle02Icon,
  CancelCircleIcon,
  ViewOffIcon,
  LockIcon,
  SquareUnlock02Icon,
  AlertCircleIcon,
  EyeIcon,

  // Content
  Scroll01Icon,
  Layout03Icon,
  BookOpen01Icon,
  HelpCircleIcon,

  // Workflow & AI
  WorkflowSquare03Icon,
  ZapIcon,
  SparklesIcon,
  Layers01Icon,

  // Communication
  Github01Icon,
  MessageSquareDiffIcon,
  Mail01Icon,
  CreditCardIcon,

  // UI primitives (shadcn)
  Tick02Icon,
  Loading03Icon,

  // Misc
  MoreHorizontalIcon,
  Clock01Icon,
  WebhookIcon,
  Cancel01Icon,
  Download04Icon,
  FileAddIcon,

  // Copilot / Input
  AtIcon,
  CommandIcon,
  CubeIcon,
  Image01Icon,

  // Blocks (workflow toolbar)
  BotIcon,
  Plug01Icon,
  GitBranchIcon,
  CodeIcon,
  ShieldUser as ShieldCheckIcon,
  UserIcon,
  Brain01Icon,
  RepeatIcon,
  DatabaseIcon,
  StickyNote01Icon,
  GitForkIcon,
  BubbleChatIcon,
  Route01Icon,
} from "@hugeicons/core-free-icons";

export const icons = {
  // Navigation & Layout
  "sidebar": SidebarLeft01Icon,
  "panel-left-close": PanelLeftCloseIcon,
  "panel-left-open": PanelLeftOpenIcon,
  "panel-right-close": PanelRightCloseIcon,
  "panel-right-open": PanelRightOpenIcon,
  "menu": Menu01Icon,
  "chevron-down": ArrowDown01Icon,
  "chevron-up": ArrowUp01Icon,
  "arrow-left": ArrowLeft01Icon,
  "arrow-right": ArrowRight01Icon,
  "arrow-left-right": ArrowLeftRightIcon,

  // Actions
  "play": PlayIcon,
  "upload": Upload04Icon,
  "copy": Copy01Icon,
  "delete": Delete02Icon,
  "search": Search01Icon,
  "zoom-in": ZoomInAreaIcon,
  "zoom-out": ZoomOutAreaIcon,
  "maximize": Maximize01Icon,
  "plus": PlusSignIcon,
  "settings": Settings01Icon,
  "close": Cancel01Icon,

  // Theme
  "sun": Sun01Icon,
  "moon": Moon02Icon,

  // Status
  "check-circle": CheckmarkCircle02Icon,
  "x-circle": CancelCircleIcon,
  "eye-off": ViewOffIcon,
  "eye": EyeIcon,
  "lock": LockIcon,
  "unlock": SquareUnlock02Icon,
  "alert-triangle": AlertCircleIcon,

  // Content
  "scroll-text": Scroll01Icon,
  "layout-template": Layout03Icon,
  "book-open": BookOpen01Icon,
  "help-circle": HelpCircleIcon,

  // Workflow & AI
  "workflow": WorkflowSquare03Icon,
  "zap": ZapIcon,
  "sparkles": SparklesIcon,
  "layers": Layers01Icon,

  // Communication
  "github": Github01Icon,
  "message-square": MessageSquareDiffIcon,
  "mail": Mail01Icon,
  "credit-card": CreditCardIcon,

  // Misc
  "more-horizontal": MoreHorizontalIcon,
  "clock": Clock01Icon,
  "webhook": WebhookIcon,
  "download": Download04Icon,
  "file-add": FileAddIcon,

  // UI primitives (shadcn)
  "tick": Tick02Icon,
  "loader": Loading03Icon,

  // Copilot / Input
  "at-sign": AtIcon,
  "slash": CommandIcon,
  "box": CubeIcon,
  "image": Image01Icon,
  "arrow-up": ArrowUp01Icon,

  // Blocks (workflow toolbar)
  "bot": BotIcon,
  "plug": Plug01Icon,
  "git-branch": GitBranchIcon,
  "code": CodeIcon,
  "shield-check": ShieldCheckIcon,
  "user": UserIcon,
  "brain": Brain01Icon,
  "repeat": RepeatIcon,
  "database": DatabaseIcon,
  "sticky-note": StickyNote01Icon,
  "git-fork": GitForkIcon,
  "message-circle": BubbleChatIcon,
  "route": Route01Icon,
} as const;

export type IconName = keyof typeof icons;
