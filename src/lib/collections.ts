const P = (slug: string) => `/images/products/${slug}.jpeg`;

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  productIds: string[];
}

export const collections: Collection[] = [
  {
    id: 'col-1',
    name: 'Midnight Runners',
    slug: 'midnight-runners',
    tagline: 'Own the night',
    description:
      'Dark-toned performance shoes engineered for night runs and urban streets. Built for those who move when the city sleeps.',
    image: P('stealth'),
    productIds: ['prod-2', 'prod-8', 'prod-18', 'prod-6', 'prod-17'],
  },
  {
    id: 'col-2',
    name: 'Street Royalty',
    slug: 'street-royalty',
    tagline: 'Rule the pavement',
    description:
      'Bold lifestyle sneakers that command attention. Designed for those who turn sidewalks into runways and every step into a statement.',
    image: P('phantom'),
    productIds: ['prod-1', 'prod-3', 'prod-4', 'prod-14', 'prod-20'],
  },
  {
    id: 'col-3',
    name: 'The Vault',
    slug: 'the-vault',
    tagline: 'For collectors only',
    description:
      'Limited edition and rare releases reserved for true collectors. Once they\'re gone, they\'re gone. Every pair is a piece of history.',
    image: P('eclipse'),
    productIds: ['prod-5', 'prod-11', 'prod-13', 'prod-19', 'prod-10'],
  },
  {
    id: 'col-4',
    name: 'Court Dominance',
    slug: 'court-dominance',
    tagline: 'Built for greatness',
    description:
      'Engineered for the hardwood, designed for the culture. Maximum performance meets uncompromising style — from the court to the streets.',
    image: P('apex'),
    productIds: ['prod-9', 'prod-15', 'prod-7', 'prod-12', 'prod-16'],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
