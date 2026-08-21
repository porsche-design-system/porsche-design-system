import { type Deprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { scssIdentifier } from './deprecation';
import { flatten, stripDeprecated } from './scss/render';
import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { font } from './theme/font';
import { gradient } from './theme/gradient';
import { grid as gridVariables } from './theme/grid';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { spacing } from './theme/spacing';
import type { ScssMixin, ScssVariable, StylesMeta } from './types';
import { focus } from './utilities/focus';
import { grid as gridMixin } from './utilities/grid';
import { mediaQuery } from './utilities/media-query';
import { skeleton } from './utilities/skeleton';
import { typography } from './utilities/typography';

/**
 * Every public scss declaration, documented and deprecated alike, keyed by domain. This is what the
 * shipped partials are generated from and what `scssMeta` and `scssDeprecations` are projections of,
 * so a declaration cannot reach a consumer without being documented or published as deprecated.
 *
 * Internal on purpose: consumers read the two projections, never the catalog. Key order is the
 * rendered contract — the docs and the deprecation index emit entries in exactly this order.
 */
const scssCatalog = {
  border,
  blur,
  breakpoint,
  color,
  font,
  shadow,
  spacing,
  motion,
  gradient,
  typography,
  skeleton,
  focus,
  mediaQuery,
  grid: {
    template: gridMixin,
    ...gridVariables,
  },
};

/**
 * The documented single source of truth, shared with the storefront docs and LLM context: the
 * catalog without its deprecated declarations, checked against the cross-solution contract. Leaves
 * are the same object references the scss is built from, so docs and generated scss can't diverge.
 */
export const scssMeta = stripDeprecated(scssCatalog) satisfies StylesMeta<ScssVariable, ScssMixin>;

/** The deprecated public scss surface as an ordered flat list of canonical identifiers and markers. */
export const scssDeprecations: Deprecations = flatten(scssCatalog)
  .filter(isDeprecated)
  .map((node) => ({ identifier: scssIdentifier(node), deprecation: node.deprecation }));
