import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import MobileMenu from "@/components/layout/MobileMenu";
import SearchOverlay from "@/components/layout/SearchOverlay";
import CookieConsent from "@/components/ui/CookieConsent";

/*
 * Fonts: Using Inter (body) and Space Grotesk (display headings) as stand-ins.
 * TODO: Replace with self-hosted Satoshi (body) and Clash Display (headings)
 *       once the font files are added to /public/fonts and configured via
 *       next/font/local.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AURA | Premium Sneakers",
    template: "%s | AURA",
  },
  description:
    "Discover premium sneakers engineered for legends. Exclusive drops, limited editions, and the finest footwear curated for those who refuse to blend in.",
  keywords: [
    "sneakers",
    "premium sneakers",
    "limited edition",
    "streetwear",
    "luxury footwear",
    "AURA",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aura-sneakers.com",
    siteName: "AURA",
    title: "AURA | Premium Sneakers",
    description:
      "Discover premium sneakers engineered for legends. Exclusive drops, limited editions, and the finest footwear.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AURA - Premium Sneakers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA | Premium Sneakers",
    description:
      "Discover premium sneakers engineered for legends. Exclusive drops, limited editions, and the finest footwear.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#050505] text-white min-h-screen font-[family-name:var(--font-body)] antialiased">
        <ToastProvider>
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileMenu />
          <SearchOverlay />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
