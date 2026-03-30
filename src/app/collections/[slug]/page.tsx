import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCollectionBySlug, collections } from '@/lib/collections';
import { products } from '@/lib/mockData';
import CollectionDetailClient from './CollectionDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: 'Collection Not Found | AURA' };
  }

  return {
    title: `${collection.name} | AURA`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = collection.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <CollectionDetailClient
      collection={collection}
      products={collectionProducts}
    />
  );
}
