import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Keep frontmatter fields in sync with the article collections in public/admin/config.yml
// (GitHub backend, not Git Gateway). One file per post, in `en/` or `my/`.
// The same file name links the two languages when both exist; it is not required.
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
