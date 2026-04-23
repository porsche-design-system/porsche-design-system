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

## CSS Custom Properties (CSS Variables)

The prefix of a CSS variable encodes its **visibility** and **direction** (read vs. write). Pick
the narrowest prefix that fits and always scope component variables by the component name.

### Global Styles Variables — `--p-*`

Design tokens coming from the `index.css` file (colors, spacing, radii, typescale, etc.). These
are the public theme API and have no component segment.

```css
--p-color-primary
--p-spacing-fluid-md
--p-radius-lg
```

### Public API Variables — `--p-<component>-*`

Stable, writable API for consumers to customize a component. **Must have JSDoc** so
`component-meta` picks them up and generates them into the documentation. Suffixes may follow a
Tailwind-like syntax (`-pt`, `-px`, `-width`, …).

```css
--p-flyout-width
--p-modal-pt
```

### Public API Read-only Variables — `--ref-p-<component>-*`

Same rules and JSDoc requirement as public writable vars, but intended only to be **read** by
consumers (e.g. to align surrounding layout). Must never be set from the outside.

```css
--ref-p-flyout-pt
--ref-p-modal-px
```

### Internal CSS Variables — `--_p-<component>-{a,b,c,…}`

Implementation details, may change at any time. Used for inheritance between a component’s own
elements. For **nested components**, make sure to (re)define these variables on the nested
`:host` — otherwise they leak in via CSS inheritance from the outer component.

```css
--_p-dialog-a
--_p-table-b
```

### Custom Test Variables

No consistent naming convention yet. Used exclusively for testing purposes (e.g. to reset timing
in e2e/VRT) and are **not** part of the public API.

```css
--p-temporary-toast-timeout
--p-temporary-toast-skip-timeout
--p-animation-duration
--p-transition-duration
```
