import {
  fontBehavior,
  fontFamily,
  fontHyphenation,
  fontLineHeight,
  fontStyle,
  fontVariant,
  fontWeight,
} from '../../font';

export const textLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 2.25rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  ...fontHyphenation,
};
