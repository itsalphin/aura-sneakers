"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white hover:from-[#9D6FFF] hover:to-[#8B5CF6] shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20",
  secondary:
    "bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  ghost:
    "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  danger:
    "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      magnetic = false,
      className,
      children,
      disabled,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [magneticOffset, setMagneticOffset] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (!magnetic || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;

      const clampedX = Math.max(-10, Math.min(10, deltaX));
      const clampedY = Math.max(-10, Math.min(10, deltaY));

      setMagneticOffset({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      if (magnetic) {
        setMagneticOffset({ x: 0, y: 0 });
      }
    };

    const setRefs = (el: HTMLButtonElement | null) => {
      buttonRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      }
    };

    return (
      <button
        ref={setRefs}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide uppercase transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#8B5CF6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary,#050505)]",
          "disabled:opacity-50 disabled:pointer-events-none",
          "active:scale-[0.97]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          transform: magnetic
            ? `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`
            : undefined,
          transition: magnetic
            ? "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : undefined,
        }}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
