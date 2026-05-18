---
name: new-form-component
description: Use when the user wants to create a new PDS form input component, scaffold a form-associated component with ElementInternals, or asks about creating an input, select, or textarea-style component.
---

# New Form Component

Scaffold a form-associated Stencil web component with ElementInternals, form lifecycle, and validation patterns.

**Component name**: read from the user's message (kebab-case, e.g., `input-currency`). Ask the user if not provided.

## Steps

### 1. Validate the name

- Ensure the name is kebab-case
- Check that `packages/components/src/components/{name}/` does not already exist
- Tag: `p-{name}`, Class: PascalCase of `{name}`

### 2. Study existing form component patterns

Read these reference files:
- `packages/components/src/components/input-text/input-text.tsx` — form component with ElementInternals
- `packages/components/src/components/textarea/textarea.tsx` — includes all form lifecycle callbacks

### 3. Create component files

**`{name}.tsx`** — Main component:
- `@Component({ tag: 'p-{name}', shadow: { delegatesFocus: true }, formAssociated: true })`
- `@AttachInternals() private internals: ElementInternals`
- `@Prop({ reflect: true }) public form?: string`
- `@Prop({ mutable: true }) public value?: string = ''`
- `@Prop() public name`, `disabled`, `required`, `state`, `label`, `message`
- Private `defaultValue` for form reset
- `componentWillLoad()`: store `defaultValue`, call `internals.setFormValue()`
- `formResetCallback()`: restore `defaultValue`, update `internals`
- `formDisabledCallback(disabled: boolean)`: sync disabled state
- `formStateRestoreCallback(state: string)`: restore from browser autofill
- `@Watch('value')` handler calling `internals.setFormValue()`
- Use `Label`, `StateMessage` from `../common/` and `implicitSubmit()` from `../../utils`

**`{name}-styles.ts`**: `getFocusBaseStyles()`, `getDisabledBaseStyles()`, `forcedColorsMediaQuery()`

**`{name}-utils.ts`**: Component-specific types

**`{name}.spec.ts`** — Unit tests with mock `ElementInternals`:
```ts
component['internals'] = {
  setFormValue: vi.fn(),
  form: { requestSubmit: vi.fn(), reset: vi.fn() } as unknown as HTMLFormElement,
} as unknown as ElementInternals;
```
Test `formResetCallback()`, `formDisabledCallback()`, `componentWillLoad()`, and `@Watch('value')`.

**`{name}-styles.spec.ts`** — Style snapshot tests

### 4. Verify

- Run `npm run test:unit:components -- {name}`
- Confirm form lifecycle methods work correctly

## In this repository (Porsche Design System)

- Follow `packages/components/AGENTS.md` for form component class pattern
- Build after creating: `npm run build:components` → `npm run build:components-js` → wrappers
