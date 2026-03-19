import type { ComponentProps } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";

export type NodeProps = ComponentProps<typeof Card> & {
  handles: {
    target: boolean;
    source: boolean;
  };
  nodeId?: string;
  toolbar?: React.ReactNode;
};

export const Node = ({ handles, className, toolbar, ...props }: NodeProps) => (
  <div className="group/node relative">
    {toolbar}
    <Card
      className={cn(
        "node-container relative h-auto gap-0 overflow-visible rounded-2xl p-0 transition-shadow duration-300 hover:shadow-glow-blue",
        className
      )}
      {...props}
    >
      {handles.target && <Handle position={Position.Left} type="target" />}
      {handles.source && <Handle position={Position.Right} type="source" />}
      {props.children}
    </Card>
  </div>
);

export type NodeHeaderProps = ComponentProps<typeof CardHeader>;

export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => (
  <CardHeader
    className={cn("gap-0.5 rounded-t-2xl border-b border-border-subtle bg-surface-overlay p-3!", className)}
    {...props}
  />
);

export type NodeTitleProps = ComponentProps<typeof CardTitle>;

export const NodeTitle = (props: NodeTitleProps) => <CardTitle {...props} />;

export type NodeDescriptionProps = ComponentProps<typeof CardDescription>;

export const NodeDescription = (props: NodeDescriptionProps) => (
  <CardDescription {...props} />
);

export type NodeActionProps = ComponentProps<typeof CardAction>;

export const NodeAction = (props: NodeActionProps) => <CardAction {...props} />;

export type NodeContentProps = ComponentProps<typeof CardContent>;

export const NodeContent = ({ className, ...props }: NodeContentProps) => (
  <CardContent className={cn("p-3", className)} {...props} />
);

export type NodeFieldsProps = ComponentProps<"div">;

export const NodeFields = ({ className, ...props }: NodeFieldsProps) => (
  <div className={cn("flex flex-col", className)} {...props} />
);

export type NodeFieldRowProps = ComponentProps<"div"> & {
  label: string;
  value?: string;
};

export const NodeFieldRow = ({
  label,
  value = "-",
  className,
  ...props
}: NodeFieldRowProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-4 border-t border-border-subtle px-3 py-1.5",
      className
    )}
    {...props}
  >
    <span className="shrink-0 text-sm md:text-xs text-muted-foreground">{label}</span>
    <span className="truncate text-right text-sm md:text-xs font-medium text-foreground">
      {value}
    </span>
  </div>
);

export type NodeStatusBarProps = ComponentProps<"div"> & {
  status?: "idle" | "running" | "success" | "error";
};

export const NodeStatusBar = ({ status, className, ...props }: NodeStatusBarProps) => {
  if (!status || status === "idle") return null;

  const colorMap = {
    running: "bg-primary",
    success: "bg-chart-2",
    error: "bg-destructive",
  };

  return (
    <div
      className={cn(
        "absolute right-0 bottom-0 h-6 w-1 rounded-bl-none rounded-r-none rounded-tl-sm",
        colorMap[status],
        className
      )}
      {...props}
    />
  );
};

export type NodeFooterProps = ComponentProps<typeof CardFooter>;

export const NodeFooter = ({ className, ...props }: NodeFooterProps) => (
  <CardFooter
    className={cn("rounded-b-2xl border-t border-border-subtle bg-surface-overlay p-3!", className)}
    {...props}
  />
);
