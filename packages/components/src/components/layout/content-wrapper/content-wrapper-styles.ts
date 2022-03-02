import type { Theme } from '../../../types';
import type { ContentWrapperWidth, ContentWrapperBackgroundColor } from './content-wrapper-utils';
import { getCss } from '../../../utils';
import { getContentWrapperJssStyle } from '@porsche-design-system/utilities-v2';
import { getThemedColors } from '../../../styles';

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
      ...getContentWrapperJssStyle(width),
      backgroundColor: backgroundColor === 'default' ? getThemedColors(theme).backgroundColor : 'transparent',
    },
  });
};
