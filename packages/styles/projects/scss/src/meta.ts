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

// Reshape the per-partial variable groups (`theme/grid`) and the layout mixin (`utilities/grid`) into
// the area-grouped tree shared with emotion / tailwind. The same leaf references are reused, so the
// generated `_grid-*.scss` partials (built from the raw groups in `scss/index.ts`) stay untouched.
// scss has no per-area placement utility (`column`), so areas only expose line tokens, spans and
// offsets; only the `full` area has a composed `offset` variable (`$pds-grid-full-offset`).
const [gridGap] = gridVariables.gap;
const [gridNarrowStart, gridNarrowEnd, gridNarrowSpanOneHalf] = gridVariables.narrow;
const [gridNarrowOffsetBase, gridNarrowOffsetS, gridNarrowOffsetXXL] = gridVariables.narrowOffset;
const [gridBasicStart, gridBasicEnd, gridBasicSpanOneHalf, gridBasicSpanOneThird, gridBasicSpanTwoThirds] =
  gridVariables.basic;
const [gridBasicOffsetBase, gridBasicOffsetS, gridBasicOffsetXXL] = gridVariables.basicOffset;
const [gridExtendedStart, gridExtendedEnd, gridExtendedSpanOneHalf] = gridVariables.extended;
const [gridExtendedOffsetBase, gridExtendedOffsetS, gridExtendedOffsetXXL] = gridVariables.extendedOffset;
const [gridWideStart, gridWideEnd] = gridVariables.wide;
const [gridWideOffsetBase, gridWideOffsetS, gridWideOffsetXXL] = gridVariables.wideOffset;
const [gridFullStart, gridFullEnd] = gridVariables.full;
const [gridFullOffset] = gridVariables.fullOffset;
const [gridMixin] = gridMixins;

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
    gap: gridGap,
    narrow: {
      start: gridNarrowStart,
      end: gridNarrowEnd,
      span: { oneHalf: gridNarrowSpanOneHalf },
      offsetBase: gridNarrowOffsetBase,
      offsetS: gridNarrowOffsetS,
      offsetXXL: gridNarrowOffsetXXL,
    },
    basic: {
      start: gridBasicStart,
      end: gridBasicEnd,
      span: { oneHalf: gridBasicSpanOneHalf, oneThird: gridBasicSpanOneThird, twoThirds: gridBasicSpanTwoThirds },
      offsetBase: gridBasicOffsetBase,
      offsetS: gridBasicOffsetS,
      offsetXXL: gridBasicOffsetXXL,
    },
    extended: {
      start: gridExtendedStart,
      end: gridExtendedEnd,
      span: { oneHalf: gridExtendedSpanOneHalf },
      offsetBase: gridExtendedOffsetBase,
      offsetS: gridExtendedOffsetS,
      offsetXXL: gridExtendedOffsetXXL,
    },
    wide: {
      start: gridWideStart,
      end: gridWideEnd,
      offsetBase: gridWideOffsetBase,
      offsetS: gridWideOffsetS,
      offsetXXL: gridWideOffsetXXL,
    },
    full: {
      start: gridFullStart,
      end: gridFullEnd,
      offset: gridFullOffset,
    },
  },
} satisfies ScssMeta;
