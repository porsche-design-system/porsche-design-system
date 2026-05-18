---
name: new-component-docs
description: Use when the user wants to add storefront documentation for a component, create configurator or examples pages, or scaffold the docs site pages for a PDS component.
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

Read an existing component docs directory (e.g., `packages/storefront/src/app/components/button/`) and `packages/storefront/AGENTS.md` for the Configurator/Examples recipe.

### 3. Create the story file

`packages/storefront/src/app/components/{name}/{name}.stories.ts`:
- Add `'use client'` at the top
- Export `Story<'p-{name}'>` with prop configurations matching the component API
- Export `SlotStories` if the component has configurable slots
- Use `events` in `ElementConfig` for controlled components (modals, flyouts)

### 4. Create documentation pages

**`configurator/page.mdx`**: `<Configurator tagName="p-{name}" story={...} />` + `metadata` + `ComponentStatus`

**`examples/page.mdx`**: Curated use-case examples via `ComponentStory`; add `TableOfContents` if multiple sections

**`api/page.mdx`**: Auto-generated API documentation (usually minimal)

**`usage/page.mdx`**: Installation and framework-specific code examples

**`accessibility/page.mdx`**: Keyboard interaction, ARIA usage, screen reader behavior

### 5. Verify accessibility of documentation

- All MDX content uses meaningful link text
- Images have appropriate alt text
- Heading order is logical
- Code examples show accessible usage by default

### 6. Report

List all created files. Suggest `npm run start:storefront` to preview.

## In this repository (Porsche Design System)

- Follow `packages/storefront/AGENTS.md` for story file conventions and page recipes
- Dev server: `npm run start:storefront`
- Tests: `npm run test:unit:storefront`, `npm run test:a11y:storefront`
