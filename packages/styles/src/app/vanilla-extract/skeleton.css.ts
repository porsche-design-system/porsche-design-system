import {
  getSkeletonStyle,
  skeletonKeyframes,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { globalStyle, keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css.ts';

const skeletonAnimation = keyframes(skeletonKeyframes);

export const vanillaExtractSkeletonWrapper = style({
  display: 'grid',
  gap: spacingFluidSmall,
  padding: spacingStaticMedium,
  ...textSmallStyle,
  color: vars.primary,
});

export const vanillaExtractSkeletonItem = styleVariants({
  light: {
    padding: spacingFluidSmall,
    ...getSkeletonStyle(skeletonAnimation, { theme: 'light' }),
  },
  dark: {
    padding: spacingFluidSmall,
    ...getSkeletonStyle(skeletonAnimation, { theme: 'dark' }),
  },
  auto: {
    padding: spacingFluidSmall,
    ...getSkeletonStyle(skeletonAnimation, { theme: 'light' }),
  },
});

globalStyle(`.${vanillaExtractSkeletonItem.auto}`, {
  '@media': {
    '(prefers-color-scheme: dark)': {
      ...getSkeletonStyle(skeletonAnimation, { theme: 'dark' }),
    },
  },
});
