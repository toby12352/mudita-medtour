# Design guidelines

These documents describe how the site looks and behaves, and why. Every page, component, and article follows them. Read the topic you are changing; you do not need to read the whole set.

Code is the source of truth for values. Token values live in the `@theme` block of [`src/styles/global.css`](../../src/styles/global.css), and component behavior lives in `src/components/`. These documents record the decisions and how to apply them, using the same token and component names.

## Topics

| File                           | Covers                                                       |
| ------------------------------ | ------------------------------------------------------------ |
| [principles.md](principles.md) | The rules every other decision follows                       |
| [typography.md](typography.md) | Fonts, type scale, headings, links, reading width            |
| [color.md](color.md)           | Color roles, tokens, contrast, status colors                 |
| [buttons.md](buttons.md)       | When to use a button versus a link, variants, states         |
| [navigation.md](navigation.md) | Header, mobile menu, breadcrumbs, in-page contents, footer   |
| [cards.md](cards.md)           | When to use cards, card anatomy, card grids                  |
| [layout.md](layout.md)         | Containers, breakpoints, spacing rhythm, right-to-left ready |
| [content.md](content.md)       | Article structure, trust information, page templates         |
| [languages.md](languages.md)   | English and Myanmar: URLs, translation files, switcher       |
| [changelog.md](changelog.md)   | Dated record of design decisions                             |

## Stable and interim decisions

Stable: the principles, accessibility requirements, component usage rules, layout widths, content structure, and the brand palette (burgundy primary, gold secondary, crimson accent).

Interim: the system font stack, until a licensed brand typeface is chosen. Replacing it means changing `--font-sans` in `global.css`; component code and these rules should not need to change.

## Keeping these documents current

A change is **top-layer** when later pages are expected to copy it:

- Anything in the `@theme` block, the `base` layer, or the `.prose-content` rules in `src/styles/global.css`
- The props or visual behavior of `Button`, `Container`, `Header`, `Footer`, `ArticleCard`, or `MainLayout`
- The navigation model in `src/lib/navigation.ts`
- The locales, URL scheme, or translation structure in `src/i18n/ui.ts` and `astro.config.mjs`
- A new shared component, breakpoint rule, or page or content template

A top-layer change is not finished until, in the same task:

1. The matching topic file here describes the new behavior.
2. The matching rule in `.cursor/rules/` is updated if a do or don't changed.
3. A dated line is added to [changelog.md](changelog.md).
4. If the change contradicts a principle, [principles.md](principles.md) is updated deliberately, not silently.

These are not top-layer: article copy, a one-off section built from existing components, and a bugfix that restores documented behavior.
