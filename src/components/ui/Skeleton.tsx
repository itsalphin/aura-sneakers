import React from "react";
import { cn } from "@/lib/utils";

export type SkeletonVariant = "text" | "image" | "card";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

function SkeletonPulse({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white/[0.06]",
        className
      )}
      style={style}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

function Skeleton({
  variant = "text",
  width,
  height,
  lines = 3,
  className,
  ...props
}: SkeletonProps) {
  if (variant === "text") {
    return (
      <div className={cn("space-y-2.5", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonPulse
            key={i}
            className="h-3.5 rounded"
            style={{
              width:
                width ??
                (i === lines - 1 ? "60%" : "100%"),
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "image") {
    return (
      <SkeletonPulse
        className={cn("aspect-square rounded-xl", className)}
        style={{
          width: width ?? "100%",
          height: height ?? undefined,
        }}
        {...props}
      />
    );
  }

  // card
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-4",
        className
      )}
      style={{ width: width ?? "100%" }}
      {...props}
    >
      <SkeletonPulse
        className="aspect-[4/3] rounded-xl"
        style={{ height: height ?? undefined }}
      />
      <div className="space-y-2.5">
        <SkeletonPulse className="h-4 w-3/4 rounded" />
        <SkeletonPulse className="h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonPulse };
export default Skeleton;
