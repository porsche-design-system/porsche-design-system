import {
  getFocusStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkBackgroundBase,
  themeDarkPrimary,
  themeLightBackgroundBase,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
});

export const WrapperLight = style({
  background: themeLightBackgroundBase,
  color: themeLightPrimary,
});

export const WrapperDark = style({
  background: themeDarkBackgroundBase,
  color: themeDarkPrimary,
});

export const Heading = style({
  ...headingMediumStyle,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

export const Paragraph = style({
  ...textSmallStyle,
  margin: 0,
  maxWidth: '15rem',
});

export const NativeButton = style({
  ...textSmallStyle,
  ...getFocusStyle(),
});

export const NativeAnchor = style({
  ...textSmallStyle,
  ...getFocusStyle(),
  color: 'inherit',
});
