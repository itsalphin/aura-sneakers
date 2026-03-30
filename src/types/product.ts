export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  model3d?: string;
  brand: string;
  category: Category;
  categoryId: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  reviews: Review[];
  featured: boolean;
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface ProductSize {
  id: string;
  size: string;
  inStock: boolean;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  images: string[];
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  userId: string;
  userName?: string;
  createdAt: Date;
}
