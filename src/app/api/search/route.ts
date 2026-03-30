import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        products: [],
        query: '',
        message: 'Please provide a search query using the ?q= parameter',
      });
    }

    const q = query.toLowerCase().trim();

    // TODO: Replace with Prisma full-text search or Algolia/MeiliSearch
    // const results = await prisma.product.findMany({
    //   where: {
    //     OR: [
    //       { name: { contains: q, mode: 'insensitive' } },
    //       { description: { contains: q, mode: 'insensitive' } },
    //       { tags: { hasSome: [q] } },
    //       { brand: { contains: q, mode: 'insensitive' } },
    //       { category: { name: { contains: q, mode: 'insensitive' } } },
    //     ],
    //   },
    //   include: { category: true, sizes: true, colors: true },
    //   take: 20,
    // });

    const results = products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.brand,
        product.category.name,
        ...product.tags,
        ...product.colors.map((c) => c.name),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(q);
    });

    return NextResponse.json({
      products: results,
      query,
      totalResults: results.length,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
