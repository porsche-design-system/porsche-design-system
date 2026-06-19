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
import type { ScssMeta } from './types';
import { focus } from './utilities/focus';
import { grid as gridMixins } from './utilities/grid';
import { mediaQuery } from './utilities/media-query';
import { skeleton } from './utilities/skeleton';
import { typography } from './utilities/typography';

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
  grid: [...gridVariables, ...gridMixins],
} satisfies ScssMeta;
