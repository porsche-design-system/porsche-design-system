# AGENTS.md — Storefront Package

> This file provides context for AI coding assistants working in `packages/storefront/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **Next.js documentation site** for the Porsche Design System. It demonstrates best-practice
accessible usage of PDS components and must comply with **WCAG 2.2 AA**.

## Tech Stack

- **Framework**: Next.js 16 with App Router. Its APIs and conventions may differ from what you know: read the guide in
  `node_modules/next/dist/docs/` (hoisted to the repository root) before changing Next-specific code.
  `agentRules: false` in `next.config.ts` keeps `next dev` from writing its own rules block into this file.
- **Components**: `@porsche-design-system/components-react/ssr`
- **Styling**: Tailwind CSS
- **Content**: MDX for documentation pages

## Commands

```bash
# Build the examples the storefront frames – once, and again after changing them.
# `prebuild` copies packages/examples/projects/pages/dist-site into public/examples and fails without it.
# Their pages render <Example example={…} />, with each example imported by its id from @porsche-design-system/examples.
npm run build:examples

# Start dev server
npm run start:storefront

# Build storefront
npm run build:storefront

# Typecheck the Storefront and its projects (skills, stackblitz), and their tests
npm run typecheck:storefront
npm run typecheck:storefront:tests

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

Every page that renders content exports `metadata` with a `title` and a `description`. The title names the page after
its place in the sitemap, most specific first, and the root layout appends ` - Porsche Design System`:
`Button: Usage - Components` for a tab and `Blur - Tokens` for a page. `tests/unit/specs/sitemap.spec.ts` fails when a
page's title differs, and its error lists the expected one.

### Links and anchors

Links are written in one form and resolved for each output: `next/link` adds the base path and the trailing slash in the
Storefront, and the skills generator turns the same routes into references or Storefront URLs.

| Link to       | Write                                                    | Notes                                                                                            |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| A page        | `[Button](/components/button/usage)`                     | A route of the sitemap, without a trailing slash. In TSX, use `DocsLink`, typed with `DocsHref`. |
| A section     | `[Do](/components/button/usage#do)` or `[Setup](#setup)` | The anchor of an `##` heading on that page, from `getHeadingAnchorId()` (GitHub-style slugs).    |
| A file        | `[AGENTS.md](assets/downloads/AGENTS.md)`                | Relative, from `public/`; the `<base>` of the root layout adds the base path.                    |
| Anything else | `[MDN](https://developer.mozilla.org)`                   | With its scheme.                                                                                 |

- Use Markdown links in MDX, and `DocsLink` in JSX and TSX, for internal and external links alike. `next/link` is off
  limits: Biome rejects importing it in TSX, and the link test in MDX. Elements that render their own `<a>` (`PLink`,
  `PLinkPure`, `PLinkTile`, `<a>`) skip the base path; for a route, wrap a `DocsLink` in them, or give them a relative
  path with a trailing slash where they can't take one: `components/introduction/`.
- `DocsLink` also takes an anchor on the current page (`#do`) and adds the current path to it: a bare `#do` resolves
  against the `<base>` of the root layout, which leads to the home page.
- `DocsRoute` in `src/sitemap.ts` is the type of every route; a link to a page that doesn't exist fails the typecheck in
  TSX. A category or a page with tabs leads to its first entry (`getLandingPath()`), and its `page.tsx` redirects there.
- MDX isn't typechecked, so `tests/unit/specs/links.spec.ts` checks every link in it: routes, trailing slashes, anchors,
  files, tables of contents, unique heading anchors and redirects.

### MDX components

