---
name: new-component
description: Use when the user wants to create a new PDS web component, scaffold a new p- prefixed Stencil component, or asks how to add a component to the design system.
---

# New Component

Scaffold a new Stencil web component with all required files following PDS conventions.

**Component name**: read from the user's message (kebab-case, e.g., `my-widget`). Ask the user if not provided.

## Steps

### 1. Validate the name

- Ensure the name is kebab-case (lowercase, hyphen-separated)
- Check that `packages/components/src/components/{name}/` does not already exist
- The tag name will be `p-{name}`
- The class name will be the PascalCase version of `{name}`

### 2. Study existing patterns

Read these reference files to understand the exact patterns:
- `packages/components/src/components/button/button.tsx` — component class structure
- `packages/components/src/components/button/button-styles.ts` — JSS style function
- `packages/components/src/components/button/button.spec.ts` — unit test structure

### 3. Create component files

Create `packages/components/src/components/{name}/` with these files:

**`{name}.tsx`** — Main component:
- `@Component({ tag: 'p-{name}', shadow: { delegatesFocus: true } })`
- `@Element() public host!: HTMLElement`
- `propTypes` constant using `AllowedTypes`
- `componentShouldUpdate` with `hasPropValueChanged`
- `render()` with `validateProps(this, propTypes)` first, then `attachComponentCss(this.host, getComponentCss, ...)`
- Return `<Host>` with semantic HTML inside (Host is typical; some components use `<div class="root">`)
- Import types from `../../types` and utils from `../../utils`

**`{name}-styles.ts`** — JSS styles:
- Export `getComponentCss` function returning `getCss({ root: { ... } })`
- Include `getFocusBaseStyles()` for `:focus-visible` on interactive elements
- Include `forcedColorsMediaQuery()` for HCM support
- Import shared helpers from `../../styles`

**`{name}-utils.ts`** — Types and utilities (keep lean)

**`{name}.spec.ts`** — Unit tests:
- `initComponent()` helper instantiating the class and setting up host + shadow DOM
- Test lifecycle methods and prop behavior with `vi.fn()` for mocks

**`{name}-styles.spec.ts`** — Style snapshot tests

### 4. Verify

- Run `npm run test:unit:components -- {name}` to confirm tests pass
- Report what was created and suggest next steps (wrapper generation, storefront docs)

## In this repository (Porsche Design System)

- Follow `packages/components/AGENTS.md` for component class and JSS patterns
- Build after creating: `npm run build:components` → `npm run build:components-js` → wrappers
- Lint/format: `npm run lint` and `npm run format`
