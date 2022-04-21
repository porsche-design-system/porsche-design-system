import type { FontSize, FontSizeLineHeight } from './font-shared';

export const fontSize: { [key in FontSize]: FontSizeLineHeight } = {
  xSmall: {
    fontSize: '0.75rem',
    lineHeight: 1.6666666667,
  },
  small: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  medium: {
    fontSize: '1.5rem',
    lineHeight: 1.5,
  },
  large: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333,
  },
  xLarge: {
    fontSize: '3.25rem',
    lineHeight: 1.2307692308,
  },
};
