# Principles

The site helps international patients research treatment abroad. Visitors are often anxious, reading on a phone, and deciding something with real health and financial consequences. The design earns trust by being clear and checkable, not by being persuasive.

These principles come from how established health publishers (NHS, Mayo Clinic) present clinical information and from what medical tourism research shows patients look for before they trust a provider.

## 1. Information first

The content is the product. Typography and spacing do most of the work. Decoration, imagery, and motion support reading; they never compete with it.

The one exception is the home welcome banner: a still illustration may fill the first screen to make it feel calm and welcoming. The text sits beside or below it on a solid panel, never on the picture. It carries no meaning of its own and does not open the door to full-screen photos, search boxes, or carousels.

## 2. One clear next step

Each view has at most one primary action. Everything else is a secondary button or a text link. A visitor should never have to choose between several equally loud options.

## 3. Plain language

Write for a non-specialist reading in a second language. Lead with the patient outcome ("Knee replacement: what to expect"), then give the clinical name. Short sentences, short paragraphs, descriptive headings.

## 4. Every claim can be checked

Show who wrote or reviewed a page and when it was last updated. Accreditation names the accrediting body and links to where it can be verified. Prices are ranges with a date and a list of what is excluded. If a claim cannot be checked, do not make it.

## 5. No marketplace pressure

Do not use the patterns that make health sites feel like sales funnels:

- Full-screen photo heroes with a search box as the main content
- Rating carousels, countdowns, or "only N spots left"
- Sticky inquiry bars, chat pop-ups, or exit-intent overlays
- Advertising or product promotions next to clinical content
- Stock photography presented as real patients, doctors, or facilities

## 6. Accessible by default

Meet WCAG 2.2 AA everywhere: contrast, visible focus, keyboard access, 44px touch targets, sequential headings, and no meaning carried by color alone. Accessibility is a requirement, not a review step.

## 7. Fast and readable without JavaScript

Pages are static HTML. All reading content works without JavaScript. Use React islands only for genuine interaction, and keep content pages light enough to load on slow mobile connections.

## 8. Every page in English and Myanmar

The site is bilingual. English and Myanmar are equal: every page and article exists in both, and a visitor can switch language from any page and land on the same content (see [languages.md](languages.md)). Use logical CSS properties and flexible component heights so translated text (often 20–35% longer, and taller in Myanmar script) fits, and so more languages, including right-to-left scripts, can be added later without redesign.
