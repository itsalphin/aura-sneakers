import { NextRequest, NextResponse } from 'next/server';
import { products, categories } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    // --- Filter ---
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.slug === category || p.categoryId === category
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // --- Sort ---
    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case 'popular':
        // Mock: featured items first, then by name
        filtered.sort((a, b) => {
          if (a.featured === b.featured) return a.name.localeCompare(b.name);
          return a.featured ? -1 : 1;
        });
        break;
      default:
        // Default: newest first
        filtered.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }

    // --- Paginate ---
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

    // TODO: Replace mock data with Prisma query
    // const products = await prisma.product.findMany({
    //   where: { ... },
    //   include: { category: true, sizes: true, colors: true },
    //   orderBy: { ... },
    //   skip: startIndex,
    //   take: limit,
    // });

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasMore: page < totalPages,
      },
      categories,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
