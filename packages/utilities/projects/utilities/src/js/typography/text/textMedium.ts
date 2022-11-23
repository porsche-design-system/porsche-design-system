import {
  fontBehavior,
  fontFamily,
  fontHyphenation,
  fontLineHeight,
  fontStyle,
  fontVariant,
  fontWeight,
} from '../../font';

export const textMedium = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 1.5rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  ...fontHyphenation,
};
