// Converts a JSS-style object (e.g. { display: 'block' }) into a CSS string.
// We build the CSS text ourselves, then let `stylis` handle nesting and at-rules like @media.
import { compile, serialize, stringify } from 'stylis';

// Loose stand-ins for jss's `Styles`/`JssStyle` types. Kept as `any` on purpose so the
// ~50 existing *-styles.ts files don't need to be retyped against strict CSS types.
export type JssStyle = Record<string, any>;
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = Record<string, any>;

// camelCase -> kebab-case, e.g. `marginLeft` -> `margin-left`. CSS custom properties
// (starting with `--`) are left untouched.
const hyphenate = (key: string): string =>
  key.startsWith('--') ? key : key.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

// Turns one style object into a CSS declaration string, e.g. { display: 'block' } -> "display:block;".
// - nested object (like `&:hover: {...}` or `@media (...): {...}`) -> recurse into a nested block
// - array -> repeated declarations (used for CSS fallback values)
// - null/undefined/boolean -> skipped (lets conditional styles like `color: cond ? x : undefined` drop out)
const styleToCss = (obj: Record<string, any>): string => {
  let out = '';
  for (const key in obj) {
    const v = obj[key];
    if (v == null || typeof v === 'boolean') continue;
    if (Array.isArray(v)) {
      for (const item of v) out += `${hyphenate(key)}:${String(item)};`;
    } else if (typeof v === 'object') {
      out += `${key}{${styleToCss(v)}}`;
    } else {
      out += `${hyphenate(key)}:${String(v)};`;
    }
  }
  return out;
};

const isConditional = (key: string): boolean =>
  key.startsWith('@media') ||
  key.startsWith('@supports') ||
  key.startsWith('@container') ||
  key.startsWith('@starting-style');

// Turns our top-level JSS-style map into one CSS string.
// - `@global` keys use their selector as-is (e.g. `:host`)
// - `@media`/`@supports`/... keys wrap another map of the same shape (recurse)
// - everything else becomes a `.className` selector
const mapToCss = (map: Record<string, any>): string => {
  let base = '';
  let conditional = '';
  for (const key in map) {
    if (key === '@global') {
      for (const gk in map['@global']) base += `${gk}{${styleToCss(map['@global'][gk])}}`;
    } else if (isConditional(key)) {
      conditional += `${key}{${mapToCss(map[key])}}`;
    } else {
      base += `.${key}{${styleToCss(map[key])}}`;
    }
  }
  return base + conditional;
};

export const getCss = (jssStyles: Styles): string => serialize(compile(mapToCss(jssStyles)), stringify);
