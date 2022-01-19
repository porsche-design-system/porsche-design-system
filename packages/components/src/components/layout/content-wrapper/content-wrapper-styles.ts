import type { Theme } from '../../../types';
import type { ContentWrapperWidth, ContentWrapperBackgroundColor } from './content-wrapper-utils';
import { getCss, getThemedColors } from '../../../utils';
import { getContentWrapperJssStyle } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  width: ContentWrapperWidth,
  backgroundColor: ContentWrapperBackgroundColor,
  theme: Theme
): string => {
  return getCss({
    ':host': {
      display: 'flex',
    },
    root: {
      ...getContentWrapperJssStyle(width),
      backgroundColor: backgroundColor === 'default' ? getThemedColors(theme).backgroundColor : 'transparent',
    },
  });
};
