import {
  gradientStopsFadeDark,
  proseTextSmStyle,
  radiusLg,
  spacingFluidMd,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const vanillaExtractGradientWrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: spacingFluidMd,
  padding: spacingFluidMd,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

export const vanillaExtractGradientItemTop = style({
  backgroundImage: `linear-gradient(to top, ${gradientStopsFadeDark})`,
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
});

export const vanillaExtractGradientItemBottom = style({
  backgroundImage: `linear-gradient(to bottom, ${gradientStopsFadeDark})`,
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
});

export const vanillaExtractGradientItemLeft = style({
  backgroundImage: `linear-gradient(to left, ${gradientStopsFadeDark})`,
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
});

export const vanillaExtractGradientItemRight = style({
  backgroundImage: `linear-gradient(to right, ${gradientStopsFadeDark})`,
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
});
