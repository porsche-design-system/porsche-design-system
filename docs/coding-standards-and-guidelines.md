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
