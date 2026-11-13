# Content

Content follows predictable structures so visitors know where to look on every page, and so each page carries the information that makes it trustworthy.

## Articles

Articles live in `src/content/articles/` and are validated by the schema in `src/content.config.ts`.

An article is one file in the language it was written in: `en/<slug>.md` or `my/<slug>.md`. A second file with the same name is optional. When both exist, the language switcher opens the pair. The slug stays English Latin letters. See [languages.md](languages.md).

Authors add posts at `/admin`. That page is Sveltia CMS: GitHub login, then a form for the fields below and a Markdown body. Images dropped into the body are stored in `public/images/articles` and linked as `/images/articles/<file>`. They are not run through `astro:assets`, so the author resizes a photo before uploading. `/admin` is not in the menu and is marked `noindex`.

Required in every article:

- `title`: plain language, outcome first. "Hip replacement abroad: costs, recovery, and risks", not "THA overview".
- `description`: one or two sentences. Used for listings and search results.
- `pubDate`, and `updatedDate` whenever the content is materially revised. Visitors see both on the page.

Body structure:

- Start with a short summary paragraph that answers the main question directly.
- One `##` per main section, in a logical order; `###` for subsections. Never start the body with `#`; the page title is the `h1`.
- Short paragraphs (two to four sentences). Use lists for steps, symptoms, options, and requirements.
- Cite sources at the end under `## Sources` with links to primary sources (health authorities, journals, accrediting bodies).
- End clinical content with a note that the page is general information and not medical advice or a treatment recommendation.

Do not add inline styles or HTML classes in Markdown. If an article needs a new element (a callout, a table style), add it to `.prose-content` or as an MDX component; that is a top-layer change.

## Trust information

Add these as the site grows. Each one should be visible, not buried:

- **Authorship and review:** who wrote the page and, for clinical content, who reviewed it, with their credentials.
- **Dates:** published, last updated, and (later) next review date.
- **Prices:** always a range, the currency, the date it was checked, what is included, and what is excluded.
- **Accreditation:** the accrediting body's name and a link to where it can be verified.
- **Process:** a short numbered "what happens next" sequence wherever an inquiry is possible, including who responds, how, and how soon.
- **Organization details:** registered name, physical address, and contact details in the footer. The footer currently holds only the copyright line and social links; add these when they exist.
- **Policies:** medical disclaimer, editorial policy, privacy, and accessibility statement, linked from the footer (not there yet).

## Contact page

`/contact/` and `/my/contact/` (`src/views/ContactView.astro`) list the ways to reach the team. There is no form and no backend.

- Reading-width `Container`, `py-12 sm:py-16`: the `h1`, one lead sentence, then a single-column `<ul>` with a translated `aria-label`.
- Order: LINE, Viber, Messenger, Facebook. There is no phone row. Each item is one link covering the whole row (it has no other control): a `size-11` `bg-surface-muted` tile with a `BrandIcon` in `text-primary-700`, the channel name, the account name, and a verb ("Chat on LINE"). Below `sm` the verb is `sr-only` and only a chevron shows. Rows are `rounded-card border border-border`, turning `bg-surface-muted` with an accent name on hover.
- Viber has several numbers, so its row is a native `<details>` with the same look: the summary reads "Myanmar and Thailand" and "Choose a number", and its chevron turns down when open. The open row lists each number with its country, from `ViberNumbers` (`src/components/common/ViberNumbers.astro`), which the footer shares. Not a modal: it works without JavaScript and opens only on request.
- Links open the app: `line.me/R/ti/p/@id` and `viber://chat?number=` directly. Messenger and Facebook link to the Facebook profile; on phones and tablets (touch, below `lg`) `src/scripts/app-links.ts` first tries the `appHref` (`fb://profile/<id>`) and falls back to the profile page after 1.5 seconds if the app does not open. Same tab, so the phone can hand the link to the app.
- Brand icons stay in the site palette, not each app's brand color. No primary button, floating chat widget, or sticky bar (see [principles.md](principles.md)).
- Numbers, account names, and URLs live in `contactChannels` in `src/lib/site.ts`; the footer social icons read the same list. Replace `value` and `href` together. Show Viber numbers as given, with the trunk prefix in brackets (`+95 (0) 9…`); the `viber://` link drops the `(0)`. LINE needs an official account ID (`@...`), not a phone number, and is still a placeholder.
- Add a "what happens next" note (who replies, how, and how soon) once response times can be promised.

## Treatment guide template (future)

When treatment pages are built, each follows this order so visitors can scan any guide the same way:

1. What it is (plain-language summary)
2. Who it is for
3. What happens (before, during, after)
4. Recovery and time abroad
5. Risks and complications
6. Cost range, dated, with inclusions and exclusions
7. Questions to ask a clinic
8. How to check a clinic or doctor
9. Sources

Use the same `h2` names across guides. Long guides get an "On this page" list (see [navigation.md](navigation.md)).

## Voice

- Address the reader as "you".
- Calm, factual, and specific. No superlatives ("best", "world-class") without evidence.
- Explain medical terms the first time they appear.
- Never promise outcomes.
- The same voice applies in Myanmar. Language-specific guidance is in [languages.md](languages.md).
