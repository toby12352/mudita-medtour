# Color

Color is calm and restrained. Neutral surfaces carry the content; the brand colors mark actions, interaction, and the occasional highlight. Colors are referenced by role, so values can change without touching components.

## Brand palette

| Role      | Value     | Token                  | Contrast on white | Job                                            |
| --------- | --------- | ---------------------- | ----------------- | ---------------------------------------------- |
| Primary   | `#7C0D29` | `primary-700`          | 10.8:1            | Resting brand color: primary buttons, links    |
| Accent    | `#A01839` | `accent`               | 7.8:1             | Interaction only: hover, focus, current page   |
| Secondary | `#F5BA45` | `secondary`, `-50/100` | 1.75:1 (fails)    | Highlight backgrounds and decorative bars only |

White text passes on primary (10.8:1) and accent (7.8:1). Gold passes only with dark text on top of it: `ink` 10:1, `primary-700` 6.2:1.

## Tokens

Defined in the `@theme` block of `src/styles/global.css` and used as Tailwind classes.

| Role                 | Token / class                          | Use                                                   |
| -------------------- | -------------------------------------- | ----------------------------------------------------- |
| Page background      | `bg-surface`                           | Default page and card background                      |
| Muted background     | `bg-surface-muted`                     | Neutral bands, hover fills                            |
| Footer bar           | `bg-primary-700`, `text-white`         | Site footer; icons hover to `text-secondary`          |
| Text                 | `text-ink`                             | Headings and body                                     |
| Secondary text       | `text-ink-muted`                       | Descriptions, metadata, captions                      |
| Borders and dividers | `border-border`                        | Card edges, section dividers                          |
| Brand, action        | `bg-primary-700`                       | Primary button, skip link                             |
| Link                 | `text-primary-700`                     | Standalone and prose links                            |
| Hover                | `hover:bg-accent`, `hover:text-accent` | Primary button hover, link hover                      |
| Current item         | `aria-[current=page]:text-accent`      | Current navigation item                               |
| Focus ring           | `outline-accent`                       | Set globally on `:focus-visible`                      |
| Highlight band       | `bg-secondary-50`, `bg-secondary-100`  | Hero band, featured panel; text stays `ink` or darker |
| Decorative bar       | `border-secondary`                     | Band edge, blockquote bar; never the only signal      |
| Brand tints          | `bg-primary-50`, `bg-primary-100`      | Subtle brand-tinted fills behind dark text            |

## Rules

- Use tokens only. No hex, `rgb()`, or arbitrary values (`bg-[#0a7]`) in components or pages.
- Do not use raw Tailwind palette colors (`bg-blue-600`, `text-gray-500`) for UI roles. Add a role token instead; that is a top-layer change.
- Never convey meaning with color alone. Pair every color signal with text or an icon (for example a warning label, not just a yellow box).
- White text appears only on `primary-700` or `accent`.
- Accent is for interaction states only. Do not use it for resting text, headings, or backgrounds, so it keeps signalling "this responds".
- Secondary gold is never text, an outline, a focus ring, an input border, or a meaningful icon on a light background. Use it as a background behind `ink` or `primary-700` text, or as a decorative bar. The one exception is the hover color of the footer's social icons, which sit on `primary-700` (6.2:1).
- On a `primary-700` background (the footer), the accent focus outline does not show; controls there use `focus-visible:outline-white` instead.
- Gold is not a button color; the secondary button stays a neutral outline.
- Use brand colors sparingly: at most one gold highlight band per page.

## Contrast (WCAG 2.2 AA)

- Body and small text: at least 4.5:1 against its background.
- Large text (24px or larger, or 19px bold) and interface parts such as button edges, input borders, and icons: at least 3:1.
- Check new token pairs with a contrast checker before use and note the result in the changelog.

## Status colors (reserved)

Clinical callouts will need `info`, `success`, `warning`, and `danger` roles (for example "when to seek urgent care"). They are not defined yet. When the first callout is built, add them to `@theme` as `--color-info`, `--color-warning`, and so on, with a matching light background for each, document them here, and record them in the changelog. Status colors are for status only, never decoration.

## Dark mode

Not supported yet. If added, it must swap token values only, so components do not change.
