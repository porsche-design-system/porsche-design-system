import {
  fontBehavior,
  fontFamily,
  fontHyphenation,
  fontLineHeight,
  fontStyle,
  fontVariant,
  fontWeight,
} from '../../font';

export const textXSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 0.75rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  ...fontHyphenation,
};
