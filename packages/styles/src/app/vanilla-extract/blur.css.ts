import {
  blurFrosted,
  proseTextSmStyle,
  radiusLg,
  spacingFluidLg,
  spacingFluidSm,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractBlurWrapper = style({
  display: 'grid',
  ...proseTextSmStyle,
});

export const vanillaExtractBlurImage = style({
  gridColumn: 1,
  gridRow: 1,
  width: '100%',
  height: '600px',
  objectFit: 'cover',
});

export const vanillaExtractBackdropBlurFrosted = style({
  backdropFilter: blurFrosted,
  backgroundColor: vars.frosted,
  borderRadius: radiusLg,
  margin: spacingFluidLg,
  padding: spacingFluidSm,
  display: 'grid',
  gridRow: 1,
  gridColumn: 1,
  placeItems: 'center',
});

export const vanillaExtractBlurP = style({
  color: 'white',
});