Every component MDX imports lives in `src/components/mdx/`, in a topic folder by how pages use it (`structure`,
`content`, `framework`, `playground`, `examples`, `reference`, `widgets`), one folder per component. MDX imports
it from that folder: `import { Notification } from '@/components/mdx/content/Notification';`. The
[`README.md`](src/components/mdx/README.md) is the inventory: what each component is for, its planned Markdown output
and its dependencies on the Storefront. It is the migration list for the dual-target registry (#4142).

- A new component gets a folder in its topic with a module of the same name, an `index.ts` and a row in the inventory.
  `tests/unit/specs/mdxComponents.spec.ts` checks them, and that a new Storefront dependency is added on purpose.
- Write Markdown wherever it can express something: links, inline code, bold. Use an MDX component instead of a PDS
  component or raw HTML, e.g. `DependencyList` instead of a row of `PTag`s. `tests/unit/specs/mdxPages.spec.ts`
  checks this, unused imports, tables of contents (from two `##` sections) and notification heading levels.
- Framework-aware content (`FrameworkCodeBlock`, `FrameworkLink`, `FrameworkName`, `Notification` with
  `frameworks`) is resolved for every framework on the server; `framework/FrameworkContent` renders the selected one.

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/         # Component documentation pages
│   ├── must-know/          # Guidelines (accessibility, etc.)
│   └── ...
├── components/             # React components for the site
│   ├── mdx/                # Components MDX imports, by topic, one folder each, with an inventory
│   └── common/             # Storefront chrome: navigation, tabs, selects, DocsLink
├── lib/                    # Utilities and helpers
└── styles/                 # Global styles
projects/
├── skills/                 # Agent skills generator (@porsche-design-system/skills)
└── stackblitz/             # StackBlitz projects (@porsche-design-system/stackblitz)
```

## Generating Configurator and Example Stories

When adding or updating documentation pages for a component in `src/app/(main)/components/{component}/`, keep the
configurator and examples pages driven by stories whenever possible. The stories live in `packages/examples`
([`projects/stories`](../examples/projects/stories)), one folder per example, named by its id. A page imports the
examples it shows by their id (`@porsche-design-system/examples/<id>`) and renders them with `<Example>`; the
component's `{component}.meta.ts` lists their ids, in the order of the page, for the skill. `componentDocs.spec.ts`
fails when the meta and the configurator or examples page differ.

### Story file rules

- The configurator's story is `packages/examples/projects/stories/src/components/{component}/default/story.ts`; an
  example's story, title and description are `story.ts`, `meta.ts` (`{ title }`) and `example.mdx` in
  `packages/examples/projects/stories/src/components/{component}/{slug}/`. Its id, `components/{component}/{slug}`,
  goes into the meta's `examples`, and `npm run build:examples:projects` makes it importable.
- Add `'use client';` at the top because storefront stories power interactive playgrounds.
- Export `Story<'p-component'>` objects for configurator-ready examples. `Story`, `SlotStories`, `ElementConfig` and the
  accessibility example types come from `@porsche-design-system/story-generator` (in
  [`packages/shared/projects/story-generator`](../shared/projects/story-generator)), which also generates a story's
  markup for every framework (`getStoryMarkup`, `wrapCode`) for the Storefront and the skills, and renders it live with
  `<StoryPreview>` from `@porsche-design-system/story-generator/react`.
- Export `SlotStories<'p-component'>` when slot content must be selectable in the configurator.
- Give every example a folder of its own; name its export like `{component}StoryCustomStyling`.
- For controlled components, model interactivity with `events` in the returned `ElementConfig` instead of embedding
  ad-hoc JavaScript in MDX.

### Configurator page recipe

Use the configurator page when the component should expose a playground UI.

```mdx
import { Configurator } from '@/components/mdx/playground/Configurator';
import componentDefault from '@porsche-design-system/examples/components/component/default';

<Configurator example={componentDefault} />
```

- Keep `export const metadata = { ... }` in the page.
- Keep the page heading with `ComponentStatus`.
- The configurator takes the default story with its slot stories (and a controlled variant of both, if exported); for
  a component without a declarative default (e.g. `p-toast`), the default is a framework example, which it shows with
  its code. The meta's `configurator` is the same id, for the skill.

### Examples page recipe

Use the examples page to showcase curated use cases:

```mdx
import { Example } from '@/components/mdx/examples/Example';
import advanced from '@porsche-design-system/examples/components/component/advanced';
import customLogic from '@porsche-design-system/examples/components/component/custom-logic';

<TableOfContents headings={[advanced.title, customLogic.title]} />

<Example example={advanced} />

<Example example={customLogic} />
```

- `<Example>` renders the example's title as an `##` heading, its description and its preview with the code, whatever
  its kind. `level={3}` makes it a sub-example of the one before, `heading="…"` names it apart from its title, and
  `heading={false}` leaves the heading to the page (a page of one example). `prebuild` fills the `TableOfContents`
  from them.
- Import every example the page shows on its own: a page loads the stories and previews it imports, and only those.
- Prefer a story (`packages/examples/projects/stories`). Write a framework example only for custom logic, by adding its
  `meta.ts` (and its `example.mdx`) to `packages/examples/projects/framework/src/<id>/` and generating the project
  (see its [`AGENTS.md`](../examples/projects/framework/AGENTS.md)).
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
| **Page structure**             | Keep conceptual guidance in `overview.mdx` under `## Development considerations`, including `### Common do's and don'ts` bullet rules. Anti-pattern/recommended pairs live in `packages/examples/projects/stories`, next to the stories (`components/<component>/accessibility/<slug>`), not in MDX.                                                                                                                                                                                                          |
| **Do/don't examples**          | Pair each actionable do/don't with an `antiPattern`/`recommended` example pair. Include host-vs-`aria` prop examples for interactive components.                                                                                                                                                                                                                                                                              |
| **Story-driven examples**      | Put each pair in `packages/examples/projects/stories/src/components/<component>/accessibility/<kebab-case-name>/example.ts`. Export one `<metadataKey>A11yExample` object that `satisfies AccessibilityExample`. Host-level `aria-*` attributes belong in `properties` (e.g. `'aria-haspopup': 'dialog'`). Imperative examples must use a complete cross-framework `ExampleMarkupSample`. |
| **Snippet, not runnable file** | Accessibility pairs render as bare markup — no HTML document, component shell or SFC blocks — so the anti-pattern and the recommendation stay diffable at a glance. Keep the two sides structurally identical apart from the accessibility difference being taught. |
| **Naming**                     | Directory is kebab-case and makes the id, `components/<component>/accessibility/<directory>`; the export is its lower-camelCase form plus `A11yExample`. Preserve word boundaries: `icon-only-…` → `iconOnlyButtonWithoutAccessibleNameA11yExample`, not `icononly-…`. The `name` of the example is its title. |
| **Page composition**           | `page.mdx` renders `<meta.accessibility.overview />`, then `<A11yIntegrationExamples examples={meta.accessibility.examples} />` (which owns the `## Integration examples` H2), then `<meta.accessibility.tests />`. Every H2 listed in `<TableOfContents>` must exist in `overview.mdx`/`tests.mdx` in the same order. Each pair renders one framework selector driving both of its snippets. |
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

Register the integration examples in the component metadata, by id, in their order:

```ts
export const checkboxMeta = {
  // ...
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/checkbox/accessibility/hidden-label-without-accessible-name'],
    tests: AccessibilityTests,
  },
  // ...
} satisfies ComponentDocsMeta<'p-checkbox'>;
```

Define the complete pair in `packages/examples/projects/stories/src/components/checkbox/accessibility/hidden-label-without-accessible-name/example.ts`:

```ts
import type { AccessibilityExample } from '@porsche-design-system/story-generator';

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
