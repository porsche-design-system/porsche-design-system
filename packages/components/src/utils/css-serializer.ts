// Converts a JSS-style object (e.g. { display: 'block' }) into a CSS string.
// We build the CSS text ourselves, then let `stylis` handle nesting and at-rules like @media.
//
// Don't swap this for emotion or another CSS-in-JS lib: it runs on the same stylis, so it
// wouldn't hoist/combine media queries either (we'd still need hoistAndCombineMedia below),
// and it adds class hashing/caching we don't use. More weight, no gain.
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

// stylis leaves @media where it was written, but the cascade needs it after the base rules:
// in High Contrast Mode a base rule and a forced-colors rule can hit the same element with
// equal weight, so the last one wins (e.g. the disabled counter color turning black instead
// of grey). So we move every @media to the end and merge same-query blocks, like JSS did.
const hoistAndCombineMedia = (css: string): string => {
  let base = '';
  const media = new Map<string, string>();
  const n = css.length;
  let i = 0;
  while (i < n) {
    const open = css.indexOf('{', i);
    if (open === -1) {
      base += css.slice(i);
      break;
    }
    const header = css.slice(i, open);
    // brace-match the block body (handles nested rules inside the block)
    let depth = 0;
    let end = open;
    for (; end < n; end++) {
      if (css[end] === '{') depth++;
      else if (css[end] === '}' && --depth === 0) break;
    }
    if (header.startsWith('@media')) {
      media.set(header, (media.get(header) ?? '') + css.slice(open + 1, end));
    } else {
      base += css.slice(i, end + 1);
    }
    i = end + 1;
  }
  let out = base;
  for (const [query, body] of media) out += `${query}{${body}}`;
  return out;
};

export const getCss = (jssStyles: Styles): string =>
  hoistAndCombineMedia(serialize(compile(mapToCss(jssStyles)), stringify));
