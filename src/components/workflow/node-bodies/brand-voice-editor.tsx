"use client";

import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState, SerializedEditorState } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

const editorConfig: InitialConfigType = {
  namespace: "BrandVoiceEditor",
  theme: {
    ...editorTheme,
    /* Scale down the theme for sidebar use */
    heading: {
      ...editorTheme.heading,
      h3: "text-sm font-semibold tracking-tight",
    },
    paragraph: "text-xs leading-relaxed [&:not(:first-child)]:mt-3",
    quote: "mt-3 border-l-2 pl-3 text-xs italic",
  },
  nodes: [HeadingNode, QuoteNode],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function BrandVoiceEditor({
  editorSerializedState,
  onSerializedChange,
}: {
  editorSerializedState?: SerializedEditorState;
  onSerializedChange?: (state: SerializedEditorState) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <ToolbarPlugin>
            {() => (
              <div className="flex items-center border-b border-border px-2 py-1.5">
                <FontFormatToolbarPlugin />
              </div>
            )}
          </ToolbarPlugin>

          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  placeholder="Write your brand voice guidelines..."
                  className="relative block min-h-[180px] overflow-auto px-3 py-3 text-xs focus:outline-none"
                  placeholderClassName="text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-3 py-3 text-xs text-ellipsis select-none"
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>

          <HistoryPlugin />

          <OnChangePlugin
            ignoreSelectionChange
            onChange={(editorState: EditorState) => {
              onSerializedChange?.(editorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
