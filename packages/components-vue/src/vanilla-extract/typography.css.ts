import {
  displayLargeStyle,
  displayMediumStyle,
  displaySmallStyle,
  gridGap,
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
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

// Wrapper
export const Wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
});

// Typography
export const typographyBaseStyle = {
  color: themeLightPrimary,
  margin: 0,
} as const;

export const Heading = style({
  ...typographyBaseStyle,
  ...headingMediumStyle,
});

// Display
export const DisplayLargeStyle = style({
  ...typographyBaseStyle,
  ...displayLargeStyle,
});

export const DisplayMediumStyle = style({
  ...typographyBaseStyle,
  ...displayMediumStyle,
});

export const DisplaySmallStyle = style({
  ...typographyBaseStyle,
  ...displaySmallStyle,
});

// Heading
export const HeadingXXLargeStyle = style({
  ...typographyBaseStyle,
  ...headingXXLargeStyle,
});

export const HeadingXLargeStyle = style({
  ...typographyBaseStyle,
  ...headingXLargeStyle,
});

export const HeadingLargeStyle = style({
  ...typographyBaseStyle,
  ...headingLargeStyle,
});

export const HeadingMediumStyle = style({
  ...typographyBaseStyle,
  ...headingMediumStyle,
});

export const HeadingSmallStyle = style({
  ...typographyBaseStyle,
  ...headingSmallStyle,
});

// Text
export const TextXLargeStyle = style({
  ...typographyBaseStyle,
  ...textXLargeStyle,
});

export const TextLargeStyle = style({
  ...typographyBaseStyle,
  ...textLargeStyle,
});

export const TextMediumStyle = style({
  ...typographyBaseStyle,
  ...textMediumStyle,
});

export const TextSmallStyle = style({
  ...typographyBaseStyle,
  ...textSmallStyle,
});

export const TextXSmallStyle = style({
  ...typographyBaseStyle,
  ...textXSmallStyle,
});

export const TextXXSmallStyle = style({
  ...typographyBaseStyle,
  ...textXXSmallStyle,
});
