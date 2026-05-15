# New Form Component

Scaffold a form-associated Stencil web component with ElementInternals, form lifecycle, and validation patterns.

**Component name**: $ARGUMENTS (must be kebab-case, e.g., `input-currency`)

## Steps

### 1. Validate the name

- Ensure the name is kebab-case
- Check that `packages/components/src/components/$ARGUMENTS/` does not already exist
- Tag: `p-$ARGUMENTS`, Class: PascalCase of `$ARGUMENTS`

### 2. Study existing form component patterns

Read these reference files:
- `packages/components/src/components/input-text/input-text.tsx` — form component with ElementInternals
- `packages/components/src/components/input-text/input-text-styles.ts` — form input styles
- `packages/components/src/components/input-text/input-text.spec.ts` — form component tests
- `packages/components/src/components/button/button.tsx` — form submission with `formAssociated`

### 3. Create component files

Create `packages/components/src/components/$ARGUMENTS/` with these files:

**`$ARGUMENTS.tsx`** — Main component:
- `@Component({ tag: 'p-$ARGUMENTS', shadow: { delegatesFocus: true }, formAssociated: true })`
- `@AttachInternals() private internals: ElementInternals`
- `@Prop({ reflect: true }) public form?: string`
- `@Prop({ mutable: true }) public value?: string = ''`
- `@Prop() public name?: string`
- `@Prop() public disabled?: boolean = false`
- `@Prop() public required?: boolean = false`
- `@Prop() public state?: FormState = 'none'`
- `@Prop() public label?: string = ''`
- `@Prop() public message?: string = ''`
- Private `defaultValue` field for form reset
- `componentWillLoad()`: store `defaultValue`, call `internals.setFormValue()`
- `formResetCallback()`: restore `defaultValue`, update `internals`
- `formDisabledCallback(disabled)`: sync disabled state
- `@Watch('value')` handler calling `internals.setFormValue()`
- Use `implicitSubmit()` from `../../utils` for Enter key form submission
- Use `Label`, `StateMessage` functional components from `../common/`
- `render()` with `validateProps` + `attachComponentCss` + semantic `<input>` inside `<Host>`

**`$ARGUMENTS-styles.ts`** — JSS styles:
- Import form-specific style helpers from `../../styles/form-styles`
- Include `getFocusBaseStyles()` for input focus
- Include `getDisabledBaseStyles()` for disabled state
- Include `forcedColorsMediaQuery()` for HCM
- Follow the `getFunctionalComponentInputBaseStyles()` pattern if applicable

**`$ARGUMENTS-utils.ts`** — Types and utilities

**`$ARGUMENTS.spec.ts`** — Unit tests:
- `initComponent()` helper with mock `ElementInternals`:
  ```ts
  component['internals'] = {
    setFormValue: vi.fn(),
    form: { requestSubmit: vi.fn(), reset: vi.fn() } as unknown as HTMLFormElement,
  } as unknown as ElementInternals;
  ```
- Test `formResetCallback()` resets to default value
- Test `formDisabledCallback()` syncs disabled
- Test `componentWillLoad()` calls `setFormValue()`
- Test `@Watch('value')` handler

**`$ARGUMENTS-styles.spec.ts`** — Style snapshot tests

### 4. Verify

- Run `npm run test:unit:components -- $ARGUMENTS`
- Confirm form lifecycle methods work correctly
- Report what was created and suggest next steps
