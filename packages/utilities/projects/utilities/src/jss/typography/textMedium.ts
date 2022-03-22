import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textMedium = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} ${fontSize.medium.fontSize}/${fontSize.medium.lineHeight} ${fontFamily}`,
  ...fontBehavior,
};
