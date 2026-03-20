"use client";

import { useState } from "react";
import type { SerializedEditorState } from "lexical";
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactContent,
} from "@/components/ai-elements/artifact";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandVoiceEditor } from "@/components/workflow/node-bodies/brand-voice-editor";

const INITIAL_EDITOR_STATE = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Brand Voice Guidelines",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "heading",
        version: 1,
        tag: "h3",
      },
      {
        children: [
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "Motivating without being pushy. Inclusive, never exclusive. We're a coach in your corner, not a drill sergeant.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "quote",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "Audience: ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Fitness-motivated adults (25-54) who value community, convenience, and premium experiences",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "Tone: ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Empowering, warm, aspirational. Celebrate effort over perfection. Every body is a Peloton body.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "Vocabulary: ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Use \"journey\" not \"program\". Use \"together\" not \"compete\". Use \"your pace\" not \"keep up\".",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

/* ── Compact variant — rendered inside the canvas node ── */

function CompactBody() {
  return (
    <Artifact className="m-3 shadow-none">
      <ArtifactHeader className="px-3 py-2">
        <ArtifactTitle className="text-xs font-semibold">
          Brand Voice Guidelines
        </ArtifactTitle>
      </ArtifactHeader>
      <ArtifactContent className="flex flex-col gap-3 px-3 py-3">
        <blockquote className="border-l-2 border-border pl-2.5 text-[11px] leading-relaxed text-muted-foreground italic">
          &ldquo;Motivating without being pushy. Inclusive, never exclusive. We&rsquo;re a coach in your corner, not a drill sergeant.&rdquo;
        </blockquote>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Audience</span>
            <span className="font-medium text-foreground">Fitness adults, 25-54</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Tone</span>
            <span className="font-medium text-foreground">Empowering &amp; warm</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Style</span>
            <span className="font-medium text-foreground">Community-first</span>
          </div>
        </div>
      </ArtifactContent>
    </Artifact>
  );
}

/* ── Expanded variant — rendered in the editor sidebar ── */

const VOICE_ATTRIBUTES = [
  { label: "Audience", value: "Fitness adults, 25-54" },
  { label: "Tone", value: "Empowering, warm, aspirational" },
  { label: "Style", value: "Community-first, inclusive" },
  { label: "Personality", value: "Coach in your corner" },
] as const;

const VOICE_DONTS = [
  "Never shame or guilt-trip — celebrate effort",
  "No elitist language or body comparison",
  "Avoid \"no excuses\" or \"no pain, no gain\"",
] as const;

function ExpandedBody() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(INITIAL_EDITOR_STATE);

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Voice attributes */}
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Voice Attributes
        </h4>
        <div className="flex flex-col gap-1.5">
          {VOICE_ATTRIBUTES.map((attr) => (
            <div
              key={attr.label}
              className="flex items-center justify-between rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <span className="text-xs text-muted-foreground">{attr.label}</span>
              <span className="text-xs font-medium text-foreground">{attr.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines editor */}
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Guidelines
        </h4>
        <BrandVoiceEditor
          editorSerializedState={editorState}
          onSerializedChange={setEditorState}
        />
      </section>

      {/* Dont's */}
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Avoid
        </h4>
        <div className="flex flex-col gap-1.5">
          {VOICE_DONTS.map((rule) => (
            <div
              key={rule}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-secondary/50 px-2.5 py-2"
            >
              <Icon name="x-circle" size="xs" className="shrink-0 text-destructive" />
              <span className="text-xs text-foreground">{rule}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="secondary" className="text-[10px]">Fitness</Badge>
        <Badge variant="secondary" className="text-[10px]">DTC</Badge>
        <Badge variant="secondary" className="text-[10px]">Community</Badge>
        <Badge variant="secondary" className="text-[10px]">Wellness</Badge>
      </div>

      {/* Open in Notion */}
      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
        <Icon name="book-open" size="xs" />
        Open in Notion
      </Button>

      {/* Source info */}
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Icon name="check-circle" size="xs" className="text-chart-2" />
        Synced from Notion &middot; Mar 12, 2026
      </div>
    </div>
  );
}

interface BrandVoiceBodyProps {
  variant?: "compact" | "expanded";
}

export function BrandVoiceBody({ variant = "compact" }: BrandVoiceBodyProps) {
  return variant === "compact" ? <CompactBody /> : <ExpandedBody />;
}
