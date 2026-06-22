import { cssVariableTokens } from './theme';
import { colorScheme } from './utilities/color-scheme';
import type { StylesheetsMeta } from './types';

// The `./meta` entry point — the documented single source of truth, shared with the storefront
// docs and the (future) LLM skill. A domain-keyed catalog whose leaves are a discriminated
// `StylesheetNode` union: CSS variables are `token`s, the `.scheme-*` classes are `utility`s. Use
// `kindOf` to recover a leaf's kind. The `normalize` reset has no documented leaves and therefore
// lives only in the composition layer (`css/index.ts`), not here.
export const stylesheetsMeta = {
  ...cssVariableTokens,
  colorScheme,
} satisfies StylesheetsMeta;

export { cssVariableTokens } from './theme';
export { blur, border, color, font, motion, shadow, spacing } from './theme';
export { colorScheme, colorSchemePolyfillCssRule } from './utilities/color-scheme';
export { flattenColorVariables, flattenCssVariables, renderCss, renderCssNode } from './helpers';
export { kindOf, type StylesheetKind } from './kind';
export type * from './types';
