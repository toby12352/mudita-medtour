---
title: Sample article
description: A placeholder article that demonstrates Markdown content, schema validation, and static article routes.
pubDate: 2026-11-12
---

This is placeholder content. It exists to show that articles in `src/content/articles/` are validated against the collection schema and rendered as static pages.

## How articles work

Each article is one Markdown or MDX file in one language folder. `en/<file-name>.md` is published at `/articles/<file-name>/`, and `my/<file-name>.md` is published at `/my/articles/<file-name>/`. A file with the same name in the other folder is optional. When it exists, the language switcher opens it. The frontmatter provides the title, description, and publication date.

## Writing guidelines

- Use one `##` heading per main section.
- Keep paragraphs short for mobile readers.
- Set `draft: true` in the frontmatter to hide an article from production builds.

> Replace or delete this file once real articles are published. Remove the other language's copy as well if you no longer want it.
