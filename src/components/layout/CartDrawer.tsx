"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";
import { BLUR_DATA_URL } from "@/lib/constants";
import { useCartStore } from "@/stores/cartStore";

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCartStore();

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Your Cart
                </h2>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-[10px] font-medium text-white/60">
                  {getTotalItems()}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-white/40 hover:text-white transition-colors"
                aria-label="Close cart"
                data-cursor="pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="h-12 w-12 text-white/30" />
                  <div>
                    <p className="text-sm font-medium text-white/50">
                      Your cart is empty
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Add some items to get started
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-white/90 transition-colors"
                    data-cursor="pointer"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-xl bg-white/[0.02] p-3 border border-white/5"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/shop/${item.slug}`}
                              onClick={closeCart}
                              className="text-sm font-medium text-white hover:text-white/80 transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-0.5 text-xs text-white/45">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 -mr-1 -mt-1 text-white/40 hover:text-white/70 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-2 rounded-full border border-white/10 px-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 text-white/40 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-medium text-white min-w-[1.25rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 text-white/40 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-sm font-medium text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">Subtotal</span>
                  <span className="text-base font-semibold text-white">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex items-center justify-center rounded-full border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/5 transition-colors"
                    data-cursor="pointer"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-white/90 transition-colors"
                    data-cursor="pointer"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
