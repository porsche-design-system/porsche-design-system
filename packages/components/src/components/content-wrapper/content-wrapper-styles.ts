import type { Theme } from '../../types';
import type { ContentWrapperBackgroundColor, ContentWrapperWidth } from './content-wrapper-utils';
import { getCss } from '../../utils';
import { getThemedColors } from '../../styles';
import { getContentWrapperStyle } from './content-wrapper-styles-shared';

export const getComponentCss = (
  width: ContentWrapperWidth,
  backgroundColor: ContentWrapperBackgroundColor,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
      },
    },
    root: {
      ...getContentWrapperStyle(width),
      backgroundColor: backgroundColor === 'default' ? getThemedColors(theme).backgroundColor : 'transparent',
    },
  });
};
