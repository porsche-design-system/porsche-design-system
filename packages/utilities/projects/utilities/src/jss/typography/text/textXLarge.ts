import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';

export const textXLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 3.25rem/1.2307692308 ${fontFamily}`,
  ...fontBehavior,
};
