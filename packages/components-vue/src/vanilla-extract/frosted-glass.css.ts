import {
  borderRadiusLarge,
  frostedGlassStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkPrimary,
  themeLightStateHover,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  padding: spacingFluidMedium,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

export const FrostedGlass = style({
  ...textSmallStyle,
  ...frostedGlassStyle,
  color: themeDarkPrimary,
  background: themeLightStateHover,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});
