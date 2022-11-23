import {
  fontBehavior,
  fontFamily,
  fontHyphenation,
  fontLineHeight,
  fontStyle,
  fontVariant,
  fontWeight,
} from '../../font';

export const textXLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 3.25rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  ...fontHyphenation,
};
