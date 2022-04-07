import { fontBehavior, fontFamily, fontHyphenation, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 1rem/1.5 ${fontFamily}`,
  ...fontBehavior,
  ...fontHyphenation,
};
