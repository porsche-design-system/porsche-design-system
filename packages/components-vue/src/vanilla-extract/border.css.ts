import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  textXSmallStyle,
  themeDarkBackgroundBase,
  themeDarkPrimary,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
});

export const Heading = style({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

const tileBaseStyle = {
  ...textSmallStyle,
  color: themeDarkPrimary,
  background: themeDarkBackgroundBase,
  padding: spacingFluidMedium,
};

export const BorderRadiusSmall = style({
  ...tileBaseStyle,
  borderRadius: borderRadiusSmall,
});

export const BorderRadiusMedium = style({
  ...tileBaseStyle,
  borderRadius: borderRadiusMedium,
});

export const BorderRadiusLarge = style({
  ...tileBaseStyle,
  borderRadius: borderRadiusLarge,
});

export const BorderWidthBase = style({
  width: '100%',
  borderBottom: `${borderWidthBase} solid ${themeLightPrimary}`,
  selectors: {
    '&::before': {
      ...textXSmallStyle,
      content: '"Base"',
      color: themeLightPrimary,
    },
  },
});

export const BorderWidthThin = style({
  width: '100%',
  borderBottom: `${borderWidthThin} solid ${themeLightPrimary}`,
  selectors: {
    '&::before': {
      ...textXSmallStyle,
      content: '"Thin"',
      color: themeLightPrimary,
    },
  },
});
