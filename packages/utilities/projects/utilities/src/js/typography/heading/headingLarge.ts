import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 1.5rem/1.5 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.875rem',
    lineHeight: 1.3333333333,
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333,
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2.625rem',
    lineHeight: 1.2380952381,
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3rem',
    lineHeight: 1.25,
  },
};
