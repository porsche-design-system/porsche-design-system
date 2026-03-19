---
applyTo: "packages/storefront/**"
---

# Storefront Package Instructions

> **Note**: See also [`packages/storefront/AGENTS.md`](../../packages/storefront/AGENTS.md) for comprehensive storefront development guidance.
> The AGENTS.md file is the canonical source for AI assistants.

This package contains the **Next.js / React documentation site**. The storefront must demonstrate best-practice accessible usage of Porsche Design System components and comply with **WCAG 2.2 AA**.

## Primary reference inside this repo

Follow the internal accessibility guidance page:

> `packages/storefront/src/app/must-know/accessibility/introduction/page.mdx`

It documents expected testing stages:
- AXE-Core automated checks
- High Contrast Mode (HCM) visual regression tests
- 200% text zoom visual regression tests

## React/Next implementation rules

### Prefer PDS components

```tsx
// ✅ Prefer PDS React components
import { PButton, PLink } from '@porsche-design-system/components-react/ssr';

// ❌ Avoid re-inventing primitives like this:
<div onClick={handleClick} role="button">Click me</div>
```

- Use `@porsche-design-system/components-react/ssr` when building UI primitives.
- When you must use native HTML, maintain semantic correctness and match PDS design and behavior.

### Keyboard accessibility (mandatory)

| Requirement | Implementation |
|-------------|----------------|
| Tab-reachable | All interactive elements reachable via Tab. |
| No traps | Users can always Tab out; overlays return focus to trigger on close. |
| Route changes | Avoid focus loss on client-side navigation; consider moving focus to the main heading. |
| Standard keys | `Enter`/`Space` for buttons; `Escape` to close dialogs. |

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

### High Contrast Mode (mandatory)

- UI must remain usable under `@media (forced-colors: active)`.
- Avoid using `forced-color-adjust: none` unless implementing a correct alternative.

### MDX content

| Requirement | Guidance |
|-------------|----------|
| **Link text** | Provide meaningful link text (avoid "click here", "here", "read more"). |
| **Images** | Images must have appropriate `alt` text; decorative images use `alt=""`. |
| **Code examples** | Must be accessible by default (correct labels, focus, keyboard behavior). |
| **Headings** | Maintain logical heading order (no skipped levels). |

## Generating configurator and example stories

When you create or extend component docs inside `packages/storefront/src/app/components/{component}/`, keep the
configurator and examples pages backed by a colocated `{component}.stories.ts` file.

### Story file rules

- Create or update `packages/storefront/src/app/components/{component}/{component}.stories.ts`.
- Add `'use client';` at the top because storefront stories power interactive playgrounds.
- Export `Story<'p-component'>` objects for all examples that can be rendered through the configurator system.
- Export `SlotStories<'p-component'>` when configurable slot content is needed.
- Keep the base configurator export named like `{component}Story`; use additional named exports such as
  `{component}StoryGrid` or `{component}StoryCustomStyling` for example-page variants.
- For controlled components, define `events` inside the generated `ElementConfig` so the example stays interactive
  without inline custom scripts.

### Configurator pages

- Import the story file into `configurator/page.mdx` and render it via `Configurator`.
- Preserve `export const metadata = { ... }` and the page heading with `ComponentStatus`.
- Pass `slotStories` only when the component has configurable slots.
- Do not build playground configs inline in MDX; keep them in the colocated story file.

```mdx
import { componentSlotStories, componentStory } from '@/app/components/component/component.stories';
import { Configurator } from '@/components/playground/Configurator';

<Configurator tagName="p-component" story={componentStory} slotStories={componentSlotStories} />
```

### Examples pages

- Use `ComponentStory` for examples that can be represented by a storefront `Story`.
- Use `ComponentExample` only for advanced examples that require custom logic and cross-framework source files.
- For `ComponentExample`, register the example in `packages/shared/scripts/generateCodeExamples.ts` so it becomes
  importable from `@porsche-design-system/shared/examples`.
- Preserve `metadata` and `ComponentStatus` imports on the page.
- Add `TableOfContents` when a page contains multiple example sections.
- Keep each example accessible by default, including keyboard support, visible focus, and proper accessible names.

```mdx
import { ComponentStory } from '@/components/playground/ComponentStory';
import { componentStoryAdvanced } from '@/app/components/component/component.stories';
import { ComponentExample } from '@/components/playground/ComponentExample';
import { componentExampleCustomLogic } from '@porsche-design-system/shared/examples';
```

## Testing expectations

When you add new interactive examples or components:

| Test type | Action |
|-----------|--------|
| **Axe checks** | Add/update automated axe tests if new interactive patterns are introduced. |
| **HCM/text zoom VRT** | Ensure new UI doesn't break under forced-colors or 200% zoom. |
| **Keyboard test** | Manually verify Tab order and keyboard operability. |

Keep regressions out of documentation examples.

## Done definition (quick checklist)

- [ ] Keyboard-only usage works.
- [ ] Focus is always visible.
- [ ] Works in forced-colors (HCM).
- [ ] Meets WCAG 2.2 AA for semantics, names, and contrast.
- [ ] MDX content uses meaningful link text and appropriate alt text.

