import {
  proseTextSmStyle,
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
  spacingFluidMd,
  spacingStaticMd,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractBorderWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacingFluidMd,
  padding: spacingStaticMd,
});

export const vanillaExtractBorderSection = style({
  display: 'grid',
  gap: spacingFluidMd,
  ...proseTextSmStyle,
  color: vars.primary,
});

export const vanillaExtractRadiusXs = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusXs,
  padding: spacingFluidMd,
});

export const vanillaExtractRadiusSm = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusSm,
  padding: spacingFluidMd,
});

export const vanillaExtractRadiusMd = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusMd,
  padding: spacingFluidMd,
});

export const vanillaExtractRadiusLg = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
});

export const vanillaExtractRadiusXl = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusXl,
  padding: spacingFluidMd,
});

export const vanillaExtractRadius2Xl = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radius2Xl,
  padding: spacingFluidMd,
});

export const vanillaExtractRadius3Xl = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radius3Xl,
  padding: spacingFluidMd,
});

export const vanillaExtractRadius4Xl = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radius4Xl,
  padding: spacingFluidMd,
});

export const vanillaExtractRadiusFull = style({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusFull,
  padding: spacingFluidMd,
});
