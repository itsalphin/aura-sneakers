'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useUIStore } from '@/stores/uiStore';
import type { Product } from '@/types/product';
import { BLUR_DATA_URL } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openQuickView } = useUIStore();
  const wishlisted = isInWishlist(product.id);

  const hasSecondaryImage = product.images.length > 1;
  const showBadge = product.tags.includes('new') || product.tags.includes('limited');
  const badgeText = product.tags.includes('limited') ? 'LIMITED' : 'NEW';

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        {/* Image area */}
        <div
          className="relative aspect-square overflow-hidden rounded-xl bg-[#141414]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Primary image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.05 : 1,
              opacity: isHovered && hasSecondaryImage ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </motion.div>

          {/* Secondary image */}
          {hasSecondaryImage && (
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.05 : 1,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>
          )}

          {/* Badge */}
          {showBadge && (
            <div className="absolute top-3 left-3 z-10">
              <span className={cn(
                'inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
                badgeText === 'LIMITED'
                  ? 'bg-amber-500/90 text-black'
                  : 'bg-[var(--color-accent,#8B5CF6)] text-white'
              )}>
                {badgeText}
              </span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all duration-200 hover:bg-black/60"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-all duration-200',
                wishlisted ? 'fill-red-500 text-red-500' : 'text-white/70 hover:text-white'
              )}
            />
          </button>

          {/* Quick View overlay */}
          <motion.div
            className="absolute inset-0 z-[5] flex items-center justify-center bg-black/20"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            <motion.button
              onClick={handleQuickView}
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
            >
              Quick View
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1.5">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            {product.brand}
          </p>
          <h3 className="font-medium text-white/90 transition-colors group-hover:text-white">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-lg',
              product.comparePrice ? 'text-[var(--color-accent,#8B5CF6)]' : 'text-white/90'
            )}>
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-zinc-500 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Color dots */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.map((color) => (
                <span
                  key={color.id}
                  className={cn(
                    'h-3 w-3 rounded-full',
                    color.hex.toUpperCase() === '#FFFFFF' && 'border border-white/20'
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
