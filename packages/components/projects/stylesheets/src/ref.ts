// Wraps a bare CSS custom property name
// (e.g. `--p-color-canvas`, exported as a plain literal const) into a CSS
// `var(...)` reference, optionally with a fallback. Kept as a standalone module
// with no side effects so bundlers (Stencil/Rollup) can tree-shake it together
// with the individual variable consts.

/**
 * Wraps a CSS custom property name into a `var(...)` reference.
 *
 * @example
 * import { colorCanvas, ref } from '@porsche-design-system/stylesheets';
 * const styles = { background: ref(colorCanvas) }; // -> 'var(--p-color-canvas)'
 * const styles = { color: ref(colorPrimary, '#000') }; // -> 'var(--p-color-primary, #000)'
 *
 * @param name The bare CSS custom property name, e.g. `--p-color-canvas`.
 * @param fallback Optional fallback value used when the variable is not defined.
 */
export const ref = (name: string, fallback?: string | number): string =>
  `var(${name}${fallback === undefined ? '' : `, ${fallback}`})`;
