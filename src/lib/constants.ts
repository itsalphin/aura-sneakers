// ============================================
// AURA - Site-wide Constants
// ============================================

export const SITE_CONFIG = {
  name: 'AURA',
  tagline: 'Step Into the Extraordinary',
  description:
    'AURA is a premium sneaker destination for those who demand the extraordinary. Curated collections, exclusive drops, and a seamless shopping experience.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  creator: 'AURA Team',
  keywords: [
    'sneakers',
    'premium sneakers',
    'luxury footwear',
    'streetwear',
    'limited edition',
    'exclusive drops',
    'designer shoes',
  ],
} as const;

export const NAV_LINKS = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Men', href: '/category/men' },
  { label: 'Women', href: '/category/women' },
  { label: 'Brands', href: '/brands' },
  { label: 'Sale', href: '/sale' },
] as const;

export const CATEGORIES = [
  { id: 'men', name: 'Men', slug: 'men', image: '/images/categories/men.jpg' },
  { id: 'women', name: 'Women', slug: 'women', image: '/images/categories/women.jpg' },
  { id: 'unisex', name: 'Unisex', slug: 'unisex', image: '/images/categories/unisex.jpg' },
  { id: 'kids', name: 'Kids', slug: 'kids', image: '/images/categories/kids.jpg' },
  { id: 'limited', name: 'Limited Edition', slug: 'limited', image: '/images/categories/limited.jpg' },
] as const;

export const BRANDS = [
  'Nike',
  'Adidas',
  'Jordan',
  'New Balance',
  'Yeezy',
  'Puma',
  'Converse',
  'Vans',
  'Reebok',
  'Asics',
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Best Sellers', href: '/best-sellers' },
    { label: 'Sale', href: '/sale' },
    { label: 'All Sneakers', href: '/shop' },
    { label: 'Gift Cards', href: '/gift-cards' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Order Tracking', href: '/track-order' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Sustainability', href: '/sustainability' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/aura', icon: 'instagram' },
  { label: 'Twitter', href: 'https://twitter.com/aura', icon: 'twitter' },
  { label: 'TikTok', href: 'https://tiktok.com/@aura', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://youtube.com/@aura', icon: 'youtube' },
] as const;

export const SIZES = {
  us: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14'],
  eu: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '40', '40.5', '41', '42', '42.5', '43', '44', '44.5', '45', '46', '47', '48'],
} as const;

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Top Rated', value: 'rating' },
] as const;

export const ITEMS_PER_PAGE = 12;

// Tiny dark SVG placeholder for smooth image fade-in
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzE0MTQxNCIvPjwvc3ZnPg==';
