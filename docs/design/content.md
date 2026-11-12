# Content

Content follows predictable structures so visitors know where to look on every page, and so each page carries the information that makes it trustworthy.

## Articles

Articles live in `src/content/articles/` and are validated by the schema in `src/content.config.ts`.

Every article is written in English and Myanmar, as two files with the same name: `en/<slug>.md` and `my/<slug>.md`. Both share `pubDate`, `updatedDate`, and `draft`; everything visible is translated. A production build fails if a published article is missing its translation. See [languages.md](languages.md).

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
