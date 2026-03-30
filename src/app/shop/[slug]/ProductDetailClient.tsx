'use client';

import { motion } from 'framer-motion';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import ProductCard from '@/components/product/ProductCard';
import Accordion from '@/components/ui/Accordion';
import type { Product } from '@/types/product';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)]">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        {/* Product detail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:gap-10 lg:grid-cols-2"
        >
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
          <ProductInfo product={product} />
        </motion.div>

        {/* Reviews accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Accordion
            items={[
              {
                id: 'reviews',
                title: `Reviews (128)`,
                content: <ProductReviews productId={product.id} />,
              },
              {
                id: 'details',
                title: 'Product Details',
                content: (
                  <div className="space-y-3 text-sm text-white/50">
                    <p>{product.description}</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>Brand: {product.brand}</li>
                      <li>Category: {product.category.name}</li>
                      <li>
                        Available Sizes:{' '}
                        {product.sizes
                          .filter((s) => s.inStock)
                          .map((s) => s.size)
                          .join(', ')}
                      </li>
                      <li>
                        Colors:{' '}
                        {product.colors.map((c) => c.name).join(', ')}
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                id: 'shipping',
                title: 'Shipping & Returns',
                content: (
                  <div className="space-y-2 text-sm text-white/50">
                    <p>Free standard shipping on all orders over $200.</p>
                    <p>Express shipping available at checkout for $15.</p>
                    <p>
                      Returns accepted within 30 days of delivery. Items must be
                      unworn and in original packaging.
                    </p>
                  </div>
                ),
              },
            ]}
            defaultOpen={['reviews']}
            multiple
          />
        </motion.div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20"
          >
            <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-white">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
