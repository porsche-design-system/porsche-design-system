import { fontBehavior, fontFamily, fontLineHeight, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingXLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 1.75rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '2.25rem',
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.75rem',
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '3.25rem',
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3.75rem',
  },
};
