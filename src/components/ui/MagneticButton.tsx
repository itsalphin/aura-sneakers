"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Max offset in pixels. Default 10 */
  strength?: number;
  className?: string;
}

function MagneticButton({
  children,
  strength = 10,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Normalize to [-1, 1] based on element size, then scale by strength
    const normX = (deltaX / (rect.width / 2)) * strength;
    const normY = (deltaY / (rect.height / 2)) * strength;

    x.set(Math.max(-strength, Math.min(strength, normX)));
    y.set(Math.max(-strength, Math.min(strength, normY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export { MagneticButton };
export default MagneticButton;
