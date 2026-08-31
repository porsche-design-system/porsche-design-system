import { type Deprecations, isDeprecated } from '@porsche-design-system/shared/deprecation';
import { flatten, stripDeprecated } from './css/render';
import { tailwindIdentifier } from './deprecation';
import { kindOf } from './kind';
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
 * Internal source for generated CSS, documentation, and deprecations. Domain order mirrors SCSS
 * where both integrations expose the same concepts.
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
 * Documented catalog with deprecated declarations removed. Shared leaf references keep docs and
 * generated CSS aligned.
 */
export const tailwindMeta = stripDeprecated(tailwindCatalog) satisfies StylesMeta<
  TailwindThemeVariable,
  TailwindUtility
>;

const declarations = flatten(tailwindCatalog) as (TailwindThemeVariable | TailwindUtility)[];

export const tailwindDeprecations: Deprecations = declarations.filter(isDeprecated).map((node) => ({
  usageKind: kindOf(node) === 'token' ? 'cssCustomProperty' : 'cssClass',
  identifier: tailwindIdentifier(node),
  deprecation: node.deprecation,
}));
