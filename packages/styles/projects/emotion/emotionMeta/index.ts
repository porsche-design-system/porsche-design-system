import { blurMeta } from './blur.meta';
import { borderMeta } from './border.meta';
import { breakpointMeta } from './breakpoint.meta';
import { colorMeta } from './color.meta';
import { focusMeta } from './focus.meta';
import { fontMeta } from './font.meta';
import { gradientMeta } from './gradient.meta';
import { gridMeta } from './grid.meta';
import { mediaQueryMeta } from './mediaQuery.meta';
import { motionMeta } from './motion.meta';
import { shadowMeta } from './shadow.meta';
import { skeletonMeta } from './skeleton.meta';
import { spacingMeta } from './spacing.meta';
import { typographyMeta } from './typography.meta';

export type { EmotionMeta, EmotionMetaEntry } from './meta.types';

export const emotionMeta = {
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

export * from './blur.meta';
export * from './border.meta';
export * from './breakpoint.meta';
export * from './color.meta';
export * from './focus.meta';
export * from './font.meta';
export * from './gradient.meta';
export * from './grid.meta';
export * from './mediaQuery.meta';
export * from './motion.meta';
export * from './shadow.meta';
export * from './skeleton.meta';
export * from './spacing.meta';
export * from './typography.meta';
