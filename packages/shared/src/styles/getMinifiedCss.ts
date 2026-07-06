// Converts a JSS-style object (e.g. { display: 'block' }) into a CSS string.
// Same approach as packages/components/src/utils/emotionCss.ts: we build the CSS text
// ourselves, then let `stylis` handle nesting and at-rules like @media.
// `@emotion/unitless` is just a small list of CSS properties that don't take a unit
// (e.g. `opacity`, `zIndex`) — used below to decide when to auto-add `px` to numbers.
import unitless from '@emotion/unitless';
import { compile, serialize, stringify } from 'stylis';

// Loose stand-ins for jss's `Styles`/`JssStyle` types (see components' emotionCss.ts).
export type JssStyle = Record<string, any>;
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = Record<string, any>;

// camelCase -> kebab-case, e.g. `marginLeft` -> `margin-left`. CSS custom properties
// (starting with `--`) are left untouched.
const hyphenate = (key: string): string =>
  key.startsWith('--') ? key : key.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

// Numbers become `Npx` unless the property is unitless (e.g. `opacity: 0.5`), a custom
// property, or the value is `0`.
const toValue = (key: string, v: any): string =>
  typeof v === 'number' && v !== 0 && unitless[key] !== 1 && !key.startsWith('--') ? `${v}px` : String(v);

// Turns one style object into a CSS declaration string, e.g. { display: 'block' } -> "display:block;".
// - nested object (like `@media (...): {...}`) -> recurse into a nested block
// - array -> repeated declarations (used for CSS fallback values)
// - null/undefined/boolean -> skipped
const styleToCss = (obj: Record<string, any>): string => {
  let out = '';
  for (const key in obj) {
    const v = obj[key];
    if (v == null || typeof v === 'boolean') continue;
    if (Array.isArray(v)) {
      for (const item of v) out += `${hyphenate(key)}:${toValue(key, item)};`;
    } else if (typeof v === 'object') {
      out += `${key}{${styleToCss(v)}}`;
    } else {
      out += `${hyphenate(key)}:${toValue(key, v)};`;
    }
  }
  return out;
};

const isConditional = (key: string): boolean => key.startsWith('@media') || key.startsWith('@supports');

// Top-level selector keys like `:host` stay as-is; plain names (e.g. `class`) become `.class`.
const toSelector = (key: string): string => (/^[a-zA-Z][\w-]*$/.test(key) ? `.${key}` : key);

// Turns our top-level JSS-style map into one CSS string.
// - `@global` keys use their selector as-is (e.g. `:host`)
// - `@font-face` accepts one face object or an array of them
// - `@media`/`@supports` keys wrap another map of the same shape (recurse)
// - everything else goes through `toSelector`
const mapToCss = (map: Record<string, any>): string => {
  let base = '';
  let conditional = '';
  for (const key in map) {
    if (key === '@global') {
      for (const gk in map['@global']) base += `${gk}{${styleToCss(map['@global'][gk])}}`;
    } else if (key === '@font-face') {
      const value = map['@font-face'];
      for (const face of Array.isArray(value) ? value : [value]) base += `@font-face{${styleToCss(face)}}`;
    } else if (isConditional(key)) {
      conditional += `${key}{${mapToCss(map[key])}}`;
    } else {
      base += `${toSelector(key)}{${styleToCss(map[key])}}`;
    }
  }
  return base + conditional;
};

export const getCss = (style: Styles): string => serialize(compile(mapToCss(style)), stringify);

// `getCss` output from stylis is already compact; just drop the last unnecessary `;` before `}`.
export const getMinifiedCss = (style: Styles): string => getCss(style).replace(/;(?=})/g, '');
