"use client";

import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { createContext, useContext } from "react";

type ChangeType = "major" | "minor" | "patch" | "added" | "removed";

interface PackageInfoContextType {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
}

const PackageInfoContext = createContext<PackageInfoContextType>({
  name: "",
});

export type PackageInfoProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
};

export const PackageInfo = ({
  name,
  currentVersion,
  newVersion,
  changeType,
  className,
  children,
  ...props
}: PackageInfoProps) => (
  <PackageInfoContext.Provider
    value={{ changeType, currentVersion, name, newVersion }}
  >
    <div
      className={cn("rounded-lg border bg-background p-4", className)}
      {...props}
    >
      {children ?? (
        <>
          <PackageInfoHeader>
            <PackageInfoName />
            {changeType && <PackageInfoChangeType />}
          </PackageInfoHeader>
          {(currentVersion || newVersion) && <PackageInfoVersion />}
        </>
      )}
    </div>
  </PackageInfoContext.Provider>
);

export type PackageInfoHeaderProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoHeader = ({
  className,
  children,
  ...props
}: PackageInfoHeaderProps) => (
  <div
    className={cn("flex items-center justify-between gap-2", className)}
    {...props}
  >
    {children}
  </div>
);

export type PackageInfoNameProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoName = ({
  className,
  children,
  ...props
}: PackageInfoNameProps) => {
  const { name } = useContext(PackageInfoContext);

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Icon name="package" size="xs" className="text-muted-foreground" />
      <span className="font-medium font-mono text-sm">{children ?? name}</span>
    </div>
  );
};

const changeTypeStyles: Record<ChangeType, string> = {
  added: "bg-primary/10 text-primary",
  major: "bg-destructive/10 text-destructive",
  minor: "bg-warning/10 text-warning-foreground",
  patch: "bg-success/10 text-success",
  removed: "bg-muted text-muted-foreground",
};

const changeTypeIcons: Record<ChangeType, React.ReactNode> = {
  added: <Icon name="plus" size={12} />,
  major: <Icon name="arrow-right" size={12} />,
  minor: <Icon name="arrow-right" size={12} />,
  patch: <Icon name="arrow-right" size={12} />,
  removed: <Icon name="minus" size={12} />,
};

export type PackageInfoChangeTypeProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoChangeType = ({
  className,
  children,
  ...props
}: PackageInfoChangeTypeProps) => {
  const { changeType } = useContext(PackageInfoContext);

  if (!changeType) {
    return null;
  }

  return (
    <Badge
      className={cn(
        "gap-1 text-xs capitalize",
        changeTypeStyles[changeType],
        className
      )}
      variant="secondary"
      {...props}
    >
      {changeTypeIcons[changeType]}
      {children ?? changeType}
    </Badge>
  );
};

export type PackageInfoVersionProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoVersion = ({
  className,
  children,
  ...props
}: PackageInfoVersionProps) => {
  const { currentVersion, newVersion } = useContext(PackageInfoContext);

  if (!(currentVersion || newVersion)) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-2 flex items-center gap-2 font-mono text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {currentVersion && <span>{currentVersion}</span>}
          {currentVersion && newVersion && (
            <Icon name="arrow-right" size={12} />
          )}
          {newVersion && (
            <span className="font-medium text-foreground">{newVersion}</span>
          )}
        </>
      )}
    </div>
  );
};

export type PackageInfoDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const PackageInfoDescription = ({
  className,
  children,
  ...props
}: PackageInfoDescriptionProps) => (
  <p className={cn("mt-2 text-muted-foreground text-sm", className)} {...props}>
    {children}
  </p>
);

export type PackageInfoContentProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoContent = ({
  className,
  children,
  ...props
}: PackageInfoContentProps) => (
  <div className={cn("mt-3 border-t pt-3", className)} {...props}>
    {children}
  </div>
);

export type PackageInfoDependenciesProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoDependencies = ({
  className,
  children,
  ...props
}: PackageInfoDependenciesProps) => (
  <div className={cn("space-y-2", className)} {...props}>
    <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Dependencies
    </span>
    <div className="space-y-1">{children}</div>
  </div>
);

export type PackageInfoDependencyProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  version?: string;
};

export const PackageInfoDependency = ({
  name,
  version,
  className,
  children,
  ...props
}: PackageInfoDependencyProps) => (
  <div
    className={cn("flex items-center justify-between text-sm", className)}
    {...props}
  >
    {children ?? (
      <>
        <span className="font-mono text-muted-foreground">{name}</span>
        {version && <span className="font-mono text-xs">{version}</span>}
      </>
    )}
  </div>
);
