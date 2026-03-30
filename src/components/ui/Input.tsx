"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      prefixIcon,
      suffixIcon,
      className,
      containerClassName,
      id,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-xs font-medium uppercase tracking-widest transition-colors duration-300",
              isFocused ? "text-[var(--color-accent,#8B5CF6)]" : "text-white/50"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {prefixIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {prefixIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-white/5 border-0 border-b-2 rounded-t-lg px-4 py-3 text-sm text-white placeholder:text-white/30",
              "outline-none transition-all duration-300",
              "border-b-white/10 focus:border-b-[var(--color-accent,#8B5CF6)]",
              "hover:bg-white/[0.07]",
              error && "border-b-red-500 focus:border-b-red-500",
              prefixIcon && "pl-10",
              suffixIcon && "pr-10",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />

          {suffixIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              {suffixIcon}
            </div>
          )}

          {/* Animated underline */}
          <div
            className={cn(
              "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 transition-all duration-300 ease-out",
              error
                ? "bg-red-500"
                : "bg-[var(--color-accent,#8B5CF6)]",
              isFocused ? "w-full" : "w-0"
            )}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
