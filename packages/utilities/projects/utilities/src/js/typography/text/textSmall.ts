import { fontFamily, fontHyphenation, fontLineHeight, fontSize, fontStyle, fontVariant, fontWeight } from '../../font';

export const textSmall = {
  font: `${fontStyle.normal} ${fontVariant} ${fontWeight.regular} ${fontSize.fluid.textSmall}/${fontLineHeight} ${fontFamily}`,
  ...fontHyphenation,
};
