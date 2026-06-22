import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { displayUtilities } from './utilities/display';
import { font } from './theme/font';
import { gradientUtilities } from './utilities/gradient';
import { gridUtilities } from './utilities/grid';
import { headingUtilities } from './utilities/heading';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { skeletonUtilities } from './utilities/skeleton';
import { spacing } from './theme/spacing';
import { textUtilities } from './utilities/text';
import type { TailwindMeta } from './types';

/**
 * The documented single source of truth — a flat, domain-keyed catalog mirroring `tokensMeta` (and
 * the scss `scssMeta`). Token domains use the tokens vocabulary; `typography` holds the prose
 * shorthands, `gradient` / `grid` / `skeleton` are the remaining `@utility` groups. A leaf's kind is
 * recovered via `kindOf`. CSS-only plumbing (resets, defaults, layers, keyframes, deprecated
 * aliases) lives in `css/index.ts`, which assembles the stylesheet from these same object
 * references — so docs and generated CSS can never diverge. Key order is chosen so the skill's
 * `token` and `utility` views keep their documentation order (token domains first, then utilities).
 */
export const tailwindMeta = {
  color,
  font,
  spacing,
  border,
  blur,
  shadow,
  breakpoint,
  motion,
  typography: {
    heading: headingUtilities,
    text: textUtilities,
    display: displayUtilities,
  },
  gradient: gradientUtilities,
  grid: gridUtilities,
  skeleton: skeletonUtilities,
} satisfies TailwindMeta;
