'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import { BLUR_DATA_URL } from '@/lib/constants';
import { products } from '@/lib/mockData';
import Modal from '@/components/ui/Modal';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';

export default function QuickView() {
  const { isQuickViewOpen, quickViewProduct, closeQuickView } = useUIStore();
  const { addItem } = useCartStore();

  const product = products.find((p) => p.id === quickViewProduct);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Reset selections when product changes
  const handleClose = () => {
    closeQuickView();
    setSelectedSize(null);
    setSelectedColor(null);
  };

  if (!product) {
    return (
      <Modal isOpen={isQuickViewOpen} onClose={handleClose}>
        <p className="text-white/50">Product not found</p>
      </Modal>
    );
  }

  const selectedColorObj = product.colors.find((c) => c.id === selectedColor) ?? product.colors[0];

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColorObj?.name ?? '',
      quantity: 1,
      slug: product.slug,
    });

    handleClose();
  };

  return (
    <Modal
      isOpen={isQuickViewOpen}
      onClose={handleClose}
      className="max-w-2xl"
    >
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Image */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-[#141414] sm:w-64">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="256px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {product.brand}
            </p>
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  'text-lg font-bold',
                  product.comparePrice
                    ? 'text-[var(--color-accent,#8B5CF6)]'
                    : 'text-white'
                )}
              >
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-zinc-500 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          </div>

          {/* Color selector */}
          {product.colors.length > 0 && (
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor ?? product.colors[0]?.id}
              onSelect={setSelectedColor}
            />
          )}

          {/* Size selector */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                'w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300',
                selectedSize
                  ? 'bg-[var(--color-accent,#8B5CF6)] text-white hover:bg-[var(--color-accent,#8B5CF6)]/80'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              )}
            >
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
            </button>

            <Link
              href={`/shop/${product.slug}`}
              onClick={handleClose}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
            >
              View Full Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
