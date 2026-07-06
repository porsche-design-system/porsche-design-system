// object->CSS engine: a raw JSS-style selector map -> one CSS stylesheet string. Mirrors
// packages/components/src/utils/emotionCss.ts's approach: `mapToCss`/`styleToCss` flatten the
// style object to a CSS string (camelCase->kebab, selector/at-rule keys verbatim), then `stylis`
// compiles + stringifies it, resolving nesting/at-rules with no per-at-rule handling of our own.
// `@emotion/unitless` is emotion's own canonical (dependency-free) list of unitless CSS properties;
// reused here instead of `@emotion/serialize` so numeric values keep the exact same auto-`px`
// behaviour this file always had, without pulling in the rest of the emotion serializer.
import unitless from '@emotion/unitless';
import { compile, serialize, stringify } from 'stylis';

// Loose replacements for jss's `Styles`/`JssStyle` (permissive on purpose — see components' emotionCss).
export type JssStyle = Record<string, any>;
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = Record<string, any>;

// camelCase property name -> kebab-case, matching @emotion/serialize's hyphenateStyleName:
// prefix every uppercase letter (and a leading `ms`) with `-` then lowercase, so `WebkitMask` ->
// `-webkit-mask`. Custom properties (`--_p-x`) pass through untouched.
const hyphenate = (key: string): string =>
  key.startsWith('--') ? key : key.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

// stringify a declaration value; numbers auto-append `px` unless the property is unitless or a
// custom property, and unless the value is `0` (matches @emotion/serialize's numeric handling).
const toValue = (key: string, v: any): string =>
  typeof v === 'number' && v !== 0 && unitless[key] !== 1 && !key.startsWith('--') ? `${v}px` : String(v);

// style object -> flat CSS declaration string with selector/at-rule keys kept verbatim for stylis.
// Nested object value => `keyVerbatim{ ...recurse... }`; primitive => `prop:value;`; array =>
// repeated declarations (CSS fallback values). Skips null/undefined/boolean values so conditional
// props drop out instead of emitting e.g. `color:undefined;`.
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

// top-level selector key -> emitted selector. Pseudo/attribute selectors (e.g. `:host`) stay
// verbatim; plain identifiers become classes (mirrors jss's key-as-generated-class behaviour).
const toSelector = (key: string): string => (/^[a-zA-Z][\w-]*$/.test(key) ? `.${key}` : key);

// Translate a JSS-style map to a nested CSS string. `@global` children keep their selector
// verbatim; `@font-face` accepts a single face object or an array of them; a top-level conditional
// at-rule key wraps its (recursively translated) body; every other key goes through `toSelector`.
// Base rules emit before conditional at-rule blocks so conditionals override the base cascade
// (stylis preserves source order and hoists nested at-rules to sit after their base rule).
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

// stylis's compact stringify already omits the whitespace `getMinifiedCss` used to strip via regex;
// the only remaining byte to shave is the (harmless but unnecessary) trailing `;` before `}`.
export const getMinifiedCss = (style: Styles): string => getCss(style).replace(/;(?=})/g, '');
