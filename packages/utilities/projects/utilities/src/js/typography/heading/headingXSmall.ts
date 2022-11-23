import { fontBehavior, fontFamily, fontLineHeight, fontStyle, fontVariant, fontWeight } from '../../font';

export const headingXSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 1rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
};
