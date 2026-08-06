# AGENTS.md — Storefront Package

> This file provides context for AI coding assistants working in `packages/storefront/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **Next.js documentation site** for the Porsche Design System. It demonstrates best-practice
accessible usage of PDS components and must comply with **WCAG 2.2 AA**.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Components**: `@porsche-design-system/components-react/ssr`
- **Styling**: Tailwind CSS
- **Content**: MDX for documentation pages

## Commands

```bash
# Start dev server
npm run start:storefront

# Build storefront
npm run build:storefront

# Run unit tests
npm run test:unit:storefront

# Run end-to-end, accessibility, and visual regression tests
npm run test:e2e:storefront
npm run test:a11y:storefront
npm run test:vrt:storefront
```

## Prefer PDS Components

```tsx
// ✅ Prefer PDS React components
import { PButton, PLink } from '@porsche-design-system/components-react/ssr';

// ❌ Avoid re-inventing primitives like this:
<div onClick={handleClick} role="button">
  Click me
</div>;
```

- Use `@porsche-design-system/components-react/ssr` for UI primitives
- When you must use native HTML, maintain semantic correctness and match PDS behavior

## Keyboard Accessibility (Mandatory)

| Requirement   | Implementation                                                                    |
| ------------- | --------------------------------------------------------------------------------- |
| Tab-reachable | All interactive elements reachable via Tab                                        |
| No traps      | Users can always Tab out; overlays return focus to trigger on close               |
| Route changes | Avoid focus loss on client-side navigation; consider moving focus to main heading |
| Standard keys | `Enter`/`Space` for buttons; `Escape` to close dialogs                            |

## Focus Styling (Mandatory)

- **Do not** add global CSS that removes outlines
- Use `:focus-visible` for custom focus styling
- When styling native elements, ensure focus states match PDS visual expectations
- Prefer wrapping with or using a PDS component rather than inventing new focus styling

```css
/* ❌ Never do this globally */
*:focus {
  outline: none;
}

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

| Requirement       | Guidance                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| **Link text**     | Provide meaningful link text (avoid "click here", "here", "read more")   |
| **Images**        | Images must have appropriate `alt` text; decorative images use `alt=""`  |
| **Code examples** | Must be accessible by default (correct labels, focus, keyboard behavior) |
| **Headings**      | Maintain logical heading order (no skipped levels)                       |

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

## Generating Configurator and Example Stories

When adding or updating documentation pages for a component in `src/app/components/{component}/`, keep the configurator
and examples pages driven by a colocated `{component}.stories.ts` file whenever possible.

### Story file rules

- Create or extend `src/app/components/{component}/{component}.stories.ts`.
- Add `'use client';` at the top because storefront stories power interactive playgrounds.
- Export `Story<'p-component'>` objects for configurator-ready examples.
- Export `SlotStories<'p-component'>` when slot content must be selectable in the configurator.
- Put additional story variants for the examples page in the same story file using clear names such as
  `{component}Story`, `{component}StoryGrid`, or `{component}StoryCustomStyling`.
- For controlled components, model interactivity with `events` in the returned `ElementConfig` instead of embedding
  ad-hoc JavaScript in MDX.

### Configurator page recipe

Use the configurator page when the component should expose a playground UI.

```mdx
import { componentSlotStories, componentStory } from '@/app/components/component/component.stories';
import { Configurator } from '@/components/playground/Configurator';

<Configurator tagName="p-component" story={componentStory} slotStories={componentSlotStories} />
```

- Keep `export const metadata = { ... }` in the page.
- Keep the page heading with `ComponentStatus`.
- Pass `slotStories` only when the component actually has configurable slots.
- Reuse the base `{component}Story` export for the configurator; avoid defining inline configs inside the MDX page.

### Examples page recipe

Use the examples page to showcase curated use cases:

- `ComponentStory`: preferred for examples that can be expressed with the configurator story system.
- `ComponentExample`: required for advanced examples that need custom logic or framework-specific source files.

```mdx
import { ComponentStory } from '@/components/playground/ComponentStory';
import { componentStoryAdvanced } from '@/app/components/component/component.stories';
import { ComponentExample } from '@/components/playground/ComponentExample';
import { componentExampleCustomLogic } from '@porsche-design-system/shared/examples';
```

- Put story-backed examples in `{component}.stories.ts` and render them with `ComponentStory`.
- Use `ComponentExample` only after registering the cross-framework example in
  `packages/shared/scripts/generateCodeExamples.ts` and generating the shared export.
- Preserve `metadata` and `ComponentStatus` imports on the page.
- Add `TableOfContents` when the page contains multiple example sections.
- Keep example copy and generated markup accessible by default: meaningful headings, visible focus, keyboard support,
  and proper accessible names.

## Testing Expectations

When you add new interactive examples or components:

| Test Type             | Action                                                                    |
| --------------------- | ------------------------------------------------------------------------- |
| **Axe checks**        | Add/update automated axe tests if new interactive patterns are introduced |
| **HCM/text zoom VRT** | Ensure new UI doesn't break under forced-colors or 200% zoom              |
| **Keyboard test**     | Manually verify Tab order and keyboard operability                        |

## Primary Accessibility Reference

