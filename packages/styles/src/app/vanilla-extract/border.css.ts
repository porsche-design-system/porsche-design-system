import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractBorderWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
});

export const vanillaExtractBorderSection = style({
  display: 'grid',
  gap: spacingFluidMedium,
  ...textSmallStyle,
  color: vars.primary,
});

export const vanillaExtractBorderRadiusSmall = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusSmall,
  padding: spacingFluidSmall,
});

export const vanillaExtractBorderRadiusMedium = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusMedium,
  padding: spacingFluidSmall,
});

export const vanillaExtractBorderRadiusLarge = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

export const vanillaExtractBorderWidthThin = style({
  borderWidth: borderWidthThin,
  borderStyle: 'solid',
  padding: spacingFluidSmall,
});

export const vanillaExtractBorderWidthRegular = style({
  borderWidth: borderWidthBase,
  borderStyle: 'solid',
  padding: spacingFluidSmall,
});
