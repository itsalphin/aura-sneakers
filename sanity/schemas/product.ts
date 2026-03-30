export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'comparePrice', title: 'Compare Price', type: 'number' },
    { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'featured', title: 'Featured', type: 'boolean' },
    { name: 'inStock', title: 'In Stock', type: 'boolean' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
  ],
};
