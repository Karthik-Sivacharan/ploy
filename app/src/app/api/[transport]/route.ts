import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { getDesignSystem } from "@/lib/mcp/tools/get-design-system";
import { listComponents } from "@/lib/mcp/tools/list-components";
import { getComponent } from "@/lib/mcp/tools/get-component";
import { searchComponents } from "@/lib/mcp/tools/search-components";

function jsonContent(result: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
  };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_design_system",
      {
        title: "Get Design System",
        description:
          "Returns the full Ploy design system: OKLCH tokens, icon registry, utility functions, font setup, and coding rules.",
        inputSchema: {},
      },
      async () => {
        const result = await getDesignSystem();
        return jsonContent(result);
      }
    );

    server.registerTool(
      "list_components",
      {
        title: "List Components",
        description:
          "Returns a summary of all available Ploy UI components with names, categories, file paths, and dependencies.",
        inputSchema: {},
      },
      async () => {
        const result = await listComponents();
        return jsonContent(result);
      }
    );

    server.registerTool(
      "get_component",
      {
        title: "Get Component",
        description:
          "Returns the full source code for a Ploy component by name, including its Storybook story and transitive dependency sources.",
        inputSchema: {
          name: z
            .string()
            .describe("The component name (e.g. 'button', 'card', 'badge')"),
          include_dependencies: z
            .boolean()
            .optional()
            .default(true)
            .describe(
              "Whether to include full source of dependency components"
            ),
        },
      },
      async ({ name, include_dependencies }) => {
        const result = await getComponent(name, include_dependencies);
        return jsonContent(result);
      }
    );

    server.registerTool(
      "search_components",
      {
        title: "Search Components",
        description:
          "Fuzzy-searches the Ploy component library by name, category, or description. Returns matching components ranked by relevance.",
        inputSchema: {
          query: z
            .string()
            .describe(
              "Search query (e.g. 'form input', 'navigation', 'modal')"
            ),
        },
      },
      async ({ query }) => {
        const result = await searchComponents(query);
        return jsonContent(result);
      }
    );
  },
  {
    serverInfo: {
      name: "ploy-registry",
      version: "1.0.0",
    },
  },
  {
    basePath: "/api",
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
