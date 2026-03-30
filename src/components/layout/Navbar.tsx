"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, openMobileMenu, openSearch } = useUIStore();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      {/* Top row: logo centered, icons right */}
      <div className="h-16 md:h-20 grid grid-cols-3 items-center px-6 lg:px-12">
        {/* Left spacer */}
        <div />

        {/* Logo — center */}
        <Link
          href="/"
          className="font-black tracking-tighter text-5xl md:text-6xl text-white justify-self-center"
        >
          AURA
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-2 justify-self-end">
        {/* Search */}
        <button
          onClick={openSearch}
          className="p-2.5 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Search"
          data-cursor="pointer"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Wishlist */}
        <Link
          href="/account?tab=wishlist"
          className="relative p-2.5 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Wishlist"
          data-cursor="pointer"
        >
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative p-2.5 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Cart"
          data-cursor="pointer"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
              {totalItems}
            </span>
          )}
        </button>

        {/* Account */}
        <Link
          href="/account"
          className="hidden md:flex p-2.5 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Account"
          data-cursor="pointer"
        >
          <User className="h-5 w-5" />
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={openMobileMenu}
          className="md:hidden p-2.5 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Menu"
          data-cursor="pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        </div>
      </div>

      {/* Bottom row: nav links centered */}
      <nav className="hidden md:flex items-center justify-center gap-8 pb-3">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
