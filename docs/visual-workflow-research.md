# Visual Workflow Builder Research — Competitors & Patterns

## Key Competitors

### Sim Studio (sim.ai) — YC X25
- **Canvas**: Figma-like multiplayer canvas with real-time collaboration
- **Build method**: Drag-drop blocks + natural language Copilot that auto-builds workflows
- **Node types**: Agent, Router, Function, Condition, API, Workflow, Parallel, Guardrails, Evaluator, Loop
- **Key feature**: Copilot generates nodes from natural language, 1,000+ integrations
- **Deploy as**: REST APIs, Slack bots, scheduled jobs
- Open source

### Weavy.ai — Creative Workflow Builder
- **Canvas**: Node-based canvas for creative/design workflows
- **Focus**: Multi-model orchestration for visual asset creation (not autonomous agents)
- **Node types**: Prompt, Generation model (Flux, SD, Runway), Editing tools (blur, crop, mask, inpaint, upscale)
- **Key feature**: "App Mode" — complex workflows surfaced as simplified UI forms for non-technical teammates
- Creative professional focused (designers, art directors)

### n8n — AI Agent Workflows
- **Canvas**: Free-form node-based drag-and-drop, 500+ integrations
- **Agent pattern**: AI Agent hub node with sub-components attached:
  - Language Model node (GPT, Claude)
  - Memory node (conversation history)
  - Tool nodes (search, database, HTTP)
  - Output Parser nodes
- **Key feature**: Human-in-the-loop approval nodes at any point, blends traditional automation with AI agents
- Open source, self-hostable

### OpenAI Agent Builder
- **Canvas**: Web-based visual canvas with Workflows/Drafts/Templates tabs
- **12 node types in 4 categories**:
  - Core: Start, Agent
  - Tools: File Search, MCP
  - Logic: If/Else, While Loop, User Approval, Guardrail
  - Data: Transform, State
- **Key feature**: Preview button for real-time testing, code export to TypeScript/Python, Guardrail nodes (PII, moderation, jailbreak prevention)
- Deploy via ChatKit (embeddable chat)

### Jasper — Marketing-Native
- **Three visual surfaces**:
  - Canvas: visual workspace for planning campaigns, mapping strategy to assets
  - Grid: spreadsheet-like interface for orchestrating repeatable content workflows
  - Studio: customizable app builder for proprietary workflows
- **100+ pre-built marketing agents** (Content Calendar, Social Media Campaign, etc.)
- Brand governance built in, cascading updates across channels

### Gumloop (YC-backed, Bryant Chou invested!)
- **Canvas**: No-code visual canvas, 130+ integrations
- **Key feature**: AI assistant "Gummie" builds workflows from natural language descriptions, renders as editable node graphs
- Marketing use cases: trend monitoring, content enrichment, sentiment analysis, personalization

### Others
- **Relevance AI**: Visual flowchart for GTM/sales agents
- **Make.com**: 3,000+ integrations, added AI Agent nodes in 2025

---

## UI/Interaction Design Pattern Summary

| Product | Canvas Type | Agent Paradigm | Build Method | Differentiator |
|---------|------------|---------------|-------------|----------------|
| Sim Studio | Figma-like multiplayer | Agent block + tools | Drag-drop + NL Copilot | Open source, collab, auto-build |
| Weavy.ai | Node-based creative | Multi-model orchestration | Connect gen + edit nodes | App Mode for non-technical users |
| n8n | Free-form nodes | Agent hub with sub-components | Attach LLM/memory/tools | 500+ integrations, human-in-the-loop |
| OpenAI Builder | Structured canvas | Agent + 12 node types | Drag, configure, preview | Code export, Guardrails |
| Jasper | Canvas + Grid + Studio | 100+ marketing agents | Campaign mapping | Marketing-native, brand governance |
| Gumloop | Node-based | AI workflows | NL → editable graph | AI builds from description |
