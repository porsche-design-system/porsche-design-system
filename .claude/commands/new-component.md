# New Component

Scaffold a new Stencil web component with all required files following PDS conventions.

**Component name**: $ARGUMENTS (must be kebab-case, e.g., `my-widget`)

## Steps

### 1. Validate the name

- Ensure the name is kebab-case (lowercase, hyphen-separated)
- Check that `packages/components/src/components/$ARGUMENTS/` does not already exist
- The tag name will be `p-$ARGUMENTS`
- The class name will be the PascalCase version of `$ARGUMENTS`

### 2. Study existing patterns

Read these reference files to understand the exact patterns:
- `packages/components/src/components/button/button.tsx` — component class structure
- `packages/components/src/components/button/button-styles.ts` — JSS style function
- `packages/components/src/components/button/button-utils.ts` — utility types (if exists)
- `packages/components/src/components/button/button.spec.ts` — unit test structure

### 3. Create component files

Create `packages/components/src/components/$ARGUMENTS/` with these files:

**`$ARGUMENTS.tsx`** — Main component:
- `@Component({ tag: 'p-$ARGUMENTS', shadow: { delegatesFocus: true } })`
- `@Element() public host!: HTMLElement`
- `propTypes` constant using `AllowedTypes`
- `componentShouldUpdate` with `hasPropValueChanged`
- `render()` with `validateProps(this, propTypes)` then `attachComponentCss(this.host, getComponentCss, ...)`
- Return `<Host>` with semantic HTML inside
- Import types from `../../types` and utils from `../../utils`

**`$ARGUMENTS-styles.ts`** — JSS styles:
- Export `getComponentCss` function returning `getCss({ root: { ... } })`
- Include `getFocusBaseStyles()` for `:focus-visible` on interactive elements
- Include `forcedColorsMediaQuery()` placeholder for HCM support
- Import shared helpers from `../../styles`

**`$ARGUMENTS-utils.ts`** — Types and utilities:
- Export component-specific types and helper functions
- Keep lean — only add what's needed

**`$ARGUMENTS.spec.ts`** — Unit tests:
- Import from `vitest`
- Create `initComponent()` helper that instantiates the class and sets up host + shadow DOM
- Test lifecycle methods and prop behavior
- Use `vi.fn()` for mocks

**`$ARGUMENTS-styles.spec.ts`** — Style tests:
- Snapshot tests calling `getComponentCss()` with various parameter combinations

### 4. Verify

- Run `npm run test:unit:components -- $ARGUMENTS` to confirm tests pass
- Confirm the file structure matches the standard pattern
- Report what was created and suggest next steps (wrapper generation, storefront docs)
