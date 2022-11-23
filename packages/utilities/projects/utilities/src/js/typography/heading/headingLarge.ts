import { fontBehavior, fontFamily, fontLineHeight, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 1.5rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.875rem',
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.25rem',
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2.625rem',
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3rem',
  },
};
