import {
  proseTextSmStyle,
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractSpacingWrapper = style({
  display: 'grid',
  gap: spacingFluidMd,
  ...proseTextSmStyle,
  color: vars.primary,
  padding: spacingStaticMd,
});

export const vanillaExtractSpacingRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacingStaticMd,
});

const getFluidBoxStyle = {
  backgroundColor: vars.info,
} as const;

const getStaticBoxStyle = {
  backgroundColor: vars.error,
} as const;

export const vanillaExtractSpacingFluidXs = style({
  ...getFluidBoxStyle,
  width: spacingFluidXs,
  height: spacingFluidXs,
});

export const vanillaExtractSpacingFluidSm = style({
  ...getFluidBoxStyle,
  width: spacingFluidSm,
  height: spacingFluidSm,
});

export const vanillaExtractSpacingFluidMd = style({
  ...getFluidBoxStyle,
  width: spacingFluidMd,
  height: spacingFluidMd,
});

export const vanillaExtractSpacingFluidLg = style({
  ...getFluidBoxStyle,
  width: spacingFluidLg,
  height: spacingFluidLg,
});

export const vanillaExtractSpacingFluidXl = style({
  ...getFluidBoxStyle,
  width: spacingFluidXl,
  height: spacingFluidXl,
});

export const vanillaExtractSpacingFluid2Xl = style({
  ...getFluidBoxStyle,
  width: spacingFluid2Xl,
  height: spacingFluid2Xl,
});

export const vanillaExtractSpacingStaticXs = style({
  ...getStaticBoxStyle,
  width: spacingStaticXs,
  height: spacingStaticXs,
});

export const vanillaExtractSpacingStaticSm = style({
  ...getStaticBoxStyle,
  width: spacingStaticSm,
  height: spacingStaticSm,
});

export const vanillaExtractSpacingStaticMd = style({
  ...getStaticBoxStyle,
  width: spacingStaticMd,
  height: spacingStaticMd,
});

export const vanillaExtractSpacingStaticLg = style({
  ...getStaticBoxStyle,
  width: spacingStaticLg,
  height: spacingStaticLg,
});

export const vanillaExtractSpacingStaticXl = style({
  ...getStaticBoxStyle,
  width: spacingStaticXl,
  height: spacingStaticXl,
});

export const vanillaExtractSpacingStatic2Xl = style({
  ...getStaticBoxStyle,
  width: spacingStatic2Xl,
  height: spacingStatic2Xl,
});
