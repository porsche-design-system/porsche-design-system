import {
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXLarge,
  spacingFluidXSmall,
  spacingFluidXXLarge,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXSmall,
  spacingStaticXXLarge,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractSpacingWrapper = style({
  display: 'grid',
  gap: spacingFluidMedium,
  ...textSmallStyle,
  color: vars.primary,
  padding: spacingStaticMedium,
});

export const vanillaExtractSpacingRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacingStaticMedium,
});

const getFluidBoxStyle = {
  backgroundColor: vars.info,
} as const;

const getStaticBoxStyle = {
  backgroundColor: vars.error,
} as const;

export const vanillaExtractSpacingFluidXSmall = style({
  ...getFluidBoxStyle,
  width: spacingFluidXSmall,
  height: spacingFluidXSmall,
});

export const vanillaExtractSpacingFluidSmall = style({
  ...getFluidBoxStyle,
  width: spacingFluidSmall,
  height: spacingFluidSmall,
});

export const vanillaExtractSpacingFluidMedium = style({
  ...getFluidBoxStyle,
  width: spacingFluidMedium,
  height: spacingFluidMedium,
});

export const vanillaExtractSpacingFluidLarge = style({
  ...getFluidBoxStyle,
  width: spacingFluidLarge,
  height: spacingFluidLarge,
});

export const vanillaExtractSpacingFluidXLarge = style({
  ...getFluidBoxStyle,
  width: spacingFluidXLarge,
  height: spacingFluidXLarge,
});

export const vanillaExtractSpacingFluidXXLarge = style({
  ...getFluidBoxStyle,
  width: spacingFluidXXLarge,
  height: spacingFluidXXLarge,
});

export const vanillaExtractSpacingStaticXSmall = style({
  ...getStaticBoxStyle,
  width: spacingStaticXSmall,
  height: spacingStaticXSmall,
});

export const vanillaExtractSpacingStaticSmall = style({
  ...getStaticBoxStyle,
  width: spacingStaticSmall,
  height: spacingStaticSmall,
});

export const vanillaExtractSpacingStaticMedium = style({
  ...getStaticBoxStyle,
  width: spacingStaticMedium,
  height: spacingStaticMedium,
});

export const vanillaExtractSpacingStaticLarge = style({
  ...getStaticBoxStyle,
  width: spacingStaticLarge,
  height: spacingStaticLarge,
});

export const vanillaExtractSpacingStaticXLarge = style({
  ...getStaticBoxStyle,
  width: spacingStaticXLarge,
  height: spacingStaticXLarge,
});

export const vanillaExtractSpacingStaticXXLarge = style({
  ...getStaticBoxStyle,
  width: spacingStaticXXLarge,
  height: spacingStaticXXLarge,
});
