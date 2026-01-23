import {
  borderRadiusLarge,
  frostedGlassStyle,
  spacingFluidLarge,
  spacingFluidSmall,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractBlurWrapper = style({
  display: 'grid',
  ...textSmallStyle,
});

export const vanillaExtractBlurImage = style({
  gridColumn: 1,
  gridRow: 1,
  width: '100%',
  height: '600px',
  objectFit: 'cover',
});

export const vanillaExtractBackdropBlurFrosted = style({
  ...frostedGlassStyle,
  backgroundColor: vars.frosted,
  borderRadius: borderRadiusLarge,
  margin: spacingFluidLarge,
  padding: spacingFluidSmall,
  display: 'grid',
  gridRow: 1,
  gridColumn: 1,
  placeItems: 'center',
});

export const vanillaExtractBlurP = style({
  color: 'white',
});
