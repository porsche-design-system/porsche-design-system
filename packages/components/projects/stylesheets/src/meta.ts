import { type Deprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { stylesheetIdentifier } from './deprecation';
import { flattenCssVariables, stripDeprecated } from './helpers';
import { kindOf } from './kind';
import { cssVariableTokens } from './theme';
import type { StylesheetsMeta } from './types';
import { colorScheme } from './utilities/color-scheme';

// Internal metadata for storefront docs and skill generation; wrappers publish only generated CSS.

/**
 * Documented catalog with deprecated declarations removed. Shared leaf references keep docs and
 * generated CSS aligned.
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
  .map((node) => ({
    usageKind: kindOf(node) === 'token' ? 'cssCustomProperty' : 'cssClass',
    identifier: stylesheetIdentifier(node),
    deprecation: node.deprecation,
  }));

export { kindOf, type StylesheetKind } from './kind';
export type * from './types';
