import { fontFamily, fontHyphenation, fontLineHeight, fontSize, fontStyle, fontVariant, fontWeight } from '../../font';

export const textXSmall = {
  font: `${fontStyle.normal} ${fontVariant} ${fontWeight.regular} ${fontSize.fluid.textXSmall}/${fontLineHeight} ${fontFamily}`,
  ...fontHyphenation,
};
