# AGENTS.md — Storefront Package

> This file provides context for AI coding assistants working in `packages/storefront/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **Next.js documentation site** for the Porsche Design System. It demonstrates best-practice accessible usage of PDS components and must comply with **WCAG 2.2 AA**.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Components**: `@porsche-design-system/components-react/ssr`
- **Styling**: Tailwind CSS
- **Content**: MDX for documentation pages

## Commands

```bash
# Start dev server
yarn start:storefront

# Build storefront
yarn build:storefront

# Run unit tests
yarn test:unit:storefront
```

## Prefer PDS Components

```tsx
// ✅ Prefer PDS React components
import { PButton, PLink } from '@porsche-design-system/components-react/ssr';

// ❌ Avoid re-inventing primitives like this:
<div onClick={handleClick} role="button">Click me</div>
```

- Use `@porsche-design-system/components-react` (or `/ssr` variant) for UI primitives
- When you must use native HTML, maintain semantic correctness and match PDS behavior

## Keyboard Accessibility (Mandatory)

| Requirement     | Implementation                                                              |
| --------------- | --------------------------------------------------------------------------- |
| Tab-reachable   | All interactive elements reachable via Tab                                  |
| No traps        | Users can always Tab out; overlays return focus to trigger on close         |
| Route changes   | Avoid focus loss on client-side navigation; consider moving focus to main heading |
| Standard keys   | `Enter`/`Space` for buttons; `Escape` to close dialogs                      |

## Focus Styling (Mandatory)

- **Do not** add global CSS that removes outlines
- Use `:focus-visible` for custom focus styling
- When styling native elements, ensure focus states match PDS visual expectations
- Prefer wrapping with or using a PDS component rather than inventing new focus styling

```css
/* ❌ Never do this globally */
*:focus { outline: none; }

/* ✅ Prefer :focus-visible with compliant indicator */
button:focus-visible {
  outline: 2px solid var(--p-color-focus);
  outline-offset: 2px;
}
```

## High Contrast Mode (Mandatory)

- UI must remain usable under `@media (forced-colors: active)`
- Avoid using `forced-color-adjust: none` unless implementing a correct alternative

## MDX Content Guidelines

| Requirement    | Guidance                                                                    |
| -------------- | --------------------------------------------------------------------------- |
| **Link text**  | Provide meaningful link text (avoid "click here", "here", "read more")      |
| **Images**     | Images must have appropriate `alt` text; decorative images use `alt=""`     |
| **Code examples** | Must be accessible by default (correct labels, focus, keyboard behavior) |
| **Headings**   | Maintain logical heading order (no skipped levels)                          |

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/         # Component documentation pages
│   ├── must-know/          # Guidelines (accessibility, etc.)
│   └── ...
├── components/             # React components for the site
├── lib/                    # Utilities and helpers
└── styles/                 # Global styles
```

## Testing Expectations

When you add new interactive examples or components:

| Test Type      | Action                                                          |
| -------------- | --------------------------------------------------------------- |
| **Axe checks** | Add/update automated axe tests if new interactive patterns are introduced |
| **HCM/text zoom VRT** | Ensure new UI doesn't break under forced-colors or 200% zoom |
| **Keyboard test** | Manually verify Tab order and keyboard operability           |

## Primary Accessibility Reference

Follow the internal accessibility guidance page:

> [`src/app/must-know/accessibility/introduction/page.mdx`](src/app/must-know/accessibility/introduction/page.mdx)

It documents expected testing stages:

- AXE-Core automated checks
- High Contrast Mode (HCM) visual regression tests
- 200% text zoom visual regression tests

## Done Checklist

Before finishing any UI work:

- [ ] Keyboard-only usage works
- [ ] Focus is always visible
- [ ] Works in forced-colors (HCM)
- [ ] Meets WCAG 2.2 AA for semantics, names, and contrast
- [ ] MDX content uses meaningful link text and appropriate alt text

