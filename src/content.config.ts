import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The CMS saves a cleared field as '' or null. Treat that as an omitted field so the build
// does not fail on it; any other value is still validated.
const blankToUndefined = (value: unknown) =>
  value === null || (typeof value === 'string' && value.trim() === '') ? undefined : value;

const optionalText = z.preprocess(blankToUndefined, z.string().min(1).optional());
const optionalDate = z.preprocess(blankToUndefined, z.coerce.date().optional());

// Keep frontmatter fields in sync with the article collections in public/admin/config.yml
// (GitHub backend, not Git Gateway). One file per post, in `en/` or `my/`.
// The same file name links the two languages when both exist; it is not required.
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '*/*.{md,mdx}' }),
  schema: z.object({
    title: optionalText,
    description: optionalText,
    pubDate: optionalDate,
    updatedDate: optionalDate,
    draft: z.preprocess(blankToUndefined, z.boolean().default(false)),
  }),
});

export const collections = { articles };
