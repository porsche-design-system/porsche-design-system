---
applyTo: "packages/storefront/**"
---

# Storefront Package Instructions

This package contains the **Next.js / React documentation site**. The storefront must demonstrate best-practice accessible usage of Porsche Design System components and comply with **WCAG 2.2 AA**.

---

## Primary reference inside this repo

Follow the internal accessibility guidance page:

> `packages/storefront/src/app/must-know/accessibility/introduction/page.mdx`

It documents expected testing stages:
- AXE-Core automated checks
- A11y tree snapshots
- High Contrast Mode (HCM) visual regression tests
- 200% text zoom visual regression tests

---

## React/Next implementation rules

### Prefer PDS components

```tsx
// ✅ Prefer PDS React components
import { PButton, PLink } from '@porsche-design-system/components-react/ssr';

// ❌ Avoid re-inventing primitives like this:
<div onClick={handleClick} role="button">Click me</div>
```

- Use `@porsche-design-system/components-react` (or `/ssr` variant) when building UI primitives.
- When you must use native HTML, maintain semantic correctness and match PDS behavior.

---

### Keyboard accessibility (mandatory)

| Requirement | Implementation |
|-------------|----------------|
| Tab-reachable | All interactive elements reachable via Tab. |
| No traps | Users can always Tab out; overlays return focus to trigger on close. |
| Route changes | Avoid focus loss on client-side navigation; consider moving focus to the main heading. |
| Standard keys | `Enter`/`Space` for buttons; `Escape` to close dialogs. |

---

### Focus styling (mandatory)

- **Do not** add global CSS that removes outlines.
- Use `:focus-visible` for custom focus styling.
- When styling native elements, ensure focus states match PDS visual expectations.
- If unsure, prefer wrapping with or using a PDS component rather than inventing new focus styling.

```css
/* ❌ Never do this globally */
*:focus { outline: none; }

/* ✅ Prefer :focus-visible with compliant indicator */
button:focus-visible {
  outline: 2px solid var(--p-color-focus);
  outline-offset: 2px;
}
```

---

### High Contrast Mode (mandatory)

- UI must remain usable under `@media (forced-colors: active)`.
- Avoid using `forced-color-adjust: none` unless implementing a correct alternative.

---

### MDX content

| Requirement | Guidance |
|-------------|----------|
| **Link text** | Provide meaningful link text (avoid "click here", "here", "read more"). |
| **Images** | Images must have appropriate `alt` text; decorative images use `alt=""`. |
| **Code examples** | Must be accessible by default (correct labels, focus, keyboard behavior). |
| **Headings** | Maintain logical heading order (no skipped levels). |

---

## Testing expectations

When you add new interactive examples or components:

| Test type | Action |
|-----------|--------|
| **Axe checks** | Add/update automated axe tests if new interactive patterns are introduced. |
| **HCM/text zoom VRT** | Ensure new UI doesn't break under forced-colors or 200% zoom. |
| **Keyboard test** | Manually verify Tab order and keyboard operability. |

Keep regressions out of documentation examples.

---

## Done definition (quick checklist)

- [ ] Keyboard-only usage works.
- [ ] Focus is always visible.
- [ ] Works in forced-colors (HCM).
- [ ] Meets WCAG 2.2 AA for semantics, names, and contrast.
- [ ] MDX content uses meaningful link text and appropriate alt text.

