---
name: new-component-docs
description: Scaffold storefront documentation pages for a PDS component. Use when a new component needs configurator, examples, API, usage, and accessibility pages.
---

# New Component Documentation

Scaffold storefront documentation pages for a PDS component.

**Component name**: read from the user's message (kebab-case, e.g., `button`). Ask the user if not provided.

## Steps

### 1. Validate

- Confirm the component exists at `packages/components/src/components/{name}/`
- Check that `packages/storefront/src/app/components/{name}/` does not already exist
- Read the component source to understand its props, events, slots, and behavior

### 2. Study existing documentation patterns

Read these reference files:
- An existing component docs directory (e.g., `packages/storefront/src/app/components/button/`) — read its structure
- A `*.stories.ts` file to understand the story format
- `packages/storefront/AGENTS.md` for the full Configurator/Examples recipe

### 3. Create the story file

Create `packages/storefront/src/app/components/{name}/{name}.stories.ts`:

```ts
'use client';

import type { Story } from '@/components/playground/types';

export const {nameCamelCase}Story: Story<'p-{name}'> = {
  // Define default prop values and available options
  // based on the component's actual props from its source
};
```

- Add `'use client'` at the top
- Export `Story<'p-{name}'>` with prop configurations matching the actual component API
- Export `SlotStories` if the component has configurable slots
- Use `events` in `ElementConfig` for controlled components (modals, flyouts, etc.)

### 4. Create documentation pages

Create `packages/storefront/src/app/components/{name}/` with:

**`configurator/page.mdx`**:
- Import the story from the stories file
- Render `<Configurator tagName="p-{name}" story={...} />`
- Include `export const metadata = { title: '...' }`
- Include `ComponentStatus` heading

**`examples/page.mdx`**:
- Import `ComponentStory` from `@/components/playground/ComponentStory`
- Show curated use-case examples
- Add `TableOfContents` if multiple sections
- Keep examples accessible (meaningful labels, keyboard-operable)

**`api/page.mdx`**:
- Auto-generated API documentation page — usually minimal

**`usage/page.mdx`**:
- Installation and usage instructions with framework-specific code examples

**`accessibility/page.mdx`**:
- Accessibility guidance: keyboard interaction, ARIA usage, screen reader behavior

### 5. Verify accessibility of documentation

- All MDX content uses meaningful link text (no "click here")
- Images have appropriate alt text
- Heading order is logical (no skipped levels)
- Code examples show accessible usage by default

### 6. Report

List all created files and suggest running `npm run start:storefront` to preview.

## In this repository (Porsche Design System)

- Follow `packages/storefront/AGENTS.md` for story file conventions and page recipes
- Dev server: `npm run start:storefront`
- Tests: `npm run test:unit:storefront`, `npm run test:a11y:storefront`
