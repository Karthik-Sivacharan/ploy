"use client";

import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { NodeTypes, EdgeTypes, NodeMouseHandler, Node } from "@xyflow/react";
import { ReactFlowProvider, useReactFlow } from "@xyflow/react";
import { Canvas } from "@/components/ai-elements/canvas";
import { Edge } from "@/components/ai-elements/edge";
import { Connection } from "@/components/ai-elements/connection";
import { useWorkflowStore } from "@/stores/workflow-store";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { TriggerNode } from "@/components/workflow/nodes/trigger-node";
import { ActionNode } from "@/components/workflow/nodes/action-node";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

const edgeTypes: EdgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

function WorkflowCanvasInner({ children }: { children?: ReactNode }) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    setSelectedEdgeId,
    setConfigPanelOpen,
  } = useWorkflowStore();

  const isMobile = useIsMobile();
  const { fitView } = useReactFlow();

  /* Re-center the canvas when switching between mobile/desktop layouts */
  useEffect(() => {
    const timeout = setTimeout(
      () => fitView({ padding: isMobile ? 0.5 : 0.3, maxZoom: 0.85 }),
      100
    );
    return () => clearTimeout(timeout);
  }, [isMobile, fitView]);

  const handleNodeClick: NodeMouseHandler<Node> = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
      if (isMobile) {
        setConfigPanelOpen(true);
      }
    },
    [setSelectedNodeId, isMobile, setConfigPanelOpen]
  );

  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: { id: string }) => {
      setSelectedEdgeId(edge.id);
    },
    [setSelectedEdgeId]
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, [setSelectedNodeId, setSelectedEdgeId]);

  const defaultEdgeOptions = useMemo(
    () => ({ type: "animated" as const }),
    []
  );

  const fitViewOptions = useMemo(
    () => ({ maxZoom: 0.85, padding: isMobile ? 0.5 : 0.3 }),
    [isMobile]
  );

  return (
    <>
      <Canvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange as never}
        onEdgesChange={onEdgesChange as never}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        connectionLineComponent={Connection}
        defaultEdgeOptions={defaultEdgeOptions}
        fitViewOptions={fitViewOptions}
        panOnDrag
        /* On mobile: disable selection-on-drag so touch pan works naturally */
        selectionOnDrag={!isMobile}
      />
      {children}
    </>
  );
}

export function WorkflowCanvas({ children }: { children?: ReactNode }) {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner>{children}</WorkflowCanvasInner>
    </ReactFlowProvider>
  );
}
