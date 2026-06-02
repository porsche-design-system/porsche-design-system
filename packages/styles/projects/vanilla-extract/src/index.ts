import { blurMeta, deprecatedBlurMeta } from './blur/blur.meta';
import { borderMeta, deprecatedBorderMeta } from './border/border.meta';
import { colorMeta, deprecatedColorMeta } from './color/color.meta';
import { deprecatedFocusMeta, focusMeta } from './focus/focus.meta';
import { deprecatedFontMeta, fontMeta } from './font/font.meta';
import { deprecatedGradientMeta, gradientMeta } from './gradient/gradient.meta';
import { gridMeta } from './grid/grid.meta';
import { mediaQueryMeta } from './mediaQuery/mediaQuery.meta';
import { deprecatedMotionMeta, motionMeta } from './motion/motion.meta';
import { deprecatedShadowMeta, shadowMeta } from './shadow/shadow.meta';
import { skeletonMeta } from './skeleton/skeleton.meta';
import { deprecatedSpacingMeta, spacingMeta } from './spacing/spacing.meta';
import { deprecatedTypographyMeta, typographyMeta } from './typography/typography.meta';

export * from './blur';
export * from './border';
export * from './color';
export * from './focus';
export * from './font';
export * from './gradient';
export * from './grid';
export * from './mediaQuery';
export * from './motion';
export * from './shadow';
export * from './skeleton';
export * from './spacing';
export * from './typography';

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
  deprecated: {
    blur: deprecatedBlurMeta,
    border: deprecatedBorderMeta,
    color: deprecatedColorMeta,
    focus: deprecatedFocusMeta,
    font: deprecatedFontMeta,
    gradient: deprecatedGradientMeta,
    motion: deprecatedMotionMeta,
    shadow: deprecatedShadowMeta,
    spacing: deprecatedSpacingMeta,
    typography: deprecatedTypographyMeta,
  },
};
