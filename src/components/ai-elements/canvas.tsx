import type { ReactFlowProps } from "@xyflow/react";
import type { ReactNode } from "react";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type CanvasProps = ReactFlowProps & {
  children?: ReactNode;
};

const deleteKeyCode = ["Backspace", "Delete"];
const fitViewOptions = { maxZoom: 0.85, padding: 0.3 };

export const Canvas = ({ children, ...props }: CanvasProps) => (
  <ReactFlow
    deleteKeyCode={deleteKeyCode}
    fitView
    fitViewOptions={fitViewOptions}
    panOnDrag={false}
    panOnScroll
    selectionOnDrag={true}
    zoomOnDoubleClick={false}
    proOptions={{ hideAttribution: true }}
    {...props}
  >
    <Background
      variant={BackgroundVariant.Dots}
      bgColor="var(--background)"
      color="var(--border)"
      gap={24}
      size={1.5}
    />
    {children}
  </ReactFlow>
);
