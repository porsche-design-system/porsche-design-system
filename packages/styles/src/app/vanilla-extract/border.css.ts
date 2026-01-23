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

export const VanillaExtractBorderWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
});

export const VanillaExtractBorderSection = style({
  display: 'grid',
  gap: spacingFluidMedium,
  ...textSmallStyle,
  color: vars.primary,
});

export const VanillaExtractBorderRadiusSmall = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusSmall,
  padding: spacingFluidSmall,
});

export const VanillaExtractBorderRadiusMedium = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusMedium,
  padding: spacingFluidSmall,
});

export const VanillaExtractBorderRadiusLarge = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

export const VanillaExtractBorderWidthThin = style({
  borderWidth: borderWidthThin,
  borderStyle: 'solid',
  padding: spacingFluidSmall,
});

export const VanillaExtractBorderWidthRegular = style({
  borderWidth: borderWidthBase,
  borderStyle: 'solid',
  padding: spacingFluidSmall,
});
