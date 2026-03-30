'use client';

import { useCartStore } from '@/stores/cartStore';

export function useCart() {
  const store = useCartStore();

  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    totalItems: store.getTotalItems(),
    totalPrice: store.getTotalPrice(),
    isEmpty: store.items.length === 0,
    itemCount: store.items.length,
  };
}
