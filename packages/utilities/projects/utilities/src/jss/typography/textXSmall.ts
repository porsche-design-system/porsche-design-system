import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textXSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} ${fontSize.xSmall.fontSize}/${fontSize.xSmall.lineHeight} ${fontFamily}`,
  ...fontBehavior,
};
