import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Keep frontmatter fields in sync with the future `/admin` CMS `articles` collection (GitHub backend, not Git Gateway).
// Files live in one folder per locale (`en/`, `my/`); the same file name pairs the translations.
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '*/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
