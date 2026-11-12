---
title: Sample article
description: A placeholder article that demonstrates Markdown content, schema validation, and static article routes.
pubDate: 2026-11-12
---

This is placeholder content. It exists to show that articles in `src/content/articles/` are validated against the collection schema and rendered as static pages.

## How articles work

Each article has one Markdown or MDX file per language, with the same file name: `en/<file-name>.md` becomes `/articles/<file-name>/`, and `my/<file-name>.md` becomes the Myanmar page at `/my/articles/<file-name>/`. The frontmatter at the top of each file provides the title, description, and publication date.

## Writing guidelines

- Use one `##` heading per main section.
- Keep paragraphs short for mobile readers.
- Set `draft: true` in the frontmatter to hide an article from production builds.

> Replace or delete this file and its Myanmar translation once real articles are published.
