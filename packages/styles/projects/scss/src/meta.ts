import { type Deprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { scssIdentifier } from './deprecation';
import { kindOf } from './kind';
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
 * Internal source for generated partials, documentation, and deprecations. Key order is preserved in
 * rendered output.
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
 * Documented catalog with deprecated declarations removed. Shared leaf references keep docs and
 * generated SCSS aligned.
 */
export const scssMeta = stripDeprecated(scssCatalog) satisfies StylesMeta<ScssVariable, ScssMixin>;

/** The deprecated public scss surface as an ordered flat list of canonical identifiers and markers. */
export const scssDeprecations: Deprecations = flatten(scssCatalog)
  .filter(isDeprecated)
  .map((node) => ({
    usageKind: kindOf(node) === 'token' ? 'scssVariable' : 'scssMixin',
    identifier: scssIdentifier(node),
    deprecation: node.deprecation,
  }));
