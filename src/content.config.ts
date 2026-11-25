import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    subtitle: z.string().optional(),
    catalog: z.boolean().optional().default(true),
    sticky: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    tocNumbering: z.boolean().optional().default(true),
    categories: z
      .union([z.array(z.string()), z.array(z.array(z.string()))])
      .optional()
      .default([]),
  }),
});

export const collections = {
  blog: blogCollection,
};
