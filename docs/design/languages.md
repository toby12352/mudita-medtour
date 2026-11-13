# Languages

The site is published in two languages, English and Myanmar (Burmese), with equal standing. Every page and interface string exists in both. An article is published in the language it was written in; a matching file in the other language is optional. A visitor who switches language on a page lands on that page in the other language. On an article with no pair, the switcher goes to that language's article list.

## Locales and URLs

| Language | Code | URL prefix | Example                         |
| -------- | ---- | ---------- | ------------------------------- |
| English  | `en` | none       | `/articles/hip-replacement/`    |
| Myanmar  | `my` | `/my/`     | `/my/articles/hip-replacement/` |

English is the default locale. Locales are configured in `astro.config.mjs` (`i18n`) and in `locales` in `src/i18n/ui.ts`; keep the two lists the same.

There is no fallback: a Myanmar URL never shows English content. A missing interface string fails `npm run check`. A missing article translation does not fail the build.

## Where translations live

| What                                                            | Where                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Interface copy: navigation, buttons, headings in templates, SEO | `ui` dictionary in `src/i18n/ui.ts`, one key per string, both languages     |
| Articles                                                        | `src/content/articles/en/<slug>.md` or `my/<slug>.md`, one file per post    |
| Page markup                                                     | A shared view in `src/views/`, rendered by one route file per locale        |
| Brand name                                                      | `site.name` in `src/lib/site.ts`, the same in both languages                |
| Slogan                                                          | `site.slogan` in `src/lib/site.ts`, Burmese in both languages (`lang="my"`) |

Never hard-code visible text in a component or page; add a key to `ui` instead. `my` is typed against the English keys, so a missing Myanmar string fails `npm run check`.

## Adding a page

1. Build the markup once as a view in `src/views/`, reading text with `useTranslations(getLocale(Astro.currentLocale))`.
2. Add a route for each locale that renders the view, for example `src/pages/about/index.astro` and `src/pages/my/about/index.astro`.
3. Add every new string to both `en` and `my` in `src/i18n/ui.ts`.
4. Build internal links with `localizePath(locale, '/about/')`. Do not write `/my/` by hand.

## Adding an article

1. Write one file: `src/content/articles/en/<slug>.md` or `src/content/articles/my/<slug>.md`. Authors do this at `/admin`.
2. Keep the slug in English Latin letters (`hip-replacement`) so the URL is stable and shareable.
3. A second file with the same name is optional. When it exists, the language switcher opens it. Translate the title, description, headings, body, and image descriptions. Keep dates, figures, and source URLs identical.

## Language switcher

`LanguageSwitcher` (`src/components/layout/LanguageSwitcher.astro`) sits in the sticky header on every page, next to the menu button. See [navigation.md](navigation.md).

## Writing in Myanmar

- Use Unicode Myanmar text (not Zawgyi) and standard Burmese spelling.
- Write natural Burmese, not a word-for-word translation. The voice rules in [content.md](content.md) apply in both languages.
- On first use, give a medical term in Burmese followed by the English term in brackets, for example "အရိုးအဆစ်အစားထိုးခွဲစိတ်ကုသမှု (joint replacement)", because clinics and documents often use the English term.
- Keep Western digits (0–9) for prices, dates, and figures so they match the English page. Dates are formatted by `formatDate`, which does this.
- Clinical content in Myanmar should be reviewed by a fluent medical reader before publishing, just as the English is.

## SEO

`MainLayout` sets `<html lang>` from the current locale. When a page or article exists in both languages, `Seo` emits `hreflang` alternates for each plus `x-default` (English), and `og:locale` (`en_US`, `my_MM`). An article in one language does not claim the other. The sitemap lists the alternates that exist.
