# Languages

The site is published in two languages, English and Myanmar (Burmese), with equal standing. Every page, interface string, and article exists in both. A visitor who switches language lands on the same page in the other language, never on a half-translated one.

## Locales and URLs

| Language | Code | URL prefix | Example                         |
| -------- | ---- | ---------- | ------------------------------- |
| English  | `en` | none       | `/articles/hip-replacement/`    |
| Myanmar  | `my` | `/my/`     | `/my/articles/hip-replacement/` |

English is the default locale. Locales are configured in `astro.config.mjs` (`i18n`) and in `locales` in `src/i18n/ui.ts`; keep the two lists the same.

There is no fallback: a Myanmar URL never shows English content. Missing translations are caught at build time instead (see below).

## Where translations live

| What                                                            | Where                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Interface copy: navigation, buttons, headings in templates, SEO | `ui` dictionary in `src/i18n/ui.ts`, one key per string, both languages     |
| Articles                                                        | `src/content/articles/en/<slug>.md` and `src/content/articles/my/<slug>.md` |
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

1. Write `src/content/articles/en/<slug>.md` and `src/content/articles/my/<slug>.md` in the same task.
2. Use the same file name (slug) in both folders; it pairs the translations and the language switcher.
3. Translate the title, description, headings, body, and source descriptions. Keep dates, figures, and source URLs identical.
4. Publish both together. A production build fails if a published article has no published translation.

Slugs stay in English Latin letters (`hip-replacement`) so URLs are stable and shareable.

## Language switcher

`LanguageSwitcher` (`src/components/layout/LanguageSwitcher.astro`) sits in the sticky header on every page, next to the menu button. See [navigation.md](navigation.md).

## Writing in Myanmar

- Use Unicode Myanmar text (not Zawgyi) and standard Burmese spelling.
- Write natural Burmese, not a word-for-word translation. The voice rules in [content.md](content.md) apply in both languages.
- On first use, give a medical term in Burmese followed by the English term in brackets, for example "အရိုးအဆစ်အစားထိုးခွဲစိတ်ကုသမှု (joint replacement)", because clinics and documents often use the English term.
- Keep Western digits (0–9) for prices, dates, and figures so they match the English page. Dates are formatted by `formatDate`, which does this.
- Clinical content in Myanmar should be reviewed by a fluent medical reader before publishing, just as the English is.

## SEO

`MainLayout` sets `<html lang>` from the current locale. `Seo` emits `hreflang` alternates for each translation plus `x-default` (English), and `og:locale` (`en_US`, `my_MM`). The sitemap lists the alternates too.
