import {
  gridGap,
  headingMediumStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXLarge,
  spacingFluidXSmall,
  spacingFluidXXLarge,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXSmall,
  spacingStaticXXLarge,
  textXSmallStyle,
  themeLightContrastLow,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
});

export const Heading = style({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

const getTileStyle = {
  ...textXSmallStyle,
  background: themeLightContrastLow,
} as const;

export const SpacingFluidXSmall = style({
  ...getTileStyle,
  width: spacingFluidXSmall,
  height: spacingFluidXSmall,
});

export const SpacingFluidSmall = style({
  ...getTileStyle,
  width: spacingFluidSmall,
  height: spacingFluidSmall,
});

export const SpacingFluidMedium = style({
  ...getTileStyle,
  width: spacingFluidMedium,
  height: spacingFluidMedium,
});

export const SpacingFluidLarge = style({
  ...getTileStyle,
  width: spacingFluidLarge,
  height: spacingFluidLarge,
});

export const SpacingFluidXLarge = style({
  ...getTileStyle,
  width: spacingFluidXLarge,
  height: spacingFluidXLarge,
});

export const SpacingFluidXXLarge = style({
  ...getTileStyle,
  width: spacingFluidXXLarge,
  height: spacingFluidXXLarge,
});

export const SpacingStaticXSmall = style({
  ...getTileStyle,
  width: spacingStaticXSmall,
  height: spacingStaticXSmall,
});

export const SpacingStaticSmall = style({
  ...getTileStyle,
  width: spacingStaticSmall,
  height: spacingStaticSmall,
});

export const SpacingStaticMedium = style({
  ...getTileStyle,
  width: spacingStaticMedium,
  height: spacingStaticMedium,
});

export const SpacingStaticLarge = style({
  ...getTileStyle,
  width: spacingStaticLarge,
  height: spacingStaticLarge,
});

export const SpacingStaticXLarge = style({
  ...getTileStyle,
  width: spacingStaticXLarge,
  height: spacingStaticXLarge,
});

export const SpacingStaticXXLarge = style({
  ...getTileStyle,
  width: spacingStaticXXLarge,
  height: spacingStaticXXLarge,
});
