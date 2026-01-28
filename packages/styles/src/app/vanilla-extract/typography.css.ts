import {
  displayLargeStyle,
  displayMediumStyle,
  displaySmallStyle,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXLargeStyle,
  headingXXLargeStyle,
  spacingFluidMedium,
  textLargeStyle,
  textMediumStyle,
  textSmallStyle,
  textXLargeStyle,
  textXSmallStyle,
  textXXSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractTypographyWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacingFluidMedium,
  padding: spacingFluidMedium,
  color: vars.primary,
});

export const displayLarge = style({
  ...displayLargeStyle,
  margin: 0,
});

export const displayMedium = style({
  ...displayMediumStyle,
  margin: 0,
});

export const displaySmall = style({
  ...displaySmallStyle,
  margin: 0,
});

export const headingXXLarge = style({
  ...headingXXLargeStyle,
  margin: 0,
});

export const headingXLarge = style({
  ...headingXLargeStyle,
  margin: 0,
});

export const headingLarge = style({
  ...headingLargeStyle,
  margin: 0,
});

export const headingMedium = style({
  ...headingMediumStyle,
  margin: 0,
});

export const headingSmall = style({
  ...headingSmallStyle,
  margin: 0,
});

export const textXLarge = style({
  ...textXLargeStyle,
  margin: 0,
});

export const textLarge = style({
  ...textLargeStyle,
  margin: 0,
});

export const textMedium = style({
  ...textMediumStyle,
  margin: 0,
});

export const textSmall = style({
  ...textSmallStyle,
  margin: 0,
});

export const textXSmall = style({
  ...textXSmallStyle,
  margin: 0,
});

export const textXXSmall = style({
  ...textXXSmallStyle,
  margin: 0,
});
