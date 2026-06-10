import { defineCollection, z } from 'astro:content';

const subcategorySchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    description: z.string(),
  }),
]);

const catalogCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subcategories: z.array(subcategorySchema),
    brands: z.array(z.string()),
    catalogPages: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  catalog: catalogCollection,
};
