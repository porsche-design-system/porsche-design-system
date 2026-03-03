import { shadowLg } from '@porsche-design-system/emotion';
import {
  proseTextSmStyle,
  radiusLg,
  shadowMd,
  shadowSm,
  spacingFluidMd,
  spacingFluidSm,
  spacingStaticMd,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractShadowWrapper = style({
  display: 'grid',
  gap: spacingFluidMd,
  padding: spacingStaticMd,
  ...proseTextSmStyle,
  color: vars.primary,
});

export const vanillaExtractShadowSmall = style({
  boxShadow: shadowSm,
  borderRadius: radiusLg,
  padding: spacingFluidSm,
});

export const vanillaExtractShadowMedium = style({
  boxShadow: shadowMd,
  borderRadius: radiusLg,
  padding: spacingFluidSm,
});

export const vanillaExtractShadowLarge = style({
  boxShadow: shadowLg,
  borderRadius: radiusLg,
  padding: spacingFluidSm,
});
