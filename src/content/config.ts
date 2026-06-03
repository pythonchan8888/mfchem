import { defineCollection, z } from 'astro:content';

const catalogCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subcategories: z.array(z.string()),
    brands: z.array(z.string()),
    catalogPages: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  catalog: catalogCollection,
};
