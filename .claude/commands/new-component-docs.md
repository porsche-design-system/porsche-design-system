# New Component Documentation

Scaffold storefront documentation pages for a PDS component.

**Component name**: $ARGUMENTS (kebab-case, e.g., `button` or `input-text`)

## Steps

### 1. Validate

- Confirm the component exists at `packages/components/src/components/$ARGUMENTS/`
- Check that `packages/storefront/src/app/components/$ARGUMENTS/` does not already exist
- Read the component source to understand its props, events, slots, and behavior

### 2. Study existing documentation patterns

Read these reference files to understand the exact structure:
- Pick an existing component docs directory (e.g., `packages/storefront/src/app/components/button/`) and read its structure
- Read a `*.stories.ts` file to understand the story format
- Read `packages/storefront/src/components/playground/Configurator.tsx` to understand how stories drive the configurator
- Read `.claude/rules/storefront.md` for the full recipe

### 3. Create the story file

Create `packages/storefront/src/app/components/$ARGUMENTS/$ARGUMENTS.stories.ts`:

```ts
'use client';

import type { Story } from '@/components/playground/types';

export const ${componentCamelCase}Story: Story<'p-$ARGUMENTS'> = {
  // Define default prop values and available options
  // based on the component's actual props from its source
};
```

- Add `'use client'` at the top
- Export `Story<'p-$ARGUMENTS'>` with prop configurations matching the actual component API
- Export `SlotStories` if the component has configurable slots
- Use `events` in `ElementConfig` for controlled components (modals, flyouts, etc.)

### 4. Create documentation pages

Create `packages/storefront/src/app/components/$ARGUMENTS/` with:

**`configurator/page.mdx`**:
- Import the story from the stories file
- Render `<Configurator tagName="p-$ARGUMENTS" story={...} />`
- Include `export const metadata = { title: '...' }`
- Include `ComponentStatus` heading

**`examples/page.mdx`**:
- Import `ComponentStory` from `@/components/playground/ComponentStory`
- Show curated use-case examples
- Add `TableOfContents` if multiple sections
- Keep examples accessible (meaningful labels, keyboard-operable)

**`api/page.mdx`**:
- Auto-generated API documentation page
- Usually minimal — references component-meta

**`usage/page.mdx`**:
- Installation and usage instructions
- Framework-specific code examples (React, Angular, Vue)

**`accessibility/page.mdx`**:
- Accessibility guidance specific to this component
- Keyboard interaction patterns
- ARIA usage examples
- Screen reader behavior

### 5. Verify accessibility of documentation

- All MDX content uses meaningful link text (no "click here")
- Images have appropriate alt text
- Heading order is logical (no skipped levels)
- Code examples show accessible usage by default

### 6. Report

List all created files and suggest running `npm run start:storefront` to preview.
