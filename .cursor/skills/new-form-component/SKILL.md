---
name: new-form-component
description: Scaffold a form-associated Stencil web component with ElementInternals, form lifecycle, and validation patterns. Use when creating a new input/select/textarea-style component.
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
- `packages/components/src/components/input-text/input-text-styles.ts` — form input styles
- `packages/components/src/components/input-text/input-text.spec.ts` — form component tests
- `packages/components/src/components/textarea/textarea.tsx` — includes formStateRestoreCallback

### 3. Create component files

Create `packages/components/src/components/{name}/` with these files:

**`{name}.tsx`** — Main component:
- `@Component({ tag: 'p-{name}', shadow: { delegatesFocus: true }, formAssociated: true })`
- `@AttachInternals() private internals: ElementInternals`
- `@Prop({ reflect: true }) public form?: string`
- `@Prop({ mutable: true }) public value?: string = ''`
- `@Prop() public name?: string`, `disabled`, `required`, `state`, `label`, `message`
- Private `defaultValue` field for form reset
- `componentWillLoad()`: store `defaultValue`, call `internals.setFormValue()`
- `formResetCallback()`: restore `defaultValue`, update `internals`
- `formDisabledCallback(disabled: boolean)`: sync disabled state
- `formStateRestoreCallback(state: string)`: restore from browser autofill
- `@Watch('value')` handler calling `internals.setFormValue()`
- Use `implicitSubmit()` from `../../utils` for Enter key form submission
- Use `Label`, `StateMessage` functional components from `../common/`
- `render()` with `validateProps` + `attachComponentCss` + semantic `<input>` inside shadow DOM

**`{name}-styles.ts`** — JSS styles:
- Include `getFocusBaseStyles()` for input focus
- Include `getDisabledBaseStyles()` for disabled state
- Include `forcedColorsMediaQuery()` for HCM

**`{name}-utils.ts`** — Types and utilities

**`{name}.spec.ts`** — Unit tests:
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

**`{name}-styles.spec.ts`** — Style snapshot tests

### 4. Verify

- Run `npm run test:unit:components -- {name}`
- Confirm form lifecycle methods work correctly
- Report what was created and suggest next steps

## In this repository (Porsche Design System)

- Follow `packages/components/AGENTS.md` for form component class pattern
- Build after creating: `npm run build:components` → `npm run build:components-js` → wrappers
- Lint/format: `npm run lint` and `npm run format`
- Tests: `npm run test:unit:components -- {name}.spec.ts`
