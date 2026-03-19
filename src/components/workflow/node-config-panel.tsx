"use client";

import { useState, useCallback } from "react";
import { useWorkflowStore } from "@/stores/workflow-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ActionGrid } from "@/components/workflow/action-grid";
import type { TriggerNodeData, ActionNodeData, TriggerType } from "@/lib/workflow/types";

function TriggerConfig({ nodeId, data }: { nodeId: string; data: TriggerNodeData }) {
  const { updateNodeData, deleteNode } = useWorkflowStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Trigger Type
        </label>
        <Select
          value={data.triggerType}
          onValueChange={(value) => {
            if (!value) return;
            const triggerType = value as TriggerType;
            updateNodeData(nodeId, {
              triggerType,
              label: triggerType.charAt(0).toUpperCase() + triggerType.slice(1),
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="schedule">Schedule</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Label</label>
        <Input
          value={data.label}
          onChange={(e) => updateNodeData(nodeId, { label: e.target.value })}
          placeholder="Label"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Description
        </label>
        <Input
          value={data.description}
          onChange={(e) =>
            updateNodeData(nodeId, { description: e.target.value })
          }
          placeholder="Optional description"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-fit gap-1.5 text-muted-foreground"
        onClick={() => deleteNode(nodeId)}
      >
        <Icon name="delete" size="sm" />
        Delete
      </Button>
    </div>
  );
}

function ActionConfig({ nodeId, data }: { nodeId: string; data: ActionNodeData }) {
  const { updateNodeData, deleteNode } = useWorkflowStore();
  const hasAction = Boolean(data.actionType);

  if (!hasAction) {
    return (
      <ActionGrid
        onSelectAction={(action) =>
          updateNodeData(nodeId, {
            actionType: action.id,
            label: action.label,
            description: action.description,
            provider: action.provider,
          })
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Action</label>
        <div className="flex items-center gap-2 rounded-lg border bg-secondary px-3 py-2 text-sm">
          <span className="font-medium">{data.label}</span>
          <span className="text-muted-foreground">({data.provider})</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Label</label>
        <Input
          value={data.label}
          onChange={(e) => updateNodeData(nodeId, { label: e.target.value })}
          placeholder="Label"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Description
        </label>
        <Input
          value={data.description}
          onChange={(e) =>
            updateNodeData(nodeId, { description: e.target.value })
          }
          placeholder="Optional description"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-fit gap-1.5 text-muted-foreground"
        onClick={() => deleteNode(nodeId)}
      >
        <Icon name="delete" size="sm" />
        Delete
      </Button>
    </div>
  );
}

function WorkflowConfig() {
  const { workflowName, setWorkflowName, nodes, edges } =
    useWorkflowStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Workflow Name
        </label>
        <Input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          placeholder="Workflow Name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Workflow ID
        </label>
        <Input
          value="demo-workflow-001"
          disabled
          placeholder="Workflow ID"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Icon name="layers" size="sm" />
          Clear
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Icon name="delete" size="sm" />
          Delete
        </Button>
      </div>
    </div>
  );
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function CopilotChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = useCallback(() => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
    ]);
    setInput("");
  }, [input]);

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              Ask the copilot to help you build workflows
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-secondary text-foreground"
                      : "text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border p-3">
        <div className="rounded-xl border border-border bg-muted/50 p-3">
          {/* Top row — @ and / buttons */}
          <div className="mb-2 flex items-center gap-1.5">
            <button className="flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground">
              <Icon name="at-sign" size="xs" />
            </button>
            <button className="flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground">
              <Icon name="slash" size="xs" />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Help me build a workflow"
            rows={1}
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          {/* Bottom row — actions */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button className="flex h-7 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-sm md:text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Icon name="box" size="xs" />
                Build
              </button>
              <button className="flex h-7 max-w-32 md:max-w-none items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-sm md:text-xs text-muted-foreground transition-colors hover:text-foreground">
                <span className="shrink-0 font-mono text-[10px] font-semibold">A\</span>
                <span className="truncate">Claude Opus 4.5</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground">
                <Icon name="image" size="sm" />
              </button>
              <button
                onClick={handleSubmit}
                className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/80"
              >
                <Icon name="arrow-up" size="xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TRIGGERS = [
  { name: "Outlook", logo: "outlook.com" },
  { name: "RSS Feed", logo: "rss.com" },
  { name: "Slack", logo: "slack.com" },
  { name: "Stripe", logo: "stripe.com" },
  { name: "Telegram", logo: "telegram.org" },
  { name: "Twilio Voice", logo: "twilio.com" },
  { name: "Typeform", logo: "typeform.com" },
  { name: "Webflow", logo: "webflow.com" },
  { name: "WhatsApp", logo: "whatsapp.com" },
] as const;

const BLOCKS = [
  { name: "Agent", icon: "bot" as const },
  { name: "API", icon: "plug" as const },
  { name: "Condition", icon: "git-branch" as const },
  { name: "Function", icon: "code" as const },
  { name: "Guardrails", icon: "shield-check" as const },
  { name: "Human in the Loop", icon: "user" as const },
  { name: "Knowledge", icon: "brain" as const },
  { name: "Loop", icon: "repeat" as const },
  { name: "Memory", icon: "database" as const },
  { name: "Note", icon: "sticky-note" as const },
  { name: "Parallel", icon: "git-fork" as const },
  { name: "Response", icon: "message-circle" as const },
  { name: "Router", icon: "route" as const },
] as const;

function ToolbarTab() {
  return (
    <div className="flex flex-col overflow-y-auto p-4">
      {/* Triggers */}
      <h3 className="mb-2 text-sm font-medium text-foreground">Triggers</h3>
      <div className="flex flex-col">
        {TRIGGERS.map(({ name, logo }) => (
          <button
            key={name}
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <img
              src={`https://cdn.brandfetch.io/${logo}/w/128/h/128`}
              alt={name}
              className="size-5 shrink-0 rounded"
            />
            {name}
          </button>
        ))}
      </div>

      <div className="my-3 border-t border-border" />

      {/* Blocks */}
      <h3 className="mb-2 text-sm font-medium text-foreground">Blocks</h3>
      <div className="flex flex-col">
        {BLOCKS.map(({ name, icon }) => (
          <button
            key={name}
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <div className="flex size-5 shrink-0 items-center justify-center rounded bg-primary/10">
              <Icon name={icon} size="xs" className="text-primary" />
            </div>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function NodeConfigPanel() {
  const { selectedNodeId, nodes } = useWorkflowStore();

  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  const renderProperties = () => {
    if (!selectedNode) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Select a node to edit its properties
          </p>
        </div>
      );
    }

    const nodeData = selectedNode.data;
    if (nodeData.type === "trigger") {
      return (
        <TriggerConfig
          nodeId={selectedNode.id}
          data={nodeData as TriggerNodeData}
        />
      );
    }

    return (
      <ActionConfig
        nodeId={selectedNode.id}
        data={nodeData as ActionNodeData}
      />
    );
  };

  return (
    <Tabs defaultValue="copilot" className="flex h-full flex-col py-4">
      <TabsList variant="line" className="w-full shrink-0 justify-center border-b px-4">
        <TabsTrigger value="copilot">Copilot</TabsTrigger>
        <TabsTrigger value="toolbar">Toolbar</TabsTrigger>
        <TabsTrigger value="editor">Editor</TabsTrigger>
      </TabsList>
      <TabsContent value="copilot" className="flex-1 overflow-hidden">
        <CopilotChat />
      </TabsContent>
      <TabsContent value="toolbar" className="flex-1 overflow-hidden">
        <ToolbarTab />
      </TabsContent>
      <TabsContent value="editor">{renderProperties()}</TabsContent>
    </Tabs>
  );
}
