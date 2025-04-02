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
