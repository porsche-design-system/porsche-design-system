import {
  borderRadiusLarge,
  frostedGlassStyle,
  spacingFluidLarge,
  spacingFluidSmall,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css.ts';

export const VanillaExtractBlurWrapper = style({
  display: 'grid',
  ...textSmallStyle,
});

export const VanillaExtractBlurImage = style({
  gridColumn: 1,
  gridRow: 1,
  width: '100%',
  height: '600px',
  objectFit: 'cover',
});

export const VanillaExtractBackdropBlurFrosted = style({
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

export const VanillaExtractBlurP = style({
  color: 'white',
});
