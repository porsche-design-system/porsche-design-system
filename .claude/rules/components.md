---
globs: packages/components/**
---

# Stencil Web Components (`packages/components/`)

Core web components built with Stencil. These are the source-of-truth components that get wrapped for Angular, React, and Vue.

## File Structure (per component)

```
src/components/{name}/
├── {name}.tsx              # Stencil component class
├── {name}-styles.ts        # JSS style function
├── {name}-utils.ts         # Utility functions and types
├── {name}.spec.ts          # Unit tests (component logic)
├── {name}-styles.spec.ts   # Unit tests (style snapshots)
├── {name}-utils.spec.ts    # Unit tests (utilities)
└── {name}.props.md         # Auto-generated — DO NOT EDIT
```

## Component Class Pattern

```tsx
import { AttachInternals, Component, Element, Host, h, type JSX, Listen, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, validateProps } from '../../utils';
import { getComponentCss } from './{name}-styles';

const propTypes: PropTypes<typeof MyComponent> = {
  variant: AllowedTypes.oneOf<Variant>(VARIANTS),
  disabled: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<AriaAttribute>(ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-{name}',
  shadow: { delegatesFocus: true },  // delegatesFocus for interactive components
  formAssociated: true,               // only for form components
})
export class MyComponent {
  @Element() public host!: HTMLElement;

  @Prop() public variant?: Variant = 'primary';
  @Prop() public disabled?: boolean = false;
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;
  @Prop() public aria?: SelectedAriaAttributes<AriaAttribute>;
  @Prop({ reflect: true }) public form?: string;  // reflect for form association

  @AttachInternals() private internals: ElementInternals;  // only for form components

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.variant, this.disabled, this.compact);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button class="root">
          <slot />
        </button>
      </Host>
    );
  }
}
```

Key conventions:
- `propTypes` constant defined before the class, using `AllowedTypes` validators
- `validateProps(this, propTypes)` is always first in `render()`
- `attachComponentCss()` is always second in `render()`
- `componentShouldUpdate` with `hasPropValueChanged` to prevent unnecessary re-renders
- `getPrefixedTagNames(this.host)` for referencing child PDS components in JSX

## Stencil Decorators

| Decorator | Usage |
|-----------|-------|
| `@Component` | Class-level: `tag`, `shadow`, `formAssociated` |
| `@Element()` | Reference to host element |
| `@Prop()` | Public property. Add `{ reflect: true }` for HTML attribute reflection, `{ mutable: true }` for internal mutation |
| `@State()` | Internal reactive state |
| `@Watch('propName')` | React to prop/state changes |
| `@Event()` | Emit custom events |
| `@Listen('eventName')` | Listen to events. Add `{ capture: true }` for click interception |
| `@AttachInternals()` | Access ElementInternals API for form components |

## JSS Styling Pattern

```ts
// {name}-styles.ts
import { getDisabledBaseStyles, getTransition } from '../../styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss, mergeDeep } from '../../utils';

export const getComponentCss = (
  variant: Variant,
  isDisabled: boolean,
  isCompact: BreakpointCustomizable<boolean>
): string => {
  return getCss(
    mergeDeep(
      {
        root: {
          transition: getTransition('opacity'),
          ...(isDisabled && {
            ...getDisabledBaseStyles(),
          }),
        },
        label: {
          // class-based selectors
        },
      }
    )
  );
};
```

Style conventions:
- Class names as object keys: `root`, `label`, `icon`, `spinner`, etc.
- Conditional styles via spread: `...(condition && { /* styles */ })`
- Shared style composition via `mergeDeep()`
- `getTransition(cssProperty, duration?, easing?)` for animations
- `getDisabledBaseStyles(forcedColorsOverrides?)` for disabled states
- `getFocusBaseStyles(offset?)` for focus rings — **mandatory for interactive elements**
- `getHiddenTextJssStyle(isHidden?)` for visually hidden text
- `forcedColorsMediaQuery({ /* HCM overrides */ })` for High Contrast Mode

## CSS Variable Naming

| Prefix | Scope | Example |
|--------|-------|---------|
| `--p-*` | Global design tokens | `--p-color-primary` |
| `--p-<component>-*` | Public writable API (needs JSDoc) | `--p-flyout-width` |
| `--ref-p-<component>-*` | Public read-only API (needs JSDoc) | `--ref-p-flyout-pt` |
| `--_p-<component>-{a,b,c}` | Internal, may change | `--_p-button-a` |

Internal CSS variables use single-letter suffixes (`a`, `b`, `c`) to keep them terse.

## Common Functional Components

Shared building blocks in `src/components/common/`:
- `LoadingMessage` — screen reader loading announcements
- `StateMessage` — validation messages for form components
- `Label` — form control labels
- `Required` — required indicator
- `NoResultsOption` — empty state for select/multi-select

## Form Component Pattern

```tsx
@Component({
  tag: 'p-input-text',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputText {
  @AttachInternals() private internals: ElementInternals;
  @Prop({ reflect: true }) public form?: string;
  @Prop({ mutable: true }) public value?: string = '';

  private defaultValue: string;

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.internals?.setFormValue(this.value);
  }

  public formResetCallback(): void {
    this.value = this.defaultValue;
    this.internals?.setFormValue(this.value);
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }
}
```

Key: `formResetCallback` and `formDisabledCallback` are native form lifecycle methods. Use `implicitSubmit()` from `../../utils` for Enter key form submission.

## Utility Modules

| Module | Location | Purpose |
|--------|----------|---------|
| A11y helpers | `src/utils/a11y/a11y.ts` | `setAriaAttributes()`, `parseAndGetAriaAttributes()` |
| Button a11y | `src/utils/a11y/button/` | Button-specific ARIA logic |
| Link a11y | `src/utils/a11y/link/` | Link-specific ARIA logic |
| Validation | `src/utils/validation/` | Prop and child validation |
| Dialog utils | `src/utils/dialog/` | Shared overlay/dialog behavior |
| Form utils | `src/utils/form/` | Form association helpers |
| JSS engine | `src/utils/jss.ts` | CSS injection, style caching |
| Breakpoints | `src/utils/breakpoint-customizable.ts` | Responsive prop parsing |
| Prop changes | `src/utils/hasPropValueChanged.ts` | Prevent unnecessary re-renders |

## Accessibility Requirements

- **Focus**: Use `getFocusBaseStyles(offset)` — produces `outline: 2px solid` with forced-colors fallback to `Highlight`. Always use `:focus-visible`, never `:focus`. Never `outline: none` without replacement.
- **HCM**: Wrap overrides in `forcedColorsMediaQuery()`. Don't rely on shadows or semi-transparent borders.
- **ARIA**: Use helpers from `src/utils/a11y/a11y.ts`. Use `getHiddenTextJssStyle()` for visually-hidden text.
- **Semantics**: Use native HTML elements (`button`, `a`, `input`) inside shadow DOM where possible.

## Unit Testing Pattern

```ts
import { vi } from 'vitest';
import { Button } from './button';

const initComponent = (): Button => {
  const component = new Button();
  component.host = document.createElement('p-button');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = {
    setFormValue: vi.fn(),
    form: { requestSubmit: vi.fn(), reset: vi.fn() } as unknown as HTMLFormElement,
  } as unknown as ElementInternals;
  return component;
};

describe('componentWillLoad', () => {
  it('should call setFormValue()', () => {
    const component = initComponent();
    component.value = 'test';
    component.form = 'some-form';
    component.componentWillLoad();
    expect(component['internals'].setFormValue).toHaveBeenCalledWith('test');
  });
});
```

Key patterns:
- Instantiate component class directly — no DOM rendering
- Attach shadow DOM manually: `host.attachShadow({ mode: 'open' })`
- Mock `ElementInternals` with `vi.fn()` for form components
- Call lifecycle methods explicitly (`connectedCallback`, `componentWillLoad`, etc.)
- Access private members via bracket notation: `component['internals']`

## Cross-Package Test Locations

Tests exercising these components also live in `packages/components-js/tests/`:
- `e2e/specs/` — functional browser tests
- `vrt/specs/` — visual regression tests
- `a11y/specs/axe-core/` — automated accessibility scans
- `a11y/specs/a11ytree/` — accessibility tree snapshots

## Commands

```bash
npm run start:components                     # Dev server
npm run build:components                     # Build
npm run test:unit:components                 # All unit tests
npm run test:unit:components -- button.spec  # Specific test
```

## Done Checklist

- [ ] Keyboard navigation works end-to-end
- [ ] Focus ring uses `getFocusBaseStyles()` behavior
- [ ] `forced-colors: active` shows all states and focus correctly
- [ ] Axe-core and a11y tree tests pass
- [ ] Unit tests pass
