"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CarouselProps {
  children: React.ReactNode[];
  /** Show prev/next arrow buttons */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Auto-play interval in ms. 0 to disable */
  autoPlay?: number;
  /** Pause auto-play on hover */
  pauseOnHover?: boolean;
  /** Gap between items in px */
  gap?: number;
  /** How many items visible at once (approximate, flex-based) */
  itemWidth?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function Carousel({
  children,
  showArrows = true,
  showDots = true,
  autoPlay = 0,
  pauseOnHover = true,
  gap = 16,
  itemWidth = 300,
  className,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const totalItems = React.Children.count(children);

  // Calculate how far to scroll for each "page"
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current) return;
      const scrollAmount = index * (itemWidth + gap);
      trackRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    },
    [itemWidth, gap]
  );

  // Track scroll position to update activeIndex
  const handleScroll = useCallback(() => {
    if (!trackRef.current || isDragging) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    setActiveIndex(Math.max(0, Math.min(newIndex, totalItems - 1)));
  }, [itemWidth, gap, totalItems, isDragging]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalItems;
      scrollToIndex(nextIndex);
    }, autoPlay);

    return () => clearInterval(interval);
  }, [autoPlay, activeIndex, totalItems, isPaused, scrollToIndex]);

  const goNext = () => {
    const nextIndex = Math.min(activeIndex + 1, totalItems - 1);
    scrollToIndex(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      {/* Track */}
      <motion.div
        ref={trackRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ gap }}
        onScroll={handleScroll}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ width: itemWidth }}
          >
            {child}
          </div>
        ))}
      </motion.div>

      {/* Arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full flex items-center justify-center",
              "bg-black/60 backdrop-blur-sm border border-white/10",
              "text-white/60 hover:text-white hover:bg-black/80",
              "transition-all duration-200",
              "opacity-0 group-hover:opacity-100",
              "disabled:opacity-0 disabled:pointer-events-none"
            )}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={goNext}
            disabled={activeIndex >= totalItems - 1}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full flex items-center justify-center",
              "bg-black/60 backdrop-blur-sm border border-white/10",
              "text-white/60 hover:text-white hover:bg-black/80",
              "transition-all duration-200",
              "opacity-0 group-hover:opacity-100",
              "disabled:opacity-0 disabled:pointer-events-none"
            )}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalItems > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: totalItems }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 h-1.5 bg-[var(--color-accent,#8B5CF6)]"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { Carousel };
export default Carousel;
