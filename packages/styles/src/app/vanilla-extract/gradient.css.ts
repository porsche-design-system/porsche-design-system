import {
  borderRadiusLarge,
  gradientToBottomStyle,
  gradientToLeftStyle,
  gradientToRightStyle,
  gradientToTopStyle,
  spacingFluidMedium,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const vanillaExtractGradientWrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: spacingFluidMedium,
  padding: spacingFluidMedium,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

export const vanillaExtractGradientItemTop = style({
  ...gradientToTopStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

export const vanillaExtractGradientItemBottom = style({
  ...gradientToBottomStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

export const vanillaExtractGradientItemLeft = style({
  ...gradientToLeftStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

export const vanillaExtractGradientItemRight = style({
  ...gradientToRightStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});
