import { type PublishedDeprecation, publishDeprecations } from '@porsche-design-system/shared/deprecation';
import { tailwindIdentifier } from './deprecation';
import { blur } from './theme/blur';
import { border, borderDeprecations } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { font } from './theme/font';
import { motion, motionDeprecations } from './theme/motion';
import { shadow, shadowDeprecations } from './theme/shadow';
import { spacing } from './theme/spacing';
import type { DeprecatedTailwindNode, TailwindDeprecationsMeta, TailwindMeta } from './types';
import { displayUtilities } from './utilities/display';
import { gradientUtilities } from './utilities/gradient';
import { grid } from './utilities/grid';
import { headingUtilities } from './utilities/heading';
import { skeletonUtilities } from './utilities/skeleton';
import { textUtilities } from './utilities/text';

/**
 * The documented single source of truth — a flat, domain-keyed catalog mirroring `tokensMeta` (and
 * the scss `scssMeta`). Token domains use the tokens vocabulary; `typography` holds the prose
 * shorthands, `gradient` / `grid` / `skeleton` are the remaining `@utility` groups. A leaf's kind is
 * recovered via `kindOf`. CSS-only plumbing (resets, defaults, layers, keyframes, deprecated
 * aliases) lives in `css/index.ts`, which assembles the stylesheet from these same object
 * references — so docs and generated CSS can never diverge. Key order mirrors the scss `scssMeta`
 * (and `tokensMeta`) verbatim, minus the `focus` / `mediaQuery` domains Tailwind doesn't ship, so the
 * domains line up one-to-one across solutions for the shared skill / storefront renderer.
 */
export const tailwindMeta = {
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
} satisfies TailwindMeta;

/**
 * The deprecated public surface: every legacy custom property and utility that still ships, keyed by
 * the same root domains as {@link tailwindMeta}. A declaration lives in exactly one of the two
 * catalogs — a deprecation *moves* its node here rather than copying it — so the recommended API
 * stays free of legacy noise while the audit index keeps a complete, structured list to render from.
 *
 * Every root domain is spelled out, empty branches included, so "checked, nothing deprecated" stays
 * distinguishable from "forgotten". Key order is the rendered contract: the knowledge skill emits
 * entries in exactly this order.
 */
export const tailwindDeprecationsMeta = {
  border: borderDeprecations,
  blur: [],
  breakpoint: [],
  color: [],
  font: [],
  shadow: shadowDeprecations,
  spacing: [],
  motion: motionDeprecations,
  gradient: [],
  typography: [],
  skeleton: [],
  grid: [],
} satisfies TailwindDeprecationsMeta;

/**
 * The published deprecated surface: the catalog above as an ordered flat list of canonical
 * identifiers and markers. This is what consumers read — the nested catalog is routing information
 * for the `@theme` composition, and the render inputs are of no use outside it.
 */
export const tailwindDeprecations: PublishedDeprecation[] = publishDeprecations<DeprecatedTailwindNode>(
  tailwindDeprecationsMeta,
  tailwindIdentifier
);
