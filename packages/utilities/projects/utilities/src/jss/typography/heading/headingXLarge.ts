import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingXLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1.75rem/1.4285714286 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333,
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.75rem',
    lineHeight: 1.1818181818,
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '3.25rem',
    lineHeight: 1.2307692308,
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3.75rem',
    lineHeight: 1.2,
  },
};
