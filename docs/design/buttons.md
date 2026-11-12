# Buttons

Buttons start actions. Links move between pages. Keeping that distinction makes it obvious what will happen when someone presses something.

## Button or link

Use **`Button`** (`src/components/ui/Button.astro`) to:

- Submit or start a task (send an inquiry, request a call, open a form)
- Toggle interface state (open a menu, expand a panel)

Use a **text link** to:

- Go from one content page to another ("Read articles", "View all", "Next: Recovery")
- Link to external sites, documents, or verification sources

`Button` accepts `href` and renders an `<a>` for the rare case where a link must look like the page's main action, such as the single entry point into an inquiry flow. Do not use it for ordinary content navigation.

The home welcome banner is one such case: its single `primary` `lg` button ("Read articles") links to the articles index. It is full width on small screens and sits at the inline end of the banner from `sm` (see [layout.md](layout.md)). When an inquiry flow exists, that becomes the home page's primary action and this button returns to a text link.

## Variants

| Variant     | Appearance                                                          | Use                                   |
| ----------- | ------------------------------------------------------------------- | ------------------------------------- |
| `primary`   | `bg-primary-700`, white text, `hover:bg-accent`                     | The single main action in a view      |
| `secondary` | `bg-surface`, `border-border`, `text-ink`, `hover:bg-surface-muted` | Alternative or less important actions |

The secondary button stays neutral. The gold secondary brand color is not a button color because it fails contrast on white (see [color.md](color.md)).

Sizes: `md` (default) and `lg` (hero or page-level action only).

Do not add variants or one-off button styles in pages. A new variant (for example a warning button) is a top-layer change.

## Rules

- At most one `primary` button per view.
- Button labels start with a verb and say what happens: "Send inquiry", not "Submit" or "Go".
- Keep labels short; they must not wrap on a 320px screen.
- On small screens, stack buttons vertically and full width (`flex-col sm:flex-row`). The home welcome banner already follows this.
- The hit area is at least 44 × 44px. `size="md"` with surrounding spacing meets this; icon-only buttons use `size-11`.
- Icon-only buttons need an accessible name (`<span class="sr-only">`).
- `<button>` defaults to `type="button"`; set `type="submit"` explicitly in forms.

## States

`Button` already handles hover, the global `:focus-visible` ring, and `disabled` (reduced opacity, no pointer events). Do not remove the focus outline. Prefer explaining why an action is unavailable over disabling a button with no message.
