# Design changelog

Record every top-layer design change here, newest first: the date, what changed, and why. See [README.md](README.md) for what counts as top-layer.

## 2026-11-13: Blank article fields no longer fail the build

- A Netlify deploy failed because the editor saved a cleared Updated date as `updatedDate: ''`, which the schema read as an invalid date. `src/content.config.ts` now treats a missing, `null`, or empty value as omitted for every article field: `title`, `description`, `pubDate`, `updatedDate`, and `draft` (which falls back to `false`). Present but invalid values still fail.
- The article page hides the description, published date, or updated date when they are missing; the article card hides its date and description. Articles without `pubDate` sort last. A missing title leaves an empty heading, so authors should still fill it in; the editor still asks for it.
- Documented in [content.md](content.md#articles); `.cursor/rules/content.mdc` updated.

## 2026-11-13: Article editor at /admin

- Authors publish from `/admin` (Sveltia CMS 0.264.0). Login is GitHub. A save commits Markdown and images; Netlify rebuilds. No database and no Git Gateway. Documented in [content.md](content.md#articles) and the README.
- An article is one file in `en/` or `my/`. A matching translation is optional, and the language switcher falls back to that language's article list. The production build no longer fails when the other language is missing.
- `.cursor/rules/core.mdc`, `i18n.mdc`, and `content.mdc` updated.

## 2026-11-13: Hospital logos link out

- All seven hospital logos now link to the URLs the site owner supplied, in a new tab. The URLs are in `src/lib/hospitals.ts`.
- A hidden `sr-only` label, `common.opensInNewTab`, tells screen-reader users that each link opens a new tab. Nothing changes visually. Documented in [layout.md](layout.md#home-hospital-strip).
- Two links point to a different site than their logo names: the Phyathai Sriracha logo goes to the Phyathai group site, and the Samitivej Hospitals logo goes to Samitivej Chinatown. Three links open Thai-language pages.
- `.cursor/rules/ui.mdc` updated.

## 2026-11-13: Hospital strip heading, no pause button

- The hospital strip now opens like the how-it-works section: an `h2` "Featured Hospital Partners" (`home.hospitals.title`), the short primary bar, and a lead sentence about internationally accredited and ISO-certified facilities (`home.hospitals.lead`). The section uses standard `py-16` padding. Replaces the small "Hospitals" label. Documented in [layout.md](layout.md#home-hospital-strip).
- The pause button and its script are removed at the site owner's request. Hover and keyboard focus still pause the row, and reduced motion still shows a still row. This deliberately falls short of WCAG 2.2.2 for touch users (principle 6).
- The partner and accreditation wording is the site owner's choice. It is not yet checkable as principle 4 asks; naming the accrediting bodies with verification links is an open item for the hospital pages.
- `.cursor/rules/ui.mdc` and [principles.md](principles.md) updated.

## 2026-11-13: Home hospital strip

- New home-only component `HospitalStrip` between the welcome banner and how-it-works: a "Hospitals" label and one slow, endless row of seven Thai hospital logos (Piyavate, Phyathai Sriracha, Bangkok Hospital, Samitivej, Vejthani, Praram 9, Kluaynamthai). Documented in [layout.md](layout.md#home-hospital-strip).
- Principle 1 changed deliberately: this strip is the site's one moving element. It is a CSS marquee, not a slideshow, and it pauses on hover, on focus, and with a pause button (WCAG 2.2.2). Under reduced motion it becomes a still, wrapping row. Rating carousels and decorative motion elsewhere stay out.
- Labelled "Hospitals", not "partners" or "sponsors", because the page does not yet show a checkable relationship (principle 4).
- Logos are not links yet. `src/lib/hospitals.ts` has an optional `href` per hospital; adding a URL turns that logo into a link to the official site in a new tab.
- Logos load eagerly at low priority: lazy loading inside the moving, clipped row let logos slide into view blank.
- `.cursor/rules/ui.mdc`: new hospital-strip rule, and the carousel ban names this exception.

## 2026-11-13: Real contact details and Viber chooser

- Messenger and Facebook now link to the Mudita Medtour Facebook profile. On phones and tablets they try the Facebook app first (`fb://profile/<id>`, `src/scripts/app-links.ts`) and fall back to the website; desktops open the website.
- Viber has three numbers (two Myanmar, one Thai). The contact row and the footer icon are native `<details>` that list them through a new shared component, `ViberNumbers`. A dropdown rather than a modal: no JavaScript needed, and it stays clear of principle 5's ban on pop-ups.
- The Phone row is removed from the contact page, with its icon and strings. LINE is still a placeholder.
- `contactChannels` in `src/lib/site.ts` is now a union: link channels (`href`, optional `appHref`) and the Viber channel (`numbers`). `socialLinks` is derived from it.
- `.cursor/rules/content.mdc` and `.cursor/rules/ui.mdc` updated.

## 2026-11-13: Home banner slogan

- The home welcome panel now opens with the slogan "ကျန်းမာစွာအသက်ကြီးပါ" (`site.slogan` in `src/lib/site.ts`) instead of the site name, which the header logo already shows. Documented in [layout.md](layout.md#home-welcome-banner).
- Burmese on both locales by choice, marked `lang="my"` so the Myanmar font and heading-safe leading apply on English pages too. Not a translation key.
- Shown once, on the first screen. Not repeated beside the logo (no taglines there), in the footer, or on other pages, so it stays noticeable rather than becoming page chrome.
- `.cursor/rules/ui.mdc`: banner rule updated.

## 2026-11-13: Contact page

- New bilingual contact page at `/contact/` and `/my/contact/`, with Contact as the third main navigation item. Documented in [content.md](content.md#contact-page).
- No form: a single-column list of links that open the phone dialer, LINE, Viber, Messenger, or Facebook. Each row is one tappable link with an icon tile, the channel name, the number or account, and a verb. Bing's contact-page results and Bumrungrad's contact page informed the layout. Floating chat widgets and a row of loud buttons were rejected under principles 2 and 5.
- New shared component `BrandIcon` (`src/components/common/BrandIcon.astro`): the Simple Icons paths moved out of the footer, plus a phone outline. Footer and contact page both use it.
- Contact details live in `contactChannels` in `src/lib/site.ts`, as placeholders until the real numbers and accounts are supplied. Footer `socialLinks` read their URLs from it.
- `.cursor/rules/content.mdc`: contact details are edited only in `site.ts`.

## 2026-11-12: Shorter, sharper desktop banner

- From `lg` the home banner's height follows the illustration's 16:10 shape (an empty `lg:aspect-16/10` spacer in the picture column) instead of the screen height. At 1440 × 900 it is 535px tall instead of 810, and the whole picture shows uncropped.
- Why: filling the screen height made `object-fit: cover` scale the picture by height. Up to a third of it was cropped away, and it was drawn up to 2x larger than the file on Retina screens (1.63x at 1440 × 900). Now 1440 × 900 at 2x is 1.08x.
- `sizes` now describes the drawn width (`(min-width: 80rem) 60vw, (min-width: 64rem) 60rem, 160vw`). The old column-width `sizes` made the browser download a file narrower than the drawn picture, so even normal screens enlarged it ([Image Load Lab](https://imageloadlab.com/object-fit-cover-wasted-bytes/)).
- Phones and tablets keep the full-screen banner. Text panel padding at `lg` is now `py-12`, through the base `sm:py-12`.
- `.cursor/rules/ui.mdc`: banner rule updated.

## 2026-11-12: Full-screen home banner

- The home banner now fills the first screen below the header with a riverside Yangon skyline illustration (`assets/home/skyline.png`), replacing the small SVG drawing. Documented in [layout.md](layout.md#home-welcome-banner).
- New utility `min-h-first-screen` in `global.css`: `100svh` minus the header, as a minimum so translations can grow it. `svh` rather than `vh` so mobile browser bars do not hide the bottom.
- Responsive approach from hero-image guidance (web.dev art direction, imageguide.dev hero sizes): `object-fit: cover` with a center focal point, since the monuments sit mid-frame; a `srcset` of 640, 1024, and 1585px in AVIF and WebP with `sizes` per layout; `priority` loading for LCP. Separate phone and tablet crops were dropped: the source is too small for a crop to add detail, and the banner's image area is landscape on most phones.
- Text never sits on the picture. Phones and tablets stack the picture above a gold panel; from `lg` the panel sits at the inline start, half width on large tablets so the Myanmar heading keeps the button on screen at 1024 × 768, and 2/5 from `xl`.
- Principle 1 changed deliberately: the home illustration may fill the first screen. Text stays on a solid panel; full-screen photos, search heroes, and carousels stay out.
- `.cursor/rules/ui.mdc`: home banner rule updated.

## 2026-11-12: Simple footer bar

- The footer is now one slim `bg-primary-700` bar: `© {year} Mudita Medtour` at the start and four social icon links at the end (Line, Viber, Messenger, Facebook), following a client reference but in the brand burgundy instead of its purple gradient. Documented in [navigation.md](navigation.md#footer).
- The footer logo and the repeated main navigation were removed; the header keeps both. The unused `nav.footer` key was removed and `footer.*` keys added in both languages.
- Social links live in `socialLinks` in `src/lib/site.ts` with placeholder `#` hrefs until the real profile URLs are supplied. Icons are inline Simple Icons SVGs (CC0), with no icon dependency.
- New color pairs: white on `primary-700` (10.8:1) for text and icons, and gold `secondary` on `primary-700` (6.2:1) as the icon hover. This is a deliberate exception to "gold is never text or an icon", limited to the dark footer bar. Footer controls use a white focus outline because accent on primary does not show; recorded in [color.md](color.md).
- `.cursor/rules/ui.mdc`: logo is header-only, and a new footer rule.

## 2026-11-12: Home how-it-works section

- New home section after the welcome banner: six numbered steps (Contact, Planning, Travel, Procedure, Post-op, Follow-up) in `src/components/home/HowItWorks.astro`, with English and Myanmar strings under `home.steps.*`. Documented in [layout.md](layout.md#home-how-it-works-section).
- Look adapted from a numbered icon-tile diagram: burgundy `primary-700` tiles with white icons (10.8:1), numbered badges, and a dashed burgundy path. No new tokens or color pairs; accent stays for interaction.
- Layout follows current process-section practice: numbered steps, one sentence each, visibly joined. Six across is too narrow, so desktop (`lg`) uses two rows of three; phones and tablets get a single column with a vertical rail. It is an `<ol>`, not cards, because the steps have no destination.
- `.cursor/rules/ui.mdc`: rule for the new section next to the home banner rule.

## 2026-11-12: Logo

- The brand logo (`assets/logo/logo.jpg`) replaces the text site name at the start of the header (80px) and is added above the footer copyright (96px). Both link home. Placement follows health and hospital sites (Mayo Clinic, Bumrungrad): a small mark at the start of the bar, not a hero. Rules are in [navigation.md](navigation.md#logo).
- `site.name` is now "Mudita Medtour", shared by both languages. It is the logo alt text, page-title suffix, `og:site_name`, and copyright name.
- The teal placeholder `public/favicon.svg` was removed. `Seo.astro` now generates a 32px PNG favicon and a 180px Apple touch icon from the logo. The logo is the default `og:image` / `twitter:image` (summary card) when a page passes no image.
- The header bar is taller (about 88px) because the square, stacked lockup needs 80px for the wordmark to stay legible. A transparent horizontal SVG would allow a shorter bar later.

## 2026-11-12: Home welcome banner

- The home hero is now a larger welcome banner: site name, a plain-language `h1` (`home.heroTitle`), the lead paragraph, and an original decorative riverside skyline (`src/components/home/Skyline.astro`) with a still reflection along the bottom of the gold band. Documented in [layout.md](layout.md).
- "Read articles" is the banner's single `primary` `lg` button, at the inline end from `sm` and full width below. Until an inquiry flow exists it is the home page's main action; see [buttons.md](buttons.md).
- Principle 1 now names the banner illustration as the one place decorative imagery is allowed, and only below the text. Full-screen photos, search heroes, and carousels stay out.
- The skyline uses existing tokens only (`ink`, `ink-muted`, `primary-700`, `primary-100`, `secondary`, `secondary-50`). No new color pairs carry text.
- `.cursor/rules/ui.mdc`: the button example and the new home-illustration rule match these docs.

## 2026-11-12: English and Myanmar

- The site is bilingual: English at `/`, Myanmar at `/my/` (Astro i18n, `prefixDefaultLocale: false`, no fallback). Every page, UI string, and article must exist in both; documented in [languages.md](languages.md) and enforced for agents by `.cursor/rules/i18n.mdc`.
- Interface copy moved into `src/i18n/ui.ts`; `mainNavigation` items now have a `labelKey` instead of a `label`. `site.description`, `site.lang`, and `site.locale` were replaced by the dictionary and the current locale.
- Articles moved to `src/content/articles/en/` and `my/`, paired by file name. Production builds fail when a published article has no published translation.
- Page markup moved to shared views in `src/views/`, with one thin route per locale.
- Header: new `LanguageSwitcher` in the sticky bar, outside the mobile menu, so switching language is one tap on every page. It is a set of links, not a button, because it moves to another page.
- `MainLayout` sets `<html lang>` from the locale and accepts `alternates`; `Seo` emits `hreflang` alternates and `og:locale` per language. `formatDate` takes a locale and keeps Western digits.
- Typography: Noto Sans Myanmar (self-hosted, Myanmar subset) appended to `--font-sans`; headings on Myanmar pages use normal leading and tracking so stacked characters are not clipped.
- Principle 8 changed from "ready for other languages" to "every page in English and Myanmar".

## 2026-11-12: Brand palette

- Replaced the interim teal with the brand palette: primary `#7C0D29` (burgundy), accent `#A01839` (crimson), secondary `#F5BA45` (gold).
- Primary is the resting brand and link color (10.8:1 on white). `primary-700` keeps its name; the unused teal stops `primary-600`, `-800`, and `-900` were removed.
- Accent is reserved for interaction (7.8:1 on white): primary button hover, link hover, the global focus outline, and the current navigation item. Keeping it off resting content keeps hover and focus recognizable.
- Secondary gold fails contrast on white (1.75:1), so it is limited to highlight backgrounds behind dark text (`ink` 10:1, `primary-700` 6.2:1) and decorative bars. The secondary button stays neutral.
- Home hero band now uses `bg-secondary-50` with a `border-secondary` edge; prose blockquotes use a gold bar.

## 2026-11-12: Design system created

- Created the design guidelines (`docs/design/`) and project Cursor rules (`.cursor/rules/`). Based on NHS and Mayo Clinic health-content patterns, the NHS design system, WCAG 2.2 AA, and trust research on medical tourism websites.
- Recorded the teal `primary` palette and the system font stack as interim until a brand identity exists.
- `ArticleCard`: removed the stretched link overlay. The heading link is the only control, per [cards.md](cards.md).
- Home page: "Read articles" changed from a primary button to a text link, because it moves between content pages, per [buttons.md](buttons.md).
