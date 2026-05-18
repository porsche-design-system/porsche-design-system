---
name: new-component
description: Scaffold a new Stencil web component with all required files following PDS conventions. Use when creating a brand-new p- prefixed component.
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
- `packages/components/src/components/button/button-utils.ts` — utility types
- `packages/components/src/components/button/button.spec.ts` — unit test structure

### 3. Create component files

Create `packages/components/src/components/{name}/` with these files:

**`{name}.tsx`** — Main component:
- `@Component({ tag: 'p-{name}', shadow: { delegatesFocus: true } })`
- `@Element() public host!: HTMLElement`
- `propTypes` constant using `AllowedTypes`
- `componentShouldUpdate` with `hasPropValueChanged`
- `render()` with `validateProps(this, propTypes)` first, then `attachComponentCss(this.host, getComponentCss, ...)`
- Return `<Host>` with semantic HTML inside
- Import types from `../../types` and utils from `../../utils`

**`{name}-styles.ts`** — JSS styles:
- Export `getComponentCss` function returning `getCss({ root: { ... } })`
- Include `getFocusBaseStyles()` for `:focus-visible` on interactive elements
- Include `forcedColorsMediaQuery()` for HCM support
- Import shared helpers from `../../styles`

**`{name}-utils.ts`** — Types and utilities:
- Export component-specific types and helper functions
- Keep lean — only add what is needed

**`{name}.spec.ts`** — Unit tests:
- Import from `vitest`
- Create `initComponent()` helper that instantiates the class and sets up host + shadow DOM
- Test lifecycle methods and prop behavior
- Use `vi.fn()` for mocks

**`{name}-styles.spec.ts`** — Style tests:
- Snapshot tests calling `getComponentCss()` with various parameter combinations

### 4. Verify

- Run `npm run test:unit:components -- {name}` to confirm tests pass
- Confirm the file structure matches the standard pattern
- Report what was created and suggest next steps (wrapper generation, storefront docs)

## In this repository (Porsche Design System)

- Follow nearest `packages/components/AGENTS.md` for component class and JSS patterns
- Build order after creating: `npm run build:components` → `npm run build:components-js` → wrappers
- Lint/format: `npm run lint` and `npm run format` from repo root
- Tests: `npm run test:unit:components -- {name}.spec.ts`
