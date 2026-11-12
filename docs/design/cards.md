# Cards

Cards group a short summary and a link so visitors can scan a set of options. They belong on hub and listing pages, not inside articles.

## When to use

- Listing pages: articles, treatments, destinations, hospitals
- Hub sections on the home page ("Latest articles")

## When not to use

- Inside long-form article content. Use headings, lists, and (later) callouts instead.
- For a single item. A heading and paragraph is enough.
- To make content look busier. If items have no destination, use a list.

## Anatomy

`src/components/common/ArticleCard.astro` is the reference card.

- Container: `rounded-card border border-border bg-surface shadow-card p-6`, full height in its grid cell (`h-full flex flex-col`).
- Optional metadata first: date in `text-sm text-ink-muted` inside a `<time>` element.
- Heading: a real heading element at the correct level for the page (`headingLevel` prop), `text-xl`.
- The heading text is the link. Link text matches the title of the destination page.
- Description: one or two sentences, `text-ink-muted`.

## Links inside cards

The heading link is the only control. Do not wrap the whole card in an `<a>` and do not stretch the link over the card with an overlay; both make cards hard to use with screen readers and hide other content from selection. If a card needs a second action, add it as a separate, clearly labelled link.

## Content limits

- Title: aim for under about 70 characters.
- Description: one or two sentences. Long descriptions belong on the destination page.
- Images (when added): use `<Image />` from `astro:assets`, a fixed aspect ratio, and meaningful `alt` text, or `alt=""` if decorative. Use real photography only; no stock images presented as real facilities or people.

## Grids

Cards sit in a list so screen readers announce the count:

```astro
<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <li>
    <ArticleCard article={article} headingLevel="h3" />
  </li>
</ul>
```

One column on mobile, two from `sm`, three from `lg`. Do not exceed three columns for text cards.

## New card types

Treatment, destination, or hospital cards follow the same anatomy and grid. Creating one is a top-layer change: document it here and in the changelog.
