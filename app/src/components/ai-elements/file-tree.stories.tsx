import type { Meta, StoryObj } from "@storybook/react"
import {
  FileTree,
  FileTreeFolder,
  FileTreeFile,
  FileTreeIcon,
  FileTreeName,
  FileTreeActions,
} from "./file-tree"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Organisms/AI Elements/File Tree",
  component: FileTree,
  tags: ["autodocs"],
} satisfies Meta<typeof FileTree>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FileTree
      defaultExpanded={new Set(["src", "src/components"])}
      className="w-72"
    >
      <FileTreeFolder path="src" name="src">
        <FileTreeFolder path="src/components" name="components">
          <FileTreeFolder path="src/components/ui" name="ui">
            <FileTreeFile path="src/components/ui/button.tsx" name="button.tsx" />
            <FileTreeFile path="src/components/ui/input.tsx" name="input.tsx" />
            <FileTreeFile path="src/components/ui/card.tsx" name="card.tsx" />
          </FileTreeFolder>
          <FileTreeFolder path="src/components/workflow" name="workflow">
            <FileTreeFile path="src/components/workflow/canvas.tsx" name="canvas.tsx" />
            <FileTreeFile path="src/components/workflow/header.tsx" name="header.tsx" />
          </FileTreeFolder>
        </FileTreeFolder>
        <FileTreeFolder path="src/lib" name="lib">
          <FileTreeFile path="src/lib/utils.ts" name="utils.ts" />
          <FileTreeFile path="src/lib/icons.ts" name="icons.ts" />
        </FileTreeFolder>
        <FileTreeFolder path="src/stores" name="stores">
          <FileTreeFile path="src/stores/workflow-store.ts" name="workflow-store.ts" />
        </FileTreeFolder>
        <FileTreeFile path="src/app/layout.tsx" name="layout.tsx" />
        <FileTreeFile path="src/app/page.tsx" name="page.tsx" />
      </FileTreeFolder>
      <FileTreeFile path="package.json" name="package.json" />
      <FileTreeFile path="tsconfig.json" name="tsconfig.json" />
    </FileTree>
  ),
}

export const WithSelection: Story = {
  render: () => (
    <FileTree
      defaultExpanded={new Set(["src", "src/components"])}
      selectedPath="src/components/ui/button.tsx"
      onSelect={(path) => alert(`Selected: ${path}`)}
      className="w-72"
    >
      <FileTreeFolder path="src" name="src">
        <FileTreeFolder path="src/components" name="components">
          <FileTreeFile path="src/components/ui/button.tsx" name="button.tsx" />
          <FileTreeFile path="src/components/ui/input.tsx" name="input.tsx" />
        </FileTreeFolder>
        <FileTreeFile path="src/app/page.tsx" name="page.tsx" />
      </FileTreeFolder>
    </FileTree>
  ),
}

export const WithCustomIcons: Story = {
  render: () => (
    <FileTree defaultExpanded={new Set(["project"])} className="w-72">
      <FileTreeFolder path="project" name="project">
        <FileTreeFile
          path="project/README.md"
          name="README.md"
          icon={<Icon name="book" size="xs" className="text-primary" />}
        />
        <FileTreeFile
          path="project/package.json"
          name="package.json"
          icon={<Icon name="settings" size="xs" className="text-success" />}
        />
        <FileTreeFile
          path="project/.env"
          name=".env"
          icon={<Icon name="lock" size="xs" className="text-warning" />}
        />
      </FileTreeFolder>
    </FileTree>
  ),
}

export const WithActions: Story = {
  render: () => (
    <FileTree defaultExpanded={new Set(["src"])} className="w-80">
      <FileTreeFolder path="src" name="src">
        <FileTreeFile path="src/index.ts" name="index.ts">
          <span className="size-4" />
          <FileTreeIcon>
            <Icon name="file" size="xs" className="text-muted-foreground" />
          </FileTreeIcon>
          <FileTreeName>index.ts</FileTreeName>
          <FileTreeActions>
            <Button variant="ghost" size="icon-xs">
              <Icon name="settings" size="xs" />
            </Button>
            <Button variant="ghost" size="icon-xs">
              <Icon name="delete" size="xs" />
            </Button>
          </FileTreeActions>
        </FileTreeFile>
      </FileTreeFolder>
    </FileTree>
  ),
}
