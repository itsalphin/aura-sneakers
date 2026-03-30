'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { BLUR_DATA_URL } from '@/lib/constants';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const openLightbox = () => {
    setLightboxOpen(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    document.body.style.overflow = '';
  };

  const toggleZoom = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoom > 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2.5);
    }
  }, [zoom]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      const next = prev - e.deltaY * 0.002;
      return Math.min(4, Math.max(1, next));
    });
    if (zoom <= 1) setPan({ x: 0, y: 0 });
  }, [zoom]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [zoom, pan]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: panStart.current.x + dx, y: panStart.current.y + dy });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((i) => (i + 1) % images.length);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [images.length]);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [images.length]);

  // Keyboard nav in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        setSelectedIndex((i) => (i + 1) % images.length);
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) => (i - 1 + images.length) % images.length);
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, images.length]);

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div
          className="relative aspect-square overflow-hidden rounded-2xl bg-[#141414] cursor-zoom-in group"
          onClick={openLightbox}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} - View ${selectedIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5" />
            Click to zoom
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#141414] transition-all duration-200',
                  selectedIndex === index
                    ? 'ring-2 ring-[var(--color-accent,#8B5CF6)] ring-offset-2 ring-offset-[#0a0a0a]'
                    : 'ring-1 ring-white/10 hover:ring-white/30'
                )}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 z-10 p-2 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-6 left-6 z-10 text-white/40 text-sm font-medium">
                {selectedIndex + 1} / {images.length}
              </div>
            )}

            {/* Zoom hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/30 text-xs font-medium">
              {zoom > 1 ? 'Drag to pan · Double-click to reset' : 'Double-click to zoom · Scroll to zoom'}
            </div>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/40 hover:text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/40 hover:text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Zoomable image */}
            <div
              className={cn(
                'relative w-[85vmin] h-[85vmin] overflow-hidden',
                zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
              )}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={toggleZoom}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div
                className="w-full h-full transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transitionDuration: isDragging ? '0ms' : '200ms',
                }}
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`${productName} - View ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="85vmin"
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
