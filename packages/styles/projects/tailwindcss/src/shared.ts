/**
 * Wraps a CSS custom property in the Tailwind v4 `--theme()` inline function.
 *
 * **Why is this necessary?**
 * When a Tailwind v4 project is configured with a prefix (e.g. `prefix: 'tw'`),
 * all custom properties declared in the `@theme` block are automatically prefixed
 * (e.g. `--radius-sm` becomes `--tw-radius-sm`). A plain `var(--radius-sm)`
 * reference would then resolve to the wrong (or undefined) variable.
 * `--theme(--radius-sm)` uses the Tailwind v4 inline theme function, which the
 * compiler resolves to the correct, potentially-prefixed property name at build
 * time — making every theme reference safe regardless of the configured prefix.
 *
 * @example
 * prefix('--radius-sm')  // → '--theme(--radius-sm)'
 */
export const prefix = (property: string): string => `--theme(${property})`;

// Shared t-shirt size labels reused across the grouped theme variables.
export const sizeLabel: Record<string, string> = {
  '2xs': '2x-small',
  xs: 'x-small',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'x-large',
  '2xl': '2x-large',
  '3xl': '3x-large',
  '4xl': '4x-large',
  '5xl': '5x-large',
};
