"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Parallax speed multiplier. Positive = moves up slower. Default 0.3 */
  speed?: number;
  /** Extra vertical offset range in px. Default 100 */
  offset?: number;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
}

function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  offset = 100,
  className,
  containerClassName,
  width,
  height,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset * speed, -offset * speed]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ y }}
        className={cn(
          "w-full h-[110%] object-cover will-change-transform",
          className
        )}
      />
    </div>
  );
}

export { ParallaxImage };
export default ParallaxImage;
