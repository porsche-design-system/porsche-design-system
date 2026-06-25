import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { font } from './theme/font';
import { gradient } from './theme/gradient';
import { grid } from './theme/grid';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { spacing } from './theme/spacing';
import type { VanillaExtractMeta } from './types';
import { focus } from './utilities/focus';
import { mediaQuery } from './utilities/media-query';
import { skeleton } from './utilities/skeleton';
import { typography } from './utilities/typography';

/**
 * The documented single source of truth: a flat, domain-keyed catalog mirroring `scssMeta`'s
 * skeleton. A leaf's kind is recovered via `kindOf`. The catalog is deprecation-free; deprecated
 * symbols remain public but undocumented. Domain key order matches `scssMeta`.
 */
export const vanillaExtractMeta = {
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
  grid,
} satisfies VanillaExtractMeta;
