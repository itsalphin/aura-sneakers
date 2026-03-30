'use client';

import { useWishlistStore } from '@/stores/wishlistStore';

export function useWishlist() {
  const store = useWishlistStore();

  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    toggleItem: store.toggleItem,
    isInWishlist: store.isInWishlist,
    isEmpty: store.items.length === 0,
    itemCount: store.items.length,
  };
}
