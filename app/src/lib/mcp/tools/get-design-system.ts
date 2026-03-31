import fs from "fs";
import path from "path";
import { designSystemRules } from "@/lib/mcp/rules";

const FONTSHARE_URL =
  "https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap";

const REQUIRED_DEPS = [
  "@hugeicons/react",
  "@hugeicons/core-free-icons",
  "class-variance-authority",
  "@base-ui/react",
  "clsx",
  "tailwind-merge",
  "tw-animate-css",
  "shadcn",
  "cmdk",
  "next-themes",
  "sonner",
  "embla-carousel-react",
];

const OPTIONAL_DEPS = [
  "@xyflow/react",
  "zustand",
  "dagre",
  "@types/dagre",
  "motion",
  "@radix-ui/react-use-controllable-state",
  "ai",
  "nanoid",
  "shiki",
  "streamdown",
  "@streamdown/cjk",
  "@streamdown/code",
  "@streamdown/math",
  "@streamdown/mermaid",
  "tokenlens",
  "ansi-to-react",
  "use-stick-to-bottom",
  "react-jsx-parser",
  "media-chrome",
  "fuse.js",
  "lexical",
  "@lexical/react",
  "@lexical/rich-text",
  "@lexical/table",
];

export interface DesignSystemResponse {
  project_setup: {
    instructions: string;
    stack: string[];
    init_commands: string[];
  };
  tokens: string;
  icons: string;
  utilities: string;
  providers: string;
  font_setup: {
    instructions: string;
    link_tag: string;
    css_variable: string;
    code_font: string;
  };
  env_vars: {
    NEXT_PUBLIC_PLOY_BRAND_PROXY_URL: string;
    NEXT_PUBLIC_BRANDFETCH_CLIENT_ID: string;
  };
  rules: string;
  npm_dependencies: {
    required: string[];
    optional: string[];
  };
}

function readFile(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(`Design system file not found: ${relativePath}`);
  }
}

export async function getDesignSystem(): Promise<DesignSystemResponse> {
  const tokens = readFile("src/app/globals.css");
  const icons = readFile("src/lib/icons.ts");
  const utilities = readFile("src/lib/utils.ts");
  const providers = readFile("src/lib/providers.ts");

  return {
    project_setup: {
      instructions: [
        "If starting from scratch, scaffold a new project with the init commands below.",
        "If a project already exists, skip to installing the required npm dependencies.",
        "After setup, copy the tokens (globals.css) into src/app/globals.css,",
        "the icons registry into src/lib/icons.ts, and the utilities into src/lib/utils.ts.",
        "Then use get_component() to fetch and install individual components as needed.",
      ].join(" "),
      stack: [
        "Next.js 16.x (App Router)",
        "TypeScript 5.x",
        "Tailwind CSS 4.x (OKLCH design tokens)",
        "shadcn/ui pattern (components in src/components/ui/)",
        "@xyflow/react (React Flow v12+) for workflow canvas",
        "Zustand for state management",
        "Hugeicons for icons (via registry pattern, never import directly)",
        "class-variance-authority (cva) for component variants",
        "Motion (Framer Motion) for animations",
        "next-themes for dark mode",
      ],
      init_commands: [
        "npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias '@/*'",
        "npm install @hugeicons/react @hugeicons/core-free-icons class-variance-authority @base-ui/react clsx tailwind-merge tw-animate-css shadcn cmdk next-themes sonner embla-carousel-react",
      ],
    },
    tokens,
    icons,
    utilities,
    providers,
    font_setup: {
      instructions:
        "Add the link tag to your HTML <head>. Fonts are served from Fontshare CDN — do not download or bundle them.",
      link_tag: `<link href="${FONTSHARE_URL}" rel="stylesheet" />`,
      css_variable: "--font-clash-grotesk: 'Clash Grotesk', sans-serif;",
      code_font:
        "Geist Mono — install via next/font/google or use: font-family: 'Geist Mono', monospace;",
    },
    env_vars: {
      NEXT_PUBLIC_PLOY_BRAND_PROXY_URL:
        "Optional. Override the brand logo proxy URL. Defaults to https://useploy.vercel.app.",
      NEXT_PUBLIC_BRANDFETCH_CLIENT_ID:
        "Optional. If set, ProviderIcon fetches logos directly from Brandfetch CDN instead of the proxy.",
    },
    rules: designSystemRules,
    npm_dependencies: {
      required: REQUIRED_DEPS,
      optional: OPTIONAL_DEPS,
    },
  };
}
