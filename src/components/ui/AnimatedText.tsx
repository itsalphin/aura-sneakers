"use client";

import React, { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AnimatedTextVariant = "fade-up" | "fade-in" | "slide-right";
export type SplitMode = "words" | "characters" | "none";

export interface AnimatedTextProps {
  children: string;
  variant?: AnimatedTextVariant;
  splitBy?: SplitMode;
  /** Delay before the entire animation starts (seconds) */
  delay?: number;
  /** Duration per item (seconds) */
  duration?: number;
  /** Stagger between items (seconds) */
  stagger?: number;
  className?: string;
  as?: React.ElementType;
}

/* ------------------------------------------------------------------ */
/*  Variant configs                                                    */
/* ------------------------------------------------------------------ */

const hiddenMap: Record<AnimatedTextVariant, Record<string, number>> = {
  "fade-up": { opacity: 0, y: 24 },
  "fade-in": { opacity: 0 },
  "slide-right": { opacity: 0, x: -30 },
};

const visibleMap: Record<AnimatedTextVariant, Record<string, number>> = {
  "fade-up": { opacity: 1, y: 0 },
  "fade-in": { opacity: 1 },
  "slide-right": { opacity: 1, x: 0 },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function AnimatedText({
  children,
  variant = "fade-up",
  splitBy = "words",
  delay = 0,
  duration = 0.5,
  stagger = 0.04,
  className,
  as: Tag = "div",
}: AnimatedTextProps) {
  const items = useMemo(() => {
    if (splitBy === "characters") return children.split("");
    if (splitBy === "words") return children.split(/(\s+)/);
    return [children];
  }, [children, splitBy]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: hiddenMap[variant],
    visible: {
      ...visibleMap[variant],
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={containerVariants as any}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {items.map((item, i) => {
        // Preserve whitespace tokens
        if (/^\s+$/.test(item)) {
          return (
            <span key={`space-${i}`} className="whitespace-pre">
              {item}
            </span>
          );
        }

        return (
          <motion.span
            key={`${item}-${i}`}
            variants={itemVariants as any}
            className="inline-block"
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {React.createElement(Tag as any, { className: 'inline' }, item)}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export { AnimatedText };
export default AnimatedText;
