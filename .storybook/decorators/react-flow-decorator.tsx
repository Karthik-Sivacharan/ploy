import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Decorator } from "@storybook/react";

export const ReactFlowDecorator: Decorator = (Story) => (
  <ReactFlowProvider>
    <div style={{ width: "100%", height: 500, position: "relative" }}>
      <Story />
    </div>
  </ReactFlowProvider>
);
