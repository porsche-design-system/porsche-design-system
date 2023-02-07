import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getCss } from '../../utils';
import { getContentWrapperStyle } from './content-wrapper-styles-shared';

export const getComponentCss = (width: ContentWrapperWidth): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
      },
    },
    root: getContentWrapperStyle(width),
  });
};
