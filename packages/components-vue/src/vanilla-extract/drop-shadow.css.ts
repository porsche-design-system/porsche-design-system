import {
  borderRadiusLarge,
  dropShadowHighStyle,
  dropShadowLowStyle,
  dropShadowMediumStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeLightBackgroundSurface,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
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

const tileBaseStyle = {
  ...textSmallStyle,
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  padding: spacingFluidMedium,
  borderRadius: borderRadiusLarge,
};

export const DropShadowLow = style({
  ...tileBaseStyle,
  ...dropShadowLowStyle,
});

export const DropShadowMedium = style({
  ...tileBaseStyle,
  ...dropShadowMediumStyle,
});

export const DropShadowHigh = style({
  ...tileBaseStyle,
  ...dropShadowHighStyle,
});
