import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-accent,#8B5CF6)]/15 text-[var(--color-accent,#8B5CF6)] border-[var(--color-accent,#8B5CF6)]/20",
  success:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  warning:
    "bg-amber-500/15 text-amber-400 border-amber-500/20",
  error:
    "bg-red-500/15 text-red-400 border-red-500/20",
  outline:
    "bg-transparent text-white/70 border-white/20",
};

function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export default Badge;
