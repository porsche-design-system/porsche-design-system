// Converts a JSS-style object (e.g. { display: 'block' }) into a CSS string.
// We build the CSS text ourselves, then let `stylis` handle nesting and at-rules like @media.
//
// Don't swap this for emotion or another CSS-in-JS lib: it runs on the same stylis, so it
// wouldn't hoist/combine media queries either (we'd still need hoistAndCombineMedia below),
// and it adds class hashing/caching we don't use. More weight, no gain.
import { compile, serialize, stringify } from 'stylis';

// Shape of the style objects passed to getCss(), e.g. { root: { color: 'red', '&:hover': { color: 'blue' } } }.
// A key is either a CSS property (color) or a selector/at-rule (&:hover, @media ...); a value is a string or
// number, an array of them (CSS fallback values), or another nested style object.
// Kept loose (not strict CSS types): property keys and selector keys are both just strings, so TypeScript
// can't tell them apart or catch typos here. Same trade-off the old jss types had.
type JssStyleValue = string | number | (string | number)[] | null | false | undefined;
export type JssStyle = { [key: string]: JssStyleValue | JssStyle };
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = JssStyle;

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

// Orders combined @media blocks like JSS's jss-plugin-sort-css-media-queries did: min-width/height
// ascending, max-width/height descending, dimensionless queries (forced-colors/hover/pointer) kept
// in source order between them. Without this, overlapping breakpoints of equal specificity cascade
// by source order, so the wrong one can win (e.g. a min-width:760 override losing to min-width:480).
const mediaSortKey = (header: string): [number, number] => {
  const min = header.match(/min-(?:width|height):\s*(\d+)/);
  if (min) return [0, Number(min[1])];
  const max = header.match(/max-(?:width|height):\s*(\d+)/);
  if (max) return [2, -Number(max[1])]; // negate so ascending sort yields descending value
  return [1, 0];
};

// stylis leaves @media where it was written, but the cascade needs it after the base rules:
// in High Contrast Mode a base rule and a forced-colors rule can hit the same element with
// equal weight, so the last one wins (e.g. the disabled counter color turning black instead
// of grey). So we move every @media to the end, merge same-query blocks, and re-sort them.
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
  const entries = [...media].sort((a, b) => {
    const [ca, va] = mediaSortKey(a[0]);
    const [cb, vb] = mediaSortKey(b[0]);
    return ca - cb || va - vb;
  });
  let out = base;
  for (const [query, body] of entries) out += `${query}{${body}}`;
  return out;
};

export const getCss = (jssStyles: Styles): string =>
  hoistAndCombineMedia(serialize(compile(mapToCss(jssStyles)), stringify));
