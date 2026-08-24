import { type Deprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { stylesheetIdentifier } from './deprecation';
import { flattenCssVariables, stripDeprecated } from './helpers';
import { cssVariableTokens } from './theme';
import type { StylesheetsMeta } from './types';
import { colorScheme } from './utilities/color-scheme';

// The `./meta` entry point. `cssVariableTokens` and `colorScheme` together are the catalog: every
// public declaration, documented and deprecated alike, and what the generated CSS is built from.
// The two exports below are its projections, so a declaration cannot reach a consumer without being
// documented or published as deprecated. There is no separate deprecated catalog — deprecating is
// one `deprecation` field on the declaration, never a move between two places.

/**
 * The documented single source of truth, shared with the storefront docs and the LLM skill: the
 * catalog without its deprecated declarations. A domain-keyed catalog whose leaves are a
 * discriminated `StylesheetNode` union: CSS variables are `token`s, the `.scheme-*` classes are
 * `utility`s. Use `kindOf` to recover a leaf's kind. Leaves are the same object references the CSS
 * is built from, so docs and generated CSS can't diverge. The `normalize` reset has no documented
 * leaves and therefore lives only in the composition layer (`css/index.ts`), not here.
 */
export const stylesheetsMeta = {
  ...stripDeprecated(cssVariableTokens),
  colorScheme: colorScheme.filter((node) => !isDeprecated(node)),
} satisfies StylesheetsMeta;

/**
 * The deprecated public surface as an ordered flat list of canonical identifiers and markers.
 *
 * Order is the rendered order of the deprecation index, and matches the generated stylesheets:
 * variables in `variables.css` order, then color-scheme classes in `color-scheme.css` order.
 */
export const stylesheetsDeprecations: Deprecations = [...flattenCssVariables(cssVariableTokens), ...colorScheme]
  .filter(isDeprecated)
  .map((node) => ({ identifier: stylesheetIdentifier(node), deprecation: node.deprecation }));

export { kindOf, type StylesheetKind } from './kind';
export type * from './types';
