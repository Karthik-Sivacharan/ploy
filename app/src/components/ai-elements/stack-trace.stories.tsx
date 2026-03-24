import type { Meta, StoryObj } from "@storybook/react"
import {
  StackTrace,
  StackTraceHeader,
  StackTraceError,
  StackTraceErrorType,
  StackTraceErrorMessage,
  StackTraceActions,
  StackTraceCopyButton,
  StackTraceExpandButton,
  StackTraceContent,
  StackTraceFrames,
} from "./stack-trace"

const MOCK_TRACE = `TypeError: Cannot read properties of undefined (reading 'map')
    at renderCampaignList (src/components/campaign/campaign-list.tsx:42:18)
    at processChild (node_modules/react-dom/cjs/react-dom.development.js:1234:14)
    at processChildren (node_modules/react-dom/cjs/react-dom.development.js:1290:5)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:7420:14)
    at HTMLUnknownElement.callCallback (node_modules/react-dom/cjs/react-dom.development.js:188:14)
    at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:237:16)
    at performSyncWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:11089:24)`

const SHORT_TRACE = `ReferenceError: workflow is not defined
    at handleSubmit (src/components/workflow/workflow-editor.tsx:87:5)
    at onClick (src/components/ui/button.tsx:24:9)`

const meta = {
  title: "Organisms/AI Elements/Stack Trace",
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <StackTrace trace={MOCK_TRACE} className="max-w-2xl">
      <StackTraceHeader>
        <StackTraceError>
          <StackTraceErrorType />
          <StackTraceErrorMessage />
        </StackTraceError>
        <StackTraceActions>
          <StackTraceCopyButton />
          <StackTraceExpandButton />
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames />
      </StackTraceContent>
    </StackTrace>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <StackTrace trace={MOCK_TRACE} defaultOpen className="max-w-2xl">
      <StackTraceHeader>
        <StackTraceError>
          <StackTraceErrorType />
          <StackTraceErrorMessage />
        </StackTraceError>
        <StackTraceActions>
          <StackTraceCopyButton />
          <StackTraceExpandButton />
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames />
      </StackTraceContent>
    </StackTrace>
  ),
}

export const ShortTrace: Story = {
  render: () => (
    <StackTrace trace={SHORT_TRACE} defaultOpen className="max-w-2xl">
      <StackTraceHeader>
        <StackTraceError>
          <StackTraceErrorType />
          <StackTraceErrorMessage />
        </StackTraceError>
        <StackTraceActions>
          <StackTraceCopyButton />
          <StackTraceExpandButton />
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames />
      </StackTraceContent>
    </StackTrace>
  ),
}

export const HideInternalFrames: Story = {
  render: () => (
    <StackTrace trace={MOCK_TRACE} defaultOpen className="max-w-2xl">
      <StackTraceHeader>
        <StackTraceError>
          <StackTraceErrorType />
          <StackTraceErrorMessage />
        </StackTraceError>
        <StackTraceActions>
          <StackTraceCopyButton />
          <StackTraceExpandButton />
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames showInternalFrames={false} />
      </StackTraceContent>
    </StackTrace>
  ),
}

export const WithFilePathClick: Story = {
  render: () => (
    <StackTrace
      trace={SHORT_TRACE}
      defaultOpen
      className="max-w-2xl"
      onFilePathClick={(path, line) => alert(`Open ${path}:${line}`)}
    >
      <StackTraceHeader>
        <StackTraceError>
          <StackTraceErrorType />
          <StackTraceErrorMessage />
        </StackTraceError>
        <StackTraceActions>
          <StackTraceCopyButton />
          <StackTraceExpandButton />
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames />
      </StackTraceContent>
    </StackTrace>
  ),
}
