import { fontBehavior, fontFamily, fontLineHeight, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingXXLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 2rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '2.625rem',
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '3.25rem',
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '3.875rem',
  },
  [mediaQueryMin('xl')]: {
    fontSize: '4.5rem',
  },
};
