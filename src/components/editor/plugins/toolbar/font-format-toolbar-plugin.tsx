"use client"

import { useCallback, useState } from "react"
import { $isTableSelection } from "@lexical/table"
import {
  $isRangeSelection,
  BaseSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical"

import { Icon } from "@/components/ui/icon"
import { useToolbarContext } from "@/components/editor/context/toolbar-context"
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import type { IconName } from "@/lib/icons"

const FORMATS: readonly { format: string; icon: IconName; label: string }[] = [
  { format: "bold", icon: "text-bold", label: "Bold" },
  { format: "italic", icon: "text-italic", label: "Italic" },
  { format: "underline", icon: "text-underline", label: "Underline" },
]

export function FontFormatToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [activeFormats, setActiveFormats] = useState<string[]>([])

  const $updateToolbar = useCallback((selection: BaseSelection) => {
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const formats: string[] = []
      FORMATS.forEach(({ format }) => {
        if (selection.hasFormat(format as TextFormatType)) {
          formats.push(format)
        }
      })
      setActiveFormats((prev) => {
        if (
          prev.length !== formats.length ||
          !formats.every((f) => prev.includes(f))
        ) {
          return formats
        }
        return prev
      })
    }
  }, [])

  useUpdateToolbarHandler($updateToolbar)

  return (
    <ToggleGroup
      value={activeFormats}
      onValueChange={setActiveFormats}
      variant="outline"
      size="sm"
    >
      {FORMATS.map(({ format, icon, label }) => (
        <ToggleGroupItem
          key={format}
          value={format}
          aria-label={label}
          onClick={() => {
            activeEditor.dispatchCommand(
              FORMAT_TEXT_COMMAND,
              format as TextFormatType
            )
          }}
        >
          <Icon name={icon} size="xs" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
