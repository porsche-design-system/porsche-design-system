import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';

export const textLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 2.25rem/1.3333333333 ${fontFamily}`,
  ...fontBehavior,
};
