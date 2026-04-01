import fs from "fs";
import path from "path";
import { designSystemRules } from "@/lib/mcp/rules";

const CLASH_GROTESK_CDN =
  "https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap";

const GEIST_MONO_CDN =
  "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap";

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
    cdn_link: string;
    css_variables: string;
    geist_mono_cdn: string;
    layout_snippet: string;
  };
  env_vars: {
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
      instructions: [
        "1. Add BOTH CDN link tags to your HTML <head> (or Next.js layout.tsx <head>):",
        "   - Clash Grotesk from Fontshare (primary sans font)",
        "   - Geist Mono from Google Fonts (code/mono font)",
        "2. Add CSS variable declarations to your root CSS file (e.g. globals.css) BEFORE the @theme block:",
        "   :root { --font-clash-grotesk: 'Clash Grotesk', sans-serif; --font-geist-mono: 'Geist Mono', ui-monospace, monospace; }",
        "3. These CSS variables are REQUIRED — the design tokens reference them via var(--font-clash-grotesk) and var(--font-geist-mono).",
        "   Without them, the CDN loads the font files but they never get applied.",
        "4. Add className=\"antialiased\" to <body>.",
      ].join("\n"),
      cdn_link: `<link href="${CLASH_GROTESK_CDN}" rel="stylesheet" />`,
      css_variables: `:root {\n  --font-clash-grotesk: 'Clash Grotesk', sans-serif;\n  --font-geist-mono: 'Geist Mono', ui-monospace, monospace;\n}`,
      geist_mono_cdn: `<link href="${GEIST_MONO_CDN}" rel="stylesheet" />`,
      layout_snippet: [
        `import type { Metadata } from "next";`,
        `import { ThemeProvider } from "next-themes";`,
        `import "./globals.css";`,
        ``,
        `export const metadata: Metadata = {`,
        `  title: "My App",`,
        `  description: "Built with Ploy Design System",`,
        `};`,
        ``,
        `export default function RootLayout({`,
        `  children,`,
        `}: Readonly<{`,
        `  children: React.ReactNode;`,
        `}>) {`,
        `  return (`,
        `    <html lang="en" suppressHydrationWarning>`,
        `      <head>`,
        `        <link`,
        `          href="${CLASH_GROTESK_CDN}"`,
        `          rel="stylesheet"`,
        `        />`,
        `        <link`,
        `          href="${GEIST_MONO_CDN}"`,
        `          rel="stylesheet"`,
        `        />`,
        `      </head>`,
        `      <body className="antialiased">`,
        `        <ThemeProvider`,
        `          attribute="class"`,
        `          defaultTheme="system"`,
        `          enableSystem`,
        `          disableTransitionOnChange`,
        `        >`,
        `          {children}`,
        `        </ThemeProvider>`,
        `      </body>`,
        `    </html>`,
        `  );`,
        `}`,
      ].join("\n"),
    },
    env_vars: {
      NEXT_PUBLIC_BRANDFETCH_CLIENT_ID:
        "Required for brand logos. Free client ID from https://developers.brandfetch.com/register — without it, ProviderIcon falls back to Hugeicons icons instead of brand logos. Add to .env.local",
    },
    rules: designSystemRules,
    npm_dependencies: {
      required: REQUIRED_DEPS,
      optional: OPTIONAL_DEPS,
    },
  };
}
