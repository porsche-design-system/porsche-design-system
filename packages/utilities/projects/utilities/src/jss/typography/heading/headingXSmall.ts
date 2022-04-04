import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';

export const headingXSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1rem/1.5 ${fontFamily}`,
  ...fontBehavior,
};
