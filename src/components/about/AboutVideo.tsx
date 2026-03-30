'use client';

import { useRef, useEffect } from 'react';

interface AboutVideoProps {
  src: string;
  /** Fill the whole container as a background (overlays, dark tint, no controls) */
  mode?: 'background' | 'panel';
  className?: string;
}
const SKIP_START = 2;      // skip first 2 seconds
const FADE_DURATION = 0.6; // seconds to crossfade

export default function AboutVideo({ src, mode = 'panel', className = '' }: AboutVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let fadeInEnd = 0;

    const start = () => {
      video.currentTime = SKIP_START;
      video.play().catch(() => {});
    };

    const tick = () => {
      const now = performance.now();
      const t = video.currentTime;
      const dur = video.duration;

      if (!dur) { rafId = requestAnimationFrame(tick); return; }

      const fadeOutStart = dur - FADE_DURATION;

      if (now < fadeInEnd) {
        // Fade in after loop reset
        video.style.opacity = String(
          Math.min(1, (now - (fadeInEnd - FADE_DURATION * 1000)) / (FADE_DURATION * 1000))
        );
      } else if (t >= dur - 0.05) {
        // Hit end — reset to skip point and schedule fade-in
        video.currentTime = SKIP_START;
        video.style.opacity = '0';
        fadeInEnd = now + FADE_DURATION * 1000;
      } else if (t >= fadeOutStart) {
        // Fade out as we near the end
        video.style.opacity = String(
          Math.max(0, 1 - (t - fadeOutStart) / FADE_DURATION)
        );
      } else {
        video.style.opacity = '1';
      }

      rafId = requestAnimationFrame(tick);
    };

    const init = () => {
      start();
      rafId = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener('loadedmetadata', init, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (mode === 'background') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.85) 100%)',
          }}
        />
      </div>
    );
  }

  // Panel mode — fills its container, no extra overlays
  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      className={`w-full h-full object-cover ${className}`}
      aria-hidden="true"
    />
  );
}
