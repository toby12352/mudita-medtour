# Typography

Typography carries most of the design. The goal is comfortable long-form reading on a phone and a clear, scannable hierarchy on every page.

## Font

- **Current (interim):** the system sans stack in `--font-sans` (`font-sans`). It is fast, legible, and covers many scripts.
- **Later:** a licensed brand typeface may replace it by changing `--font-sans` only. A serif may be added for article titles (`h1`) only; body text and interface text stay sans.
- Self-host any web font, subset it, and use `font-display: swap`. Do not load fonts from third-party CDNs.
- **Myanmar:** `--font-sans` ends with Noto Sans Myanmar (`@fontsource/noto-sans-myanmar`, Myanmar subset only, weights 400, 500, 600), imported at the top of `global.css`. Latin text keeps the system font; the browser downloads the Myanmar font only for pages with Burmese text. A brand typeface that replaces `--font-sans` must keep a Myanmar fallback.

## Scale

Headings are styled once in the `base` layer of `global.css`. Use the HTML element and let the base style apply; do not restyle headings per page.

| Element | Classes (from `global.css`)                       | Use                                  |
| ------- | ------------------------------------------------- | ------------------------------------ |
| `h1`    | `text-3xl sm:text-4xl lg:text-5xl leading-tight`  | Page title, once per page            |
| `h2`    | `text-2xl sm:text-3xl leading-snug`               | Main sections                        |
| `h3`    | `text-xl leading-snug`                            | Subsections and card titles          |
| Lead    | `text-lg` (`sm:text-xl` on the home hero)         | One summary paragraph under the `h1` |
| Body    | `text-base`, `sm:text-lg` inside `.prose-content` | Running text                         |
| Small   | `text-sm`                                         | Dates, metadata, footer              |

Do not add new sizes. If a new size seems necessary, it is a top-layer change (see [README.md](README.md)).

Body text never goes below `text-base` (16px). `text-sm` is for metadata only, never for paragraphs of content.

## Headings

- Exactly one `h1` per page.
- On Myanmar pages (`:lang(my)` in the `base` layer), headings use `leading-normal` and `tracking-normal`. Burmese stacks vowels and medials above and below the line, and the tight English leading and negative tracking clip them. Do not override heading leading on Myanmar pages.
- Follow heading levels in order; never skip a level to get a smaller size.
- Headings describe the section ("Recovery after surgery"), not a teaser ("What's next?").
- Card titles inside a section use the next level down. `ArticleCard` takes a `headingLevel` prop for this.

## Reading width and alignment

- Long text sits in `Container width="reading"` (`max-w-reading`, 46rem, about 70–80 characters per line).
- Summary paragraphs outside the reading container use `max-w-2xl`.
- Left-align text. Do not justify or center paragraphs. Centering is acceptable only for very short labels.

## Links

- Links inside prose are underlined (`.prose-content a`). Do not remove underlines from links in running text.
- Standalone links (for example "View all") use `text-primary-700 hover:text-accent font-medium`.
- Link text describes the destination. Avoid "click here" and "read more" without context.
- Do not include the final full stop in link text.

## Emphasis

Use bold sparingly for key terms. Avoid italics for emphasis and never underline non-links.

## Article bodies

Rendered Markdown uses the `.prose-content` class, which sets body size, paragraph spacing, list styles, links, and blockquotes. Add new Markdown element styles there, not in individual pages.
