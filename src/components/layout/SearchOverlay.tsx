"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";

const popularSearches = [
  "Air Max",
  "Running",
  "Limited Edition",
  "Jordan",
  "New Balance",
  "Yeezy",
];

const trendingProducts = [
  {
    id: "1",
    name: "Shadow Runner Pro",
    price: "$220",
    image: "/images/products/shadow-runner-pro.jpg",
    slug: "shadow-runner-pro",
  },
  {
    id: "2",
    name: "Obsidian Elite",
    price: "$310",
    image: "/images/products/obsidian-elite.jpg",
    slug: "obsidian-elite",
  },
  {
    id: "3",
    name: "Phantom Drift",
    price: "$185",
    image: "/images/products/phantom-drift.jpg",
    slug: "phantom-drift",
  },
];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Focus input when opening
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      // Small delay to let animation start
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
        >
          {/* Close button */}
          <div className="flex justify-end px-6 py-5">
            <button
              onClick={closeSearch}
              className="p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Close search"
              data-cursor="pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search content */}
          <div className="mx-auto max-w-2xl px-6 pt-8 pb-20">
            {/* Search input */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative"
            >
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-white/30" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sneakers, brands, collections..."
                className="w-full bg-transparent border-b border-white/10 py-4 pl-10 pr-4 text-2xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
            </motion.div>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-10"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/shop?q=${encodeURIComponent(term)}`}
                    onClick={closeSearch}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                    data-cursor="pointer"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Trending products */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-12"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-6">
                Trending
              </h3>
              <div className="space-y-4">
                {trendingProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 rounded-xl p-3 -mx-3 hover:bg-white/5 transition-colors duration-200"
                    data-cursor="pointer"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-white/40">{product.price}</p>
                    </div>
                    <Search className="h-4 w-4 text-white/40 shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
