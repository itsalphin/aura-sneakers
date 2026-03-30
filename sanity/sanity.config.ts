import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import product from './schemas/product';
import category from './schemas/category';

export default defineConfig({
  name: 'aura-studio',
  title: 'AURA Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [product, category],
  },
});
