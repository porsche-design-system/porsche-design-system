import {
  fontBehavior,
  fontFamily,
  fontHyphenation,
  fontLineHeight,
  fontStyle,
  fontVariant,
  fontWeight,
} from '../../font';

export const textSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 1rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  ...fontHyphenation,
};
