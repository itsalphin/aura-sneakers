'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Minus, Plus, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import Modal from '@/components/ui/Modal';
import type { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

// Mock review stats for display
const mockStats = {
  average: 4.7,
  count: 128,
  distribution: [80, 15, 3, 1, 1],
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0]?.id ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const selectedColorObj = product.colors.find((c) => c.id === selectedColor);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColorObj?.name ?? '',
      quantity,
      slug: product.slug,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-white/10 text-white/10'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Brand */}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        {product.brand}
      </p>

      {/* Name */}
      <h1 className="text-3xl font-bold text-white">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        {renderStars(mockStats.average)}
        <span className="text-sm text-white/60">{mockStats.average}</span>
        <span className="text-sm text-zinc-500">
          ({mockStats.count} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span
          className={cn(
            'text-2xl font-bold',
            product.comparePrice
              ? 'text-[var(--color-accent,#8B5CF6)]'
              : 'text-white'
          )}
        >
          {formatPrice(product.price)}
        </span>
        {product.comparePrice && (
          <span className="text-lg text-zinc-500 line-through">
            {formatPrice(product.comparePrice)}
          </span>
        )}
        {product.comparePrice && (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
            Save {formatPrice(product.comparePrice - product.price)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/50">
        {product.description}
      </p>

      <div className="h-px bg-white/[0.06]" />

      {/* Color selector */}
      {product.colors.length > 0 && (
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      )}

      {/* Size selector */}
      <div>
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />
        <button
          onClick={() => setShowSizeGuide(true)}
          className="mt-2 text-xs text-[var(--color-accent,#8B5CF6)] underline underline-offset-4 hover:text-[var(--color-accent,#8B5CF6)]/80 transition-colors"
        >
          Size Guide
        </button>
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-white/90">Quantity</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex h-10 w-14 items-center justify-center text-sm font-medium text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <div className="flex gap-3">
        <motion.button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'relative flex-1 overflow-hidden rounded-lg py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300',
            selectedSize
              ? 'bg-[var(--color-accent,#8B5CF6)] text-white hover:bg-[var(--color-accent,#8B5CF6)]/80'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          )}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative z-10">
            {addedToCart
              ? 'Added!'
              : !selectedSize
                ? 'Select a Size'
                : 'Add to Cart'}
          </span>
        </motion.button>

        <button
          onClick={handleWishlist}
          className={cn(
            'flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-lg border transition-all duration-200',
            wishlisted
              ? 'border-red-500/30 bg-red-500/10'
              : 'border-white/10 hover:border-white/20'
          )}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'h-5 w-5',
              wishlisted ? 'fill-red-500 text-red-500' : 'text-white/60'
            )}
          />
        </button>
      </div>

      {/* Shipping info */}
      <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <Truck className="h-5 w-5 text-white/40" />
        <span className="text-sm text-white/50">
          Free shipping on orders over $200
        </span>
      </div>

      {/* Size Guide Modal */}
      <Modal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)}>
        <h2 className="mb-4 text-lg font-bold text-white">Size Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 text-left text-xs font-semibold uppercase text-white/50">US</th>
                <th className="py-2 text-left text-xs font-semibold uppercase text-white/50">UK</th>
                <th className="py-2 text-left text-xs font-semibold uppercase text-white/50">EU</th>
                <th className="py-2 text-left text-xs font-semibold uppercase text-white/50">CM</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {[
                ['7', '6', '40', '25'],
                ['8', '7', '41', '26'],
                ['9', '8', '42', '27'],
                ['10', '9', '43', '28'],
                ['11', '10', '44.5', '29'],
                ['12', '11', '46', '30'],
                ['13', '12', '47.5', '31'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-white/[0.04]">
                  {row.map((cell, i) => (
                    <td key={i} className="py-2.5">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
