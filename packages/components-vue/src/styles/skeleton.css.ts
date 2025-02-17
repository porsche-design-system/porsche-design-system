import {
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  getSkeletonStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  themeDarkBackgroundBase,
  themeDarkPrimary,
  themeLightBackgroundBase,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/styles/vanilla-extract';
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

export const SkeletonLight = style(getSkeletonStyle({ theme: 'light' }));
export const SkeletonDark = style(getSkeletonStyle({ theme: 'dark' }));

export const boxStyles = style({
  height: '200px',
  width: '500px',
});

export const textStyles = style({
  height: fontLineHeight,
  width: '100px',
});

export const SkeletonTextSmallLight = style({ fontSize: fontSizeTextSmall });
export const SkeletonTextMediumLight = style({ fontSize: fontSizeTextMedium });
export const SkeletonTextLargeLight = style({ fontSize: fontSizeTextLarge });

export const SkeletonTextSmallDark = style({ fontSize: fontSizeTextSmall });
export const SkeletonTextMediumDark = style({ fontSize: fontSizeTextMedium });
export const SkeletonTextLargeDark = style({ fontSize: fontSizeTextLarge });
