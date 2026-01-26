import {
  borderRadiusLarge,
  dropShadowHighStyle,
  dropShadowLowStyle,
  dropShadowMediumStyle,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractShadowWrapper = style({
  display: 'grid',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
  ...textSmallStyle,
  color: vars.primary,
});

export const vanillaExtractShadowLow = style({
  ...dropShadowLowStyle,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

export const vanillaExtractShadowMedium = style({
  ...dropShadowMediumStyle,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

export const vanillaExtractShadowHigh = style({
  ...dropShadowHighStyle,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});
