import { isDeprecated, type PublishedDeprecation } from '@porsche-design-system/shared/deprecation';
import { flatten, stripDeprecated } from './css/render';
import { tailwindIdentifier } from './deprecation';
import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { font } from './theme/font';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { spacing } from './theme/spacing';
import type { StylesMeta, TailwindThemeVariable, TailwindUtility } from './types';
import { displayUtilities } from './utilities/display';
import { gradientUtilities } from './utilities/gradient';
import { grid } from './utilities/grid';
import { headingUtilities } from './utilities/heading';
import { skeletonUtilities } from './utilities/skeleton';
import { textUtilities } from './utilities/text';

/**
 * Every public Tailwind declaration, documented and deprecated alike, keyed by domain. This is what
 * the generated `index.css` is built from and what `tailwindMeta` and `tailwindDeprecations` are
 * projections of, so a declaration cannot reach a consumer without being documented or published as
 * deprecated.
 *
 * Internal on purpose: consumers read the two projections, never the catalog. Key order mirrors the
 * scss catalog (and `tokensMeta`) verbatim, minus the `focus` / `mediaQuery` domains Tailwind
 * doesn't ship, so the domains line up one-to-one across solutions.
 */
const tailwindCatalog = {
  border,
  blur,
  breakpoint,
  color,
  font,
  shadow,
  spacing,
  motion,
  gradient: gradientUtilities,
  typography: {
    heading: headingUtilities,
    text: textUtilities,
    display: displayUtilities,
  },
  skeleton: skeletonUtilities,
  grid,
};

/**
 * The documented single source of truth, shared with the storefront docs and LLM context: the
 * catalog without its deprecated declarations, checked against the cross-solution contract. Leaves
 * are the same object references the CSS is built from, so docs and generated CSS can't diverge.
 */
export const tailwindMeta = stripDeprecated(tailwindCatalog) satisfies StylesMeta<
  TailwindThemeVariable,
  TailwindUtility
>;

/**
 * The deprecated public Tailwind surface as an ordered flat list of canonical identifiers and
 * markers. `flatten` is shared with the CSS composition layer and so widens catalog leaves to
 * `CssNode`; the catalog holds nothing else, which is what the annotation restates.
 */
const declarations = flatten(tailwindCatalog) as (TailwindThemeVariable | TailwindUtility)[];

export const tailwindDeprecations: PublishedDeprecation[] = declarations
  .filter(isDeprecated)
  .map((node) => ({ identifier: tailwindIdentifier(node), deprecation: node.deprecation }));
