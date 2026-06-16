import { blurMeta } from './blur/blur.meta';
import { borderMeta } from './border/border.meta';
import { colorMeta } from './color/color.meta';
import { focusMeta } from './focus/focus.meta';
import { fontMeta } from './font/font.meta';
import { gradientMeta } from './gradient/gradient.meta';
import { gridMeta } from './grid/grid.meta';
import { mediaQueryMeta } from './mediaQuery/mediaQuery.meta';
import { motionMeta } from './motion/motion.meta';
import { shadowMeta } from './shadow/shadow.meta';
import { skeletonMeta } from './skeleton/skeleton.meta';
import { spacingMeta } from './spacing/spacing.meta';
import { typographyMeta } from './typography/typography.meta';

export type { Meta, MetaEntry } from './meta.types';

export const vanillaExtractMeta = {
  blur: blurMeta,
  border: borderMeta,
  color: colorMeta,
  focus: focusMeta,
  font: fontMeta,
  gradient: gradientMeta,
  grid: gridMeta,
  mediaQuery: mediaQueryMeta,
  motion: motionMeta,
  shadow: shadowMeta,
  skeleton: skeletonMeta,
  spacing: spacingMeta,
  typography: typographyMeta,
};

export * from './blur/blur.meta';
export * from './border/border.meta';
export * from './color/color.meta';
export * from './focus/focus.meta';
export * from './font/font.meta';
export * from './gradient/gradient.meta';
export * from './grid/grid.meta';
export * from './mediaQuery/mediaQuery.meta';
export * from './motion/motion.meta';
export * from './shadow/shadow.meta';
export * from './skeleton/skeleton.meta';
export * from './spacing/spacing.meta';
export * from './typography/typography.meta';
