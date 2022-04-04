import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';

export const textMedium = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 1.5rem/1.5 ${fontFamily}`,
  ...fontBehavior,
};
