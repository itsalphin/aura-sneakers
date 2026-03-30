import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/lib/mockData';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Product Not Found | AURA' };
  }

  return {
    title: `${product.name} | AURA`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AURA`,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products: same category, exclude current, max 4
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  // If not enough from same category, fill from other products
  const fillerProducts =
    relatedProducts.length < 4
      ? products
          .filter(
            (p) =>
              p.id !== product.id &&
              !relatedProducts.some((r) => r.id === p.id)
          )
          .slice(0, 4 - relatedProducts.length)
      : [];

  const related = [...relatedProducts, ...fillerProducts];

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
