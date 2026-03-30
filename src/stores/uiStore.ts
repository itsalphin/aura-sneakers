import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: string | null;

  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;

  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;

  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isQuickViewOpen: false,
  quickViewProduct: null,

  toggleCart: () =>
    set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () =>
    set({ isCartOpen: true }),
  closeCart: () =>
    set({ isCartOpen: false }),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openMobileMenu: () =>
    set({ isMobileMenuOpen: true }),
  closeMobileMenu: () =>
    set({ isMobileMenuOpen: false }),

  toggleSearch: () =>
    set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openSearch: () =>
    set({ isSearchOpen: true }),
  closeSearch: () =>
    set({ isSearchOpen: false }),

  openQuickView: (productId) =>
    set({ isQuickViewOpen: true, quickViewProduct: productId }),
  closeQuickView: () =>
    set({ isQuickViewOpen: false, quickViewProduct: null }),
}));
