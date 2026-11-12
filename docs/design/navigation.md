# Navigation

Visitors should always know where they are, how they got there, and how to reach the main sections. Navigation is small, predictable, and identical on every page.

## Header

`src/components/layout/Header.astro`, rendered by `MainLayout` on every page.

- Sticky at the top with a light translucent background and a bottom border.
- The logo on the left links to the home page. See [Logo](#logo).
- Main navigation items come from `mainNavigation` in `src/lib/navigation.ts`. Add sections there, never by hard-coding links in the header. Each item has an unprefixed `href` and a `labelKey` from `src/i18n/ui.ts`; the header localizes both.
- Keep top-level items few (about five or fewer) and order them by importance to patients.
- The current section is marked with `aria-current="page"` and styled `aria-[current=page]:text-accent`.

## Mobile menu

- Below `md`, a 44px menu button toggles the navigation. The language switcher stays outside the menu.
- The button uses `aria-expanded` and `aria-controls`; Escape closes the menu and returns focus to the button.
- The menu expands in the page flow rather than covering it.

## Logo

The brand lockup is `assets/logo/logo.jpg`: a square, stacked mark with the words "MUDITA MEDTOUR" under it, on a cream background. Health and hospital sites (Mayo Clinic, Bumrungrad) keep the logo small at the start of the header and let the page heading carry the message; this site does the same.

- **Header:** first item in the sticky bar, linking home. `size-20` (80px), so the wordmark under the mark stays legible. Rendered with `<Image>` from `astro:assets`, `densities={[1, 2]}`, `loading="eager"`.
- **Footer:** no logo. The footer is a slim copyright bar; see [Footer](#footer).
- Alt text is `site.name` ("Mudita Medtour"). The brand name is the same in every language, so it is not a translation key. Do not add a text wordmark next to the image; the link would be announced twice.
- Do not crop, recolor, stretch, or add effects to the logo. Keep it square (`size-*`).
- Do not place trust badges, ratings, or taglines next to the logo (marketplace pattern; see [principles.md](principles.md)).
- Do not use the logo as the hero. Page headings stay text.
- The same file supplies the favicon (32px PNG), the Apple touch icon (180px PNG), and the default `og:image` / `twitter:image` when a page passes no image. All are generated in `Seo.astro`.
- The cream background is part of the JPEG and shows as a soft tile on white and on `bg-surface-muted`. A transparent SVG would remove the tile and allow a shorter header; until then, use the file as given.

## Skip link

`MainLayout` renders a "Skip to content" link targeting `#main-content`. Every page keeps exactly one `<main id="main-content">`, provided by the layout.

## Breadcrumbs (when nesting exists)

Add breadcrumbs when a page sits two or more levels deep, for example Treatments, then Orthopedics, then Knee replacement.

- Render as `<nav aria-label="Breadcrumb">` with an ordered list, placed above the `h1`.
- The last item is the current page, not a link, with `aria-current="page"`.
- Build it as a shared component the first time it is needed (a top-layer change).

Article pages currently show a single "Articles" link above the title as a minimal breadcrumb.

## In-page contents

Long guides (roughly five or more `h2` sections) get an "On this page" list of jump links after the introduction. Each `h2` needs a stable `id`. Multi-page guides use a "Pages in this guide" list and a "Next" link at the bottom, following the NHS pattern.

## Footer

`src/components/layout/Footer.astro`.

A single slim `bg-primary-700` bar with white text. It does not repeat the logo or the main navigation; the sticky header carries both.

- **Copyright** at the inline start: `© {year} {site.name}` in `text-sm`.
- **Social links** at the inline end, behind a light `border-s` divider from `sm`: Line, Viber, Messenger, Facebook, in that order and no others. They come from `socialLinks` in `src/lib/site.ts`; replace the placeholder `#` hrefs there, not in the component.
- Each social link is an icon-only `size-11` link with a translated `sr-only` name (`footer.*` in `src/i18n/ui.ts`) and an `aria-hidden` inline SVG (Simple Icons, CC0). The list has a translated `aria-label`.
- Icons are white and turn gold (`hover:text-secondary`, 6.2:1 on primary) on hover. Accent is too close to primary to show on this bar, so the footer links override the focus outline color to white (`focus-visible:outline-white`); the outline itself stays.
- Below `sm`, the copyright sits on its own line and the icons move to the next line, aligned to the end.
- Will hold legal and trust links when they exist: medical disclaimer, editorial policy, privacy, accessibility statement, and contact details with a physical address. Keep them in the same bar style.
- Do not turn the footer into a second sitemap of every page.

## Language switcher

`src/components/layout/LanguageSwitcher.astro`, rendered by the header on every page. Languages and URLs are described in [languages.md](languages.md).

- Sits in the sticky bar, outside the mobile menu, so it is always visible: logo on the left, then the main navigation, then the switcher behind a `border-s` divider (below `md`: the switcher, then the menu button). The divider keeps the current section and the current language, both in accent, from reading as one group.
- Each language is named in itself ("English", "မြန်မာ") and marked with `lang` and `hreflang`.
- Each entry is a link to the same page in that language, not a `Button`: it moves to another page.
- The current language has `aria-current="true"` and uses the current-state accent, like the main navigation. Below `sm`, only the other language is shown so the bar fits at 320px.
- If the page has no translation, the link goes to that language's section index (for example its articles list). Published articles always have a translation; the build enforces it.
- The group is a `<nav>` with a translated `aria-label` ("Language"). Links are at least 44px high.
