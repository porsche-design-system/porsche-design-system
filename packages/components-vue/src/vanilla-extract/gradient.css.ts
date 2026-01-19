import {
  borderRadiusLarge,
  gradientToBottomStyle,
  gradientToLeftStyle,
  gradientToRightStyle,
  gradientToTopStyle,
  gridGap,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

export const tileBaseStyle = {
  ...textSmallStyle,
  color: themeDarkPrimary,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
};

export const GradientToTop = style({
  ...tileBaseStyle,
  ...gradientToTopStyle,
});

export const GradientToBottom = style({
  ...tileBaseStyle,
  ...gradientToBottomStyle,
});

export const GradientToLeft = style({
  ...tileBaseStyle,
  ...gradientToLeftStyle,
});

export const GradientToRight = style({
  ...tileBaseStyle,
  ...gradientToRightStyle,
});
