'use client';

import { useRef, useEffect, useState } from 'react';

interface AboutVideoProps {
  src: string;
  mode?: 'background' | 'panel';
  className?: string;
}
const SKIP_START = 2;
const FADE_DURATION = 0.6;

export default function AboutVideo({ src, mode = 'panel', className = '' }: AboutVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(mode === 'background');
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy-load panel videos when they scroll into view
  useEffect(() => {
    if (mode === 'background') return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

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
        video.style.opacity = String(
          Math.min(1, (now - (fadeInEnd - FADE_DURATION * 1000)) / (FADE_DURATION * 1000))
        );
      } else if (t >= dur - 0.05) {
        video.currentTime = SKIP_START;
        video.style.opacity = '0';
        fadeInEnd = now + FADE_DURATION * 1000;
      } else if (t >= fadeOutStart) {
        video.style.opacity = String(
          Math.max(0, 1 - (t - fadeOutStart) / FADE_DURATION)
        );
      } else {
        video.style.opacity = '1';
      }

      rafId = requestAnimationFrame(tick);
    };

    const init = () => {
      setIsLoaded(true);
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
  }, [isVisible]);

  if (mode === 'background') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />
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

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {isVisible && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