Follow the internal accessibility guidance pages:

- [`src/app/must-know/accessibility/introduction/page.mdx`](src/app/must-know/accessibility/introduction/page.mdx) — PDS
  accessibility approach and testing stages
- [`src/app/must-know/accessibility/dos-and-donts/page.mdx`](src/app/must-know/accessibility/dos-and-donts/page.mdx) —
  practical integration do's and don'ts for consumers

It documents expected testing stages:

- AXE-Core automated checks
- High Contrast Mode (HCM) visual regression tests
- 200% text zoom visual regression tests

## Accessibility documentation conventions

When adding or updating accessibility documentation in the storefront:

| Topic                          | Guidance                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Central vs component**       | Cross-cutting integration mistakes live on the [Do's and Don'ts](/must-know/accessibility/dos-and-donts) page. Each component Accessibility tab includes its own do/don't list and examples, even when content overlaps.                                                                                                                                                                                                      |
| **Usage vs Accessibility**     | The Usage tab is for design/UX guidance. The Accessibility tab is for keyboard, ARIA, and technical integration.                                                                                                                                                                                                                                                                                                              |
| **Code examples**              | Use vanilla-js web component markup (`<p-button>`, kebab-case attributes). Pass ARIA via `aria="{ 'aria-label': '...' }"`.                                                                                                                                                                                                                                                                                                    |
| **Page structure**             | Keep conceptual guidance in `overview.mdx` under `## Development considerations`, including `### Common do's and don'ts` bullet rules. Anti-pattern/recommended pairs live in `accessibility/examples/`, not in MDX.                                                                                                                                                                                                          |
| **Do/don't examples**          | Pair each actionable do/don't with an `antiPattern`/`recommended` example pair. Include host-vs-`aria` prop examples for interactive components.                                                                                                                                                                                                                                                                              |
| **Story-driven examples**      | Colocate each pair under `accessibility/examples/<kebab-case-name>/example.ts`. Export one `<metadataKey>A11yExample` object that `satisfies AccessibilityExample`. Host-level `aria-*` attributes belong in `properties` (e.g. `'aria-haspopup': 'dialog'`). Imperative examples must use a complete cross-framework `ExampleMarkupSample`. |
| **Snippet, not runnable file** | Accessibility pairs render as bare markup — no HTML document, component shell or SFC blocks — so the anti-pattern and the recommendation stay diffable at a glance. Keep the two sides structurally identical apart from the accessibility difference being taught. |
| **Naming**                     | Directory is kebab-case, the metadata key is its lower-camelCase form, and the export is `<key>A11yExample`. Preserve word boundaries: `icon-only-…` → `iconOnlyButtonWithoutAccessibleName`, not `icononly-…`. The skill generator validates the key casing and fails the build on a mismatch.                                                                                                                               |
| **Page composition**           | `page.mdx` renders `<meta.accessibility.overview />`, then `<A11yIntegrationExamples tag="p-…" examples={meta.accessibility.examples} />` (which owns the `## Integration examples` H2), then `<meta.accessibility.tests />`. Every H2 listed in `<TableOfContents>` must exist in `overview.mdx`/`tests.mdx` in the same order. Each pair renders one framework selector driving both of its snippets. |
| **Comments in snippets**       | Comments are a first-class node: return `{ comment: 'text' }` from the generator (top level or among `children`). It is emitted per framework — `<!-- text -->` for vanilla-js/Angular/Vue, `{/* text */}` for React — so each snippet is valid in the language its code fence claims. Never write a comment as a raw string; multiline strings are rejected outright, so imperative code needs an `ExampleMarkupSample`. |
| **When to add do/don't**       | Prioritize high-integration-risk components: interactive controls, forms, overlays, and keyboard-heavy widgets (carousel, tabs).                                                                                                                                                                                                                                                                                              |

Example in MDX:

````mdx
## Development considerations

### Common do's and don'ts

- **Do** pass ARIA via the `aria` prop.
- **Don't** add native `aria-*` attributes on the component host.

## Integration examples

### Short pattern title

❌ Anti-pattern

```js
<p-button aria-label="Open">Open</p-button>
```

✅ Recommended

```js
<p-button aria="{ 'aria-label': 'Open product details' }">Open</p-button>
```
````

Register colocated integration examples in the component metadata:

```ts
import { hiddenLabelWithoutAccessibleNameA11yExample } from './accessibility/examples/hidden-label-without-accessible-name/example';

export const checkboxMeta = {
  // ...
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
    },
    tests: AccessibilityTests,
  },
  // ...
} satisfies ComponentDocsMeta<'p-checkbox'>;
```

Define the complete pair in `accessibility/examples/hidden-label-without-accessible-name/example.ts`:

```ts
import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [{ tag: 'p-checkbox', properties: { name: 'terms', hideLabel: true } }],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: { name: 'terms', hideLabel: true, label: 'I accept the terms and conditions' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
```

## Done Checklist

Before finishing any UI work:

- [ ] Keyboard-only usage works
- [ ] Focus is always visible
- [ ] Works in forced-colors (HCM)
- [ ] Meets WCAG 2.2 AA for semantics, names, and contrast
- [ ] MDX content uses meaningful link text and appropriate alt text
