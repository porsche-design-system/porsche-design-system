---
globs: packages/storefront/**
---

# Storefront (`packages/storefront/`)

Next.js documentation site for the Porsche Design System. Demonstrates best-practice accessible usage of PDS components and must comply with WCAG 2.2 AA.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Components**: `@porsche-design-system/components-react/ssr`
- **Styling**: Tailwind CSS
- **Content**: MDX for documentation pages

## File Structure

```
packages/storefront/
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── components/            # Component documentation pages
│   │   │   └── {component}/
│   │   │       ├── configurator/page.mdx
│   │   │       ├── examples/page.mdx
│   │   │       ├── api/page.mdx
│   │   │       ├── usage/page.mdx
│   │   │       ├── accessibility/page.mdx
│   │   │       └── {component}.stories.ts
│   │   └── must-know/             # Guidelines (accessibility, etc.)
│   ├── components/                # React components for the site
│   │   └── playground/            # Configurator, ComponentStory, ComponentExample
│   ├── lib/                       # Utilities and helpers
│   └── styles/                    # Global styles
├── tests/                         # E2E, a11y, VRT tests
└── projects/
    └── stackblitz/                # StackBlitz integration
```

## Story File System

Drive configurator and examples pages from colocated `{component}.stories.ts` files.

### Story File Rules

- Create/extend `src/app/components/{component}/{component}.stories.ts`
- Add `'use client';` at the top
- Export `Story<'p-component'>` objects for configurator examples
- Export `SlotStories<'p-component'>` when slot content must be selectable
- Name variants clearly: `{component}Story`, `{component}StoryGrid`, `{component}StoryCustomStyling`
- For controlled components, model interactivity with `events` in the returned `ElementConfig`

### Configurator Page Recipe

```mdx
import { componentSlotStories, componentStory } from '@/app/components/component/component.stories';
import { Configurator } from '@/components/playground/Configurator';

<Configurator tagName="p-component" story={componentStory} slotStories={componentSlotStories} />
```

- Keep `export const metadata = { ... }` in the page
- Keep the page heading with `ComponentStatus`
- Pass `slotStories` only when the component has configurable slots
- Reuse the base `{component}Story` export — avoid inline configs in MDX

### Examples Page Recipe

```mdx
import { ComponentStory } from '@/components/playground/ComponentStory';
import { componentStoryAdvanced } from '@/app/components/component/component.stories';
import { ComponentExample } from '@/components/playground/ComponentExample';
import { componentExampleCustomLogic } from '@porsche-design-system/shared/examples';
```

- `ComponentStory` — for story-backed examples
- `ComponentExample` — for advanced examples needing custom logic (requires registration in `packages/shared/scripts/generateCodeExamples.ts`)
- Add `TableOfContents` when the page has multiple example sections
- Preserve `metadata` and `ComponentStatus` imports

## Prefer PDS Components

```tsx
// Correct — use PDS React components
import { PButton, PLink } from '@porsche-design-system/components-react/ssr';

// Incorrect — don't re-invent primitives
<div onClick={handleClick} role="button">Click me</div>
```

Use `@porsche-design-system/components-react/ssr` for all UI primitives.

## MDX Content Accessibility

| Requirement | Guidance |
|-------------|----------|
| Link text | Meaningful text (no "click here", "here", "read more") |
| Images | Appropriate `alt` text; decorative images use `alt=""` |
| Code examples | Must be accessible by default (correct labels, focus, keyboard) |
| Headings | Maintain logical heading order (no skipped levels) |

## Keyboard Accessibility

- All interactive elements reachable via Tab
- No keyboard traps — users can always Tab out
- Overlays return focus to trigger on close
- Route changes should not cause focus loss
- `Enter`/`Space` for buttons, `Escape` to close dialogs

## Focus and High Contrast Mode

- Do not add global CSS that removes outlines
- Use `:focus-visible` for custom focus styling
- UI must remain usable under `@media (forced-colors: active)`
- Prefer PDS components over custom focus styling

## Testing

```bash
npm run test:unit:storefront        # Unit tests
npm run test:e2e:storefront         # E2E tests
npm run test:a11y:storefront        # A11y tests
npm run test:vrt:storefront         # VRT tests
npm run start:storefront            # Dev server (or npm run dev)
```

When adding new interactive examples or components:
- Add/update axe tests if new interactive patterns are introduced
- Ensure new UI doesn't break under forced-colors or 200% zoom
- Manually verify Tab order and keyboard operability

## Build Dependencies

Last in the build chain — requires all other packages built first.

## Done Checklist

- [ ] Keyboard-only usage works
- [ ] Focus is always visible
- [ ] Works in forced-colors (HCM)
- [ ] Meets WCAG 2.2 AA for semantics, names, and contrast
- [ ] MDX content uses meaningful link text and appropriate alt text

## Commands

```bash
npm run start:storefront     # Dev server
npm run build:storefront     # Build
```
