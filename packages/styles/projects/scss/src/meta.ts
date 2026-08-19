import { type PublishedDeprecation, publishDeprecations } from '@porsche-design-system/shared/deprecation';
import { scssIdentifier } from './deprecation';
import { blur, blurDeprecations } from './theme/blur';
import { border, borderDeprecations } from './theme/border';
import { breakpoint, breakpointDeprecations } from './theme/breakpoint';
import { color, colorDeprecations } from './theme/color';
import { font, fontDeprecations } from './theme/font';
import { gradient, gradientDeprecations } from './theme/gradient';
import { grid as gridVariables } from './theme/grid';
import { motion, motionDeprecations } from './theme/motion';
import { shadow, shadowDeprecations } from './theme/shadow';
import { spacing, spacingDeprecations } from './theme/spacing';
import type { DeprecatedScssNode, ScssDeprecationsMeta, ScssMeta } from './types';
import { focus, focusDeprecations } from './utilities/focus';
import { grid as gridMixin } from './utilities/grid';
import { mediaQuery, mediaQueryDeprecations } from './utilities/media-query';
import { skeleton, skeletonDeprecations } from './utilities/skeleton';
import { typography, typographyDeprecations } from './utilities/typography';

// `grid` combines the `template` layout mixin (`utilities/grid`) with the area-grouped token tree
// (`theme/grid`), shared with emotion / tailwind.

/**
 * The documented single source of truth: a flat, domain-keyed catalog mirroring `tokensMeta`. Token
 * domains use the tokens vocabulary; `typography`/`skeleton`/`focus`/`mediaQuery` are utility-only;
 * `grid` holds both kinds. A leaf's kind is recovered via `kindOf`. Plumbing lives in `scss/index.ts`.
 * Key order is chosen so the skill's `token` and `utility` views keep their documentation order.
 */
export const scssMeta = {
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
} satisfies ScssMeta;

/**
 * The deprecated public SCSS surface: every legacy variable and mixin that still ships, keyed by the
 * same root domains as {@link scssMeta}. A declaration lives in exactly one of the two catalogs — a
 * deprecation *moves* its node here rather than copying it — so the recommended API stays free of
 * legacy noise while the audit index keeps a complete, structured list to render from.
 *
 * Every root domain is spelled out, empty branches included, so "checked, nothing deprecated" stays
 * distinguishable from "forgotten". Key order is the rendered contract: the knowledge skill emits
 * entries in exactly this order.
 */
export const scssDeprecationsMeta = {
  border: borderDeprecations,
  blur: blurDeprecations,
  breakpoint: breakpointDeprecations,
  color: colorDeprecations,
  font: fontDeprecations,
  shadow: shadowDeprecations,
  spacing: spacingDeprecations,
  motion: motionDeprecations,
  gradient: gradientDeprecations,
  typography: typographyDeprecations,
  skeleton: skeletonDeprecations,
  focus: focusDeprecations,
  mediaQuery: mediaQueryDeprecations,
  grid: [],
} satisfies ScssDeprecationsMeta;

/**
 * The published deprecated surface: the catalog above as an ordered flat list of canonical
 * identifiers and markers. This is what consumers read — the nested catalog is routing information
 * for the partial composition, and the render inputs are of no use outside it.
 */
export const scssDeprecations: PublishedDeprecation[] = publishDeprecations<DeprecatedScssNode>(
  scssDeprecationsMeta,
  scssIdentifier
);
