'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';
import { BLUR_DATA_URL } from '@/lib/constants';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
      size: '10',
      color: 'Black',
    });
    removeItem(item.productId);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Account
          </Link>

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8">
              <Heart className="w-10 h-10 text-white/20" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h1>
            <p className="text-white/40 mb-8 max-w-sm">
              Save your favorite sneakers for later by adding them to your wishlist.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Account
        </Link>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Your Wishlist
        </h1>
        <p className="text-sm text-white/40 mb-10">
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Image */}
              <Link href={`/shop/${item.slug}`} className="relative block aspect-square bg-white/5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                    <span className="text-white/15 text-lg font-black uppercase tracking-wider">
                      Aura
                    </span>
                  </div>
                )}
              </Link>

              {/* Info */}
              <div className="p-4">
                <Link
                  href={`/shop/${item.slug}`}
                  className="text-sm font-medium text-white hover:text-[var(--color-accent,#8B5CF6)] transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-sm font-semibold text-white/70 mt-1">
                  {formatPrice(item.price)}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-xs font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="flex items-center justify-center w-10 rounded-lg border border-white/10 text-white/30 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/10 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
