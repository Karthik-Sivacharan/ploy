import fs from "fs";
import path from "path";
import { designSystemRules } from "@/lib/mcp/rules";

const FONTSHARE_URL =
  "https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap";

const REQUIRED_DEPS = [
  "@hugeicons/react",
  "@hugeicons/core-free-icons",
  "class-variance-authority",
  "@radix-ui/react-slot",
];

const OPTIONAL_DEPS = ["@xyflow/react", "zustand", "motion"];

export interface DesignSystemResponse {
  tokens: string;
  icons: string;
  utilities: string;
  font_setup: {
    instructions: string;
    link_tag: string;
    css_variable: string;
    code_font: string;
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

  return {
    tokens,
    icons,
    utilities,
    font_setup: {
      instructions:
        "Add the link tag to your HTML <head>. Fonts are served from Fontshare CDN — do not download or bundle them.",
      link_tag: `<link href="${FONTSHARE_URL}" rel="stylesheet" />`,
      css_variable: "--font-clash-grotesk: 'Clash Grotesk', sans-serif;",
      code_font:
        "Geist Mono — install via next/font/google or use: font-family: 'Geist Mono', monospace;",
    },
    rules: designSystemRules,
    npm_dependencies: {
      required: REQUIRED_DEPS,
      optional: OPTIONAL_DEPS,
    },
  };
}
