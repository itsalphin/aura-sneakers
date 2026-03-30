import Link from "next/link";
import { cn } from "@/lib/utils";

const shopLinks = [
  { label: "Men's", href: "/shop?category=mens" },
  { label: "Women's", href: "/shop?category=womens" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Sale", href: "/shop?sale=true" },
  { label: "All Products", href: "/shop" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/about" },
  { label: "Press", href: "/about" },
  { label: "Sustainability", href: "/about" },
];

const supportLinks = [
  { label: "Help Center", href: "/terms" },
  { label: "Shipping", href: "/terms" },
  { label: "Returns", href: "/terms" },
  { label: "Size Guide", href: "/shop" },
  { label: "Contact", href: "/about" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Simple social SVG icons */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2V12a4.85 4.85 0 01-2.66-.78 4.83 4.83 0 01-1.75-2.12V6.69h4.41z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const paymentMethods = [
  "Visa",
  "Mastercard",
  "Amex",
  "Apple Pay",
  "Google Pay",
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-bold tracking-tighter text-2xl text-white"
            >
              AURA
            </Link>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/60">
              Engineered for Legends
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/30">
              Premium sneakers crafted for those who refuse to blend in. Every
              step is a statement.
            </p>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        {/* Social + Payment row */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-5">
            {[
              { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
              { Icon: XIcon, label: "X / Twitter", href: "https://x.com" },
              { Icon: TikTokIcon, label: "TikTok", href: "https://tiktok.com" },
              { Icon: YouTubeIcon, label: "YouTube", href: "https://youtube.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40 border border-white/5"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 AURA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy" },
              { label: "Cookies", href: "/privacy#cookies" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/25 hover:text-white/50 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
