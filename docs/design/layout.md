# Layout

Layouts are mobile first, single column by default, and widen only when content benefits. Most visitors browse on phones, often on slow connections.

## Containers

Use `Container` (`src/components/ui/Container.astro`) for horizontal width and padding. Do not repeat `mx-auto max-w-* px-*` by hand.

| Width     | Token           | Value | Use                                    |
| --------- | --------------- | ----- | -------------------------------------- |
| `page`    | `max-w-page`    | 72rem | Default: hubs, listings, home sections |
| `reading` | `max-w-reading` | 46rem | Articles and any long-form text        |

Horizontal padding is built in: `px-4 sm:px-6 lg:px-8`. Use `as="section"` or `as="article"` when the container is also the semantic element.

## Breakpoints

Tailwind defaults, mobile first: base styles for small screens, then `sm` (40rem), `md` (48rem), `lg` (64rem). Do not add custom breakpoints. `md` is where the header switches from the mobile menu to inline navigation.

## Vertical rhythm

Spacing uses Tailwind's default 0.25rem scale.

| Context                     | Classes           |
| --------------------------- | ----------------- |
| Hero band                   | `py-16 sm:py-24`  |
| Standard page section       | `py-16`           |
| Page top (titles, articles) | `py-12 sm:py-16`  |
| Heading to content          | `mt-8` to `mt-10` |
| Title to lead paragraph     | `mt-4` to `mt-6`  |
| Grid gap                    | `gap-6`           |

Separate full-width bands with `bg-surface-muted` and `border-border` borders rather than heavy shadows or color blocks. A hero or one featured band per page may use the gold highlight instead: `bg-secondary-50` with a `border-secondary` edge, keeping text in `ink` or `primary-700`.

## Home welcome banner

The home page opens with an illustrated banner (`src/views/HomeView.astro`):

- Below `lg` the section fills the first screen under the sticky header with `min-h-first-screen` (defined in `global.css` as `100svh` minus the 5.5rem + 1px header). `svh` keeps the bottom in view while mobile browser bars show. It is a minimum: longer translations make the banner taller instead of clipping.
- Below `lg` it is a column: the illustration fills the space left above a text panel (at least `min-h-48`, `sm:min-h-72`). From `lg` it is two columns with the panel at the inline start: equal halves on large tablets, 2:3 (`xl:grid-cols-5`) on desktops.
- From `lg` the banner is not full screen. An empty `lg:aspect-16/10` spacer in the picture column sets its height to the illustration's own shape (1585 × 992 is 16:10), so the whole picture shows uncropped and is never drawn larger than needed. Stretching it to the screen height made `cover` scale it by height, crop a third of it, and enlarge it up to 2x on Retina screens. If the text panel is taller, the row grows and the picture crops slightly at the sides. Use a spacer, not `aspect-ratio` on the grid item itself: a stretched item with a ratio widens past its track.
- The text panel is `bg-secondary-50` with a `border-secondary` 4px bar against the picture (top below `lg`, inline end from `lg`) and the section's bottom edge. It holds the slogan, the `h1`, the lead paragraph, and the one primary button (full width below `sm`).
- The slogan (`site.slogan` in `src/lib/site.ts`, "ကျန်းမာစွာအသက်ကြီးပါ") opens the panel in Burmese on both locales, with no translation: a `<p lang="my">` in `text-primary-700 font-medium text-lg sm:text-xl leading-normal`. It replaced the site name, which the header logo already shows directly above. It is a brand line, not the `h1`. Show it only here: not on the picture, beside the logo, in the footer, or on other pages. Padding `py-8 sm:py-12`, centered vertically.
- `Skyline` (`src/components/home/Skyline.astro`) renders `assets/home/skyline.png` with `<Picture>` (AVIF and WebP, JPEG fallback, `priority` because it is the LCP image) and `alt=""`. It covers its column with `object-cover object-center`: the stupa, shrines, and reflection are in the middle of the picture, so narrow screens lose only the outer towers.
- `sizes` describes the **drawn** width, not the column width: `(min-width: 80rem) 60vw, (min-width: 64rem) 60rem, 160vw`. With `cover`, a tall box draws the picture wider than the box, and a file chosen for the box width would be enlarged. Update `sizes` whenever the banner layout changes.
- The source is 1585 × 992 px. Replace it with a master at least 2560px wide (same composition, subject centered) to keep it sharp on very large and high-density screens.

Do not reuse the banner image on other pages, put text on the picture, add a scrim, or animate it.

## Home how-it-works section

The welcome banner is followed by the patient journey in six steps (`src/components/home/HowItWorks.astro`): Contact, Planning, Travel, Procedure, Post-op, Follow-up.

- A neutral band: `bg-surface-muted`, `border-border` bottom edge, `py-16`. The page's one gold band stays on the hero.
- Centered `h2`, a short `bg-primary-700` bar (`h-0.5 w-12`), and a one-sentence lead. Each step is an `h3` and one sentence in `text-ink-muted`.
- Each step has a `bg-primary-700` `rounded-card` tile with a white line icon and a numbered badge overlapping its top edge, ringed in `surface-muted`. Numbers and text carry the order; the dashed `border-primary-700` path only joins the tiles.
- Below `lg` (phones and tablets): one start-aligned column, tile beside the text, with a dashed vertical rail between tiles.
- From `lg`: a 3-column grid, two rows (1–2–3, then 4–5–6), centered text. A dashed line joins the tiles in each row and reaches across the grid gap. Do not set six steps in one row; the sentences become too narrow.
- Markup is an `<ol>`, so screen readers announce the count and position; the visible numbers and icons are `aria-hidden`. Steps are not cards or links: they have no destination, and the page's primary action stays in the banner.

Keep each step to a short title and one sentence. Do not add response times or promises until an inquiry flow can back them up (see [content.md](content.md#trust-information)). No animation.

## Page structure

- `MainLayout` provides the header, `<main id="main-content">`, and footer. Every page uses it.
- Sections with a visible heading use `<section aria-labelledby="...">`.
- Avoid sidebars next to article text. On wide screens, an in-page contents list may sit beside the reading column; on small screens it appears above the content.

## Resilience

- No horizontal scrolling at 320px wide or at 200% zoom.
- No fixed heights on text containers; translations can be 20–35% longer.
- Long words and URLs must wrap (`break-words` where needed).
- Images use `<Image />` or `<Picture />` from `astro:assets` with explicit dimensions; only above-the-fold images use `loading="eager"`.

## Right-to-left ready

Prefer logical utilities so a future right-to-left language works by setting `dir="rtl"`:

- `ms-*` / `me-*` instead of `ml-*` / `mr-*`
- `ps-*` / `pe-*` instead of `pl-*` / `pr-*`
- `start-*` / `end-*` instead of `left-*` / `right-*`
- `text-start` / `text-end` instead of `text-left` / `text-right`
- `border-s` / `border-e` instead of `border-l` / `border-r`

Existing code still uses some physical properties (for example `pl-6` on prose lists); convert them when touching that code.

## Motion

Keep motion minimal and functional (color transitions on hover). The global reduced-motion rule disables animation for users who request it. Do not add scroll-triggered or decorative animation to content pages.
