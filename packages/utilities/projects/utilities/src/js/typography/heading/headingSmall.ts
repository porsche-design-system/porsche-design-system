import { fontBehavior, fontFamily, fontLineHeight, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 1rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.125rem',
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.25rem',
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '1.375rem',
  },
  [mediaQueryMin('xl')]: {
    fontSize: '1.5rem',
  },
};
