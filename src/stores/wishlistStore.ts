import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.productId === item.productId)) {
            return state;
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      toggleItem: (item) => {
        const { isInWishlist, removeItem, addItem } = get();
        if (isInWishlist(item.productId)) {
          removeItem(item.productId);
        } else {
          addItem(item);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
    }),
    {
      name: 'aura-wishlist-storage',
    }
  )
);
