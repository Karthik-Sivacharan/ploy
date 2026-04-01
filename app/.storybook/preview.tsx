import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/app/globals.css";
import "./fonts.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    // Set the CSS variable that next/font would normally set, and apply antialiased
    (Story) => (
      <div
        style={{
          "--font-clash-grotesk": '"Clash Grotesk"',
          fontFamily:
            'var(--font-clash-grotesk), ui-sans-serif, system-ui, sans-serif',
        } as React.CSSProperties}
        className="bg-background text-foreground antialiased"
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          "Primitives",
          "Canvas",
          [
            "Workflow",
            [
              "Canvas Controls",
              "Toolbar",
              "Usage Indicator",
              "Action Grid",
              "Config Panel",
              "Workflow Header",
              "Left Sidebar",
              "Config Panel Sidebar",
              "Full Canvas",
            ],
          ],
        ],
      },
    },
  },
};

export default preview;
