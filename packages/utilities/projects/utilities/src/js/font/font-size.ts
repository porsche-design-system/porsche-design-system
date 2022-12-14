import type { FontSize, FontSizeLineHeight } from './font-shared';
import { fontLineHeight } from './font-line-height';

export const fontSize: { [key in FontSize]: FontSizeLineHeight } = {
  xSmall: {
    fontSize: '0.75rem',
    lineHeight: fontLineHeight,
  },
  small: {
    fontSize: '1rem',
    lineHeight: fontLineHeight,
  },
  medium: {
    fontSize: '1.5rem',
    lineHeight: fontLineHeight,
  },
  large: {
    fontSize: '2.25rem',
    lineHeight: fontLineHeight,
  },
  xLarge: {
    fontSize: '3.25rem',
    lineHeight: fontLineHeight,
  },
};
