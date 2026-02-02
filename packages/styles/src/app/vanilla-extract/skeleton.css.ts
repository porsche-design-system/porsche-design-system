import {
  getSkeletonStyle,
  proseTextSmStyle,
  skeletonKeyframes,
  spacingFluidSm,
  spacingStaticMd,
} from '@porsche-design-system/vanilla-extract';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css.ts';

const skeletonAnimation = keyframes(skeletonKeyframes);

export const vanillaExtractSkeletonWrapper = style({
  display: 'grid',
  gap: spacingFluidSm,
  padding: spacingStaticMd,
  ...proseTextSmStyle,
  color: vars.primary,
});

export const vanillaExtractSkeletonItem = styleVariants({
  light: {
    padding: spacingFluidSm,
    ...getSkeletonStyle(skeletonAnimation, { theme: 'light' }),
  },
  dark: {
    padding: spacingFluidSm,
    ...getSkeletonStyle(skeletonAnimation, { theme: 'dark' }),
  },
  auto: {
    padding: spacingFluidSm,
    ...getSkeletonStyle(skeletonAnimation, { theme: 'auto' }),
  },
});
