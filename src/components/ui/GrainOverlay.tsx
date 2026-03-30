import React from "react";
import { cn } from "@/lib/utils";

export interface GrainOverlayProps {
  /** Opacity of the grain texture. Default 0.04 */
  opacity?: number;
  className?: string;
}

function GrainOverlay({ opacity = 0.04, className }: GrainOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999]",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-filter)"
        />
      </svg>
    </div>
  );
}

export { GrainOverlay };
export default GrainOverlay;
