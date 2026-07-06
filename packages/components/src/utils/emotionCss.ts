// object->CSS engine: a raw JSS-style selector map -> one CSS stylesheet string.
// `styleToCss` flattens the style object to a nested CSS string (camelCase->kebab, selector/at-rule
// keys verbatim, `&` nesting preserved); `stylis` compiles + stringifies it, resolving all nesting
// and every at-rule (@media/@supports/@container/@starting-style/@keyframes and anything CSS adds
// next) with no per-at-rule handling of our own. Output is semantically equivalent to the former
// JSS output (same rules/values/cascade order) but compact, not pretty-printed.
// stylis ships no bundled types; the toolchain transpiles regardless.
// @ts-expect-error
import { compile, serialize, stringify } from 'stylis';

// Loose replacements for jss's `Styles`/`JssStyle` (the style-object contract for getCss and the
// *-styles.ts authoring files). Kept permissive on purpose — csstype's strict property typing
// would surface hundreds of errors across the ~50 style files.
export type JssStyle = Record<string, any>;
// generic params mirror jss's `Styles<Name, Data, Theme>` so existing `Styles<...>` usages still
// typecheck; they're intentionally ignored (the map stays permissive).
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = Record<string, any>;

// camelCase property name -> kebab-case, matching @emotion/serialize's hyphenateStyleName:
// prefix every uppercase letter (and a leading `ms`) with `-` then lowercase, so `WebkitMask` ->
// `-webkit-mask`. Custom properties (`--_p-x`) pass through untouched.
const hyphenate = (key: string): string =>
  key.startsWith('--') ? key : key.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

// style object -> flat CSS declaration string with selector/at-rule keys kept verbatim for stylis.
// Nested object value => `keyVerbatim{ ...recurse... }`; primitive => `prop:value;`; array =>
// repeated declarations (CSS fallback values). Skips null/undefined/boolean values so conditional
// props like `color: cond ? x : undefined` drop out. Numbers stringify as-is (no `px` auto-append)
// and `content` passes through verbatim.
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

// Translate a JSS-style map to a nested CSS string. `@global` children keep their selector
// verbatim; a top-level conditional at-rule key wraps its (recursively translated) body; every
// other key becomes a `.class` selector. Base rules emit before conditional at-rule blocks so
// conditionals override the base cascade (stylis preserves source order and hoists nested at-rules
// to sit after their base rule).
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
