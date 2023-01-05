// Fluid Type Scale Calculator (https://fluid-type-scale.com) was used to generate a type scale set based on the "golden ratio".
// "Text/Heading": min - base: 16px, screen: 320px, ratio: 1,2 / max - base: 16px, screen: 1760px, ratio: 1,309
// "Display": min - base: 16px, screen: 320px, ratio: 1,2 / max - base: 16px, screen: 1760px, ratio: 1,5

export const fontSizeTextXSmall = '.875rem';
export const fontSizeTextSmall = '1rem';
export const fontSizeTextMedium = 'clamp(1.2rem, .12vw + 1.18rem, 1.31rem)';
export const fontSizeTextLarge = 'clamp(1.44rem, .3vw + 1.38rem, 1.71rem)';
export const fontSizeTextXLarge = 'clamp(1.73rem, .57vw + 1.61rem, 2.24rem)';

export const fontSizeHeadingSmall = fontSizeTextSmall;
export const fontSizeHeadingMedium = fontSizeTextMedium;
export const fontSizeHeadingLarge = fontSizeTextLarge;
export const fontSizeHeadingXLarge = fontSizeTextXLarge;
export const fontSizeHeadingXXLarge = 'clamp(2.07rem, .96vw + 1.88rem, 2.94rem)';
export const fontSizeHeadingXXXLarge = 'clamp(2.49rem, 1.51vw + 2.19rem, 3.84rem)';

export const fontSizeDisplayMedium = 'clamp(2.07rem, 3.32vw + 1.41rem, 5.06rem)';
export const fontSizeDisplayLarge = 'clamp(2.49rem, 5.67vw + 1.35rem, 7.59rem)';

export const fontSizeText = {
  xSmall: fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  xLarge: fontSizeTextXLarge,
};

export const fontSizeHeading = {
  small: fontSizeHeadingSmall,
  medium: fontSizeHeadingMedium,
  large: fontSizeHeadingLarge,
  xLarge: fontSizeHeadingXLarge,
  xxLarge: fontSizeHeadingXXLarge,
  xxxLarge: fontSizeHeadingXXXLarge,
};

export const fontSizeDisplay = {
  medium: fontSizeDisplayMedium,
  large: fontSizeDisplayLarge,
};

export const fontSize = {
  text: fontSizeText,
  heading: fontSizeHeading,
  display: fontSizeDisplay,
};
