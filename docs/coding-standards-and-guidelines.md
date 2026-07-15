# Coding Standards and Guidelines

The Porsche Design System Coding Standards and Guidelines ensure consistency, maintainability, and performance across
all components. These best practices provide a unified approach to writing clean, efficient, and scalable code, aligning
with Porsche’s commitment to quality and innovation.

## Prop Naming

Prop names should represent whether a feature exists or is supported, rather than indicating actions or states. This
approach leads to more intuitive, maintainable, and predictable component APIs.

### Best Practices

- **Feature-Based Naming**: Props should describe the feature, not its action or state.
- **Avoid Action/State Verbs**: Terms like `show`, `hide`, `enable`, or `disable` suggest behavior rather than the
  presence of a feature.

### Examples

| ❌ Don't (Action/State-Based) | ✅ Do (Feature-Based)       |
| ----------------------------- | --------------------------- |
| `showPasswordToggle`          | `toggle`                    |
| `enableDarkMode`              | `mode`                      |
| `isActive`                    | `active`                    |
| `hideBorder`                  | `border` or `borderVisible` |

By following these principles, prop names remain intuitive and maintainable, ensuring clarity across the design system.

## Boolean Props

Boolean props should always indicate activation or presence of a feature, and their default value should be `false`.
This ensures that shorthand usage remains intuitive and predictable.

### Best Practices

- **Always Positive**: Boolean props should enable a feature rather than disable it.
- **Default to False**: A missing prop should imply `false`, avoiding unnecessary explicit declarations.

### Examples

| ❌ Don't (Negative Boolean) | ✅ Do (Positive Boolean) |
| --------------------------- | ------------------------ |
| `disableAnimation`          | `animation`              |
| `hideLabel`                 | `labelVisible`           |
| `isNotClickable`            | `clickable`              |

This approach simplifies component usage and improves readability, making the API more predictable and user-friendly.

## Controlled Components

Components that expose visibility or selection state use the **controlled** pattern, declared via the `@controlled`
JSDoc tag (consumed by `component-meta`). Which **event** a component emits depends on _who owns the trigger_.

### Event-by-family taxonomy

| Family                                  | Trigger ownership                                                   | Event                                       | Detail     | Examples                                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| **Intrinsic-disclosure toggle**         | Trigger is built into the component and always present              | `update`                                    | `{ open }` | `p-accordion`, `p-tabs-bar`, `p-switch`                                                                   |
| **Overlay with consumer-owned trigger** | Component owns only the close affordances (`Escape`, outside-click) | `dismiss`                                   | `void`     | `p-banner`, `p-modal`, `p-sheet`, `p-flyout`, `p-drilldown`                                               |
| **Value selection**                     | Internal interactive children mutate a value                        | `update` / `change` + `isInternallyMutated` | new value  | `p-select`, `p-multi-select`, `p-tabs`, `p-pagination`, `p-carousel`, `p-pin-code`, `p-segmented-control` |

The key distinction between the first two families is trigger ownership: an **intrinsic** trigger (e.g. the accordion
summary) is always part of the component, so it must signal both open and close via `update`. An **overlay** delegates
the open intent to a consumer-owned trigger and only signals its own close affordances via `dismiss`.

### Dual-mode (controlled _and_ uncontrolled)

A component may support both modes. The mode is detected from the optional state prop:

- **Uncontrolled**: the prop is `undefined` → the component owns state internally (`@State`).
- **Controlled**: the prop is a `boolean` (set via property/binding) → the consumer owns state; the component emits its
  family event and never mutates the prop.

Derive a single `effective<State>` getter from `isControlled ? prop : internalState`, route **all reads** through it,
and route **all writes** through one place that emits in controlled mode and mutates internal state otherwise.

> **Boolean attribute caveat:** In plain HTML a boolean attribute cannot express "controlled + initially false" (absent
> ⇒ uncontrolled, present ⇒ `true`). Controlled mode is therefore driven by setting the **property** to a boolean; omit
> it for uncontrolled usage.

## CSS Custom Properties (CSS Variables)

The prefix of a CSS variable encodes its **visibility** and **direction** (read vs. write). Pick the narrowest prefix
that fits and always scope component variables by the component name.

### Global Styles Variables — `--p-*`

Design tokens coming from the global styles (colors, spacing, typescale, etc.). These are the public theme API and have
no component segment.

```css
--p-color-primary
--p-spacing-fluid-md
--p-radius-lg
```

### Public API Variables — `--p-<component>-*`

Stable, writable API for consumers to customize a component. **Must have JSDoc** so `component-meta` picks them up and
generates them into the documentation. Suffixes may follow a Tailwind-like syntax (`-pt`, `-px`, `-width`, …).

```css
--p-flyout-width
--p-modal-pt
```

### Public API Read-only Variables — `--ref-p-<component>-*`

Same rules and JSDoc requirement as public writable vars, but intended only to be **read** by consumers (e.g. to align
surrounding layout). Must never be set from the outside.

```css
--ref-p-flyout-pt
--ref-p-modal-px
```

### Internal CSS Variables — `--_p-<component>-{a,b,c,…}`

Implementation details, may change at any time. Used for inheritance between a component’s own elements. For nested
components, define these variables on the `:host` to override them and prevent inheritance. If inheritance is desired,
do not redefine them.

```css
--_p-dialog-a
--_p-table-b
```

### Custom Test Variables

No consistent naming convention yet. Used exclusively for testing purposes (e.g. to reset timing in e2e/VRT) and are
**not** part of the public API.

```css
--p-temporary-toast-timeout
--p-temporary-toast-skip-timeout
--p-temporary-spinner-stroke-dasharray
--p-animation-duration
--p-transition-duration
```
