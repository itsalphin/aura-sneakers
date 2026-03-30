'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback } from 'react';

/**
 * Image wrapper that prevents casual right-click saving and dragging.
 * Not bulletproof (devtools can always access images), but adds friction.
 */
export default function ProtectedImage(props: ImageProps) {
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <Image
      {...props}
      draggable={false}
      onContextMenu={handleContextMenu}
      style={{ ...props.style, userSelect: 'none', WebkitUserSelect: 'none' }}
    />
  );
}
