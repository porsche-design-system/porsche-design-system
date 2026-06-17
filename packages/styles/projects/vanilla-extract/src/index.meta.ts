import { blurMeta } from './blur/meta/blur.meta';
import { borderMeta } from './border/meta/border.meta';
import { colorMeta } from './color/meta/color.meta';
import { focusMeta } from './focus/meta/focus.meta';
import { fontMeta } from './font/meta/font.meta';
import { gradientMeta } from './gradient/meta/gradient.meta';
import { gridMeta } from './grid/meta/grid.meta';
import { breakpointMeta } from './mediaQuery/meta/breakpoint.meta';
import { mediaQueryMeta } from './mediaQuery/meta/mediaQuery.meta';
import { motionMeta } from './motion/meta/motion.meta';
import { shadowMeta } from './shadow/meta/shadow.meta';
import { skeletonMeta } from './skeleton/meta/skeleton.meta';
import { spacingMeta } from './spacing/meta/spacing.meta';
import { typographyMeta } from './typography/meta/typography.meta';

export type { VanillaExtractMeta, VanillaExtractMetaEntry } from './meta.types';

export const vanillaExtractMeta = {
  blur: blurMeta,
  border: borderMeta,
  color: colorMeta,
  focus: focusMeta,
  font: fontMeta,
  gradient: gradientMeta,
  grid: gridMeta,
  breakpoint: breakpointMeta,
  mediaQuery: mediaQueryMeta,
  motion: motionMeta,
  shadow: shadowMeta,
  skeleton: skeletonMeta,
  spacing: spacingMeta,
  typography: typographyMeta,
};

export * from './blur/meta/blur.meta';
export * from './border/meta/border.meta';
export * from './color/meta/color.meta';
export * from './focus/meta/focus.meta';
export * from './font/meta/font.meta';
export * from './gradient/meta/gradient.meta';
export * from './grid/meta/grid.meta';
export * from './mediaQuery/meta/breakpoint.meta';
export * from './mediaQuery/meta/mediaQuery.meta';
export * from './motion/meta/motion.meta';
export * from './shadow/meta/shadow.meta';
export * from './skeleton/meta/skeleton.meta';
export * from './spacing/meta/spacing.meta';
export * from './typography/meta/typography.meta';
