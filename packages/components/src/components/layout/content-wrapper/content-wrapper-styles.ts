import { buildHostStyles, contentWrapperVars, getCss, getThemedColors, JssStyle, mediaQuery } from '../../../utils';
import type { Theme } from '../../../types';
import type { ContentWrapperWidth, ContentWrapperBackgroundColor } from './content-wrapper-utils';

const { margin, marginXl, marginXxl, maxWidth, maxWidthExtended } = contentWrapperVars;

const widthMap: { [key in ContentWrapperWidth]?: JssStyle } = {
  basic: {
    maxWidth,
    padding: `0 ${margin}`,
    [mediaQuery('xl')]: {
      padding: `0 ${marginXl}`,
    },
    [mediaQuery('xxl')]: {
      padding: `0 ${marginXxl}`,
    },
  },
  extended: {
    maxWidth: maxWidthExtended,
  },
};

export const getComponentCss = (
  width: ContentWrapperWidth,
  backgroundColor: ContentWrapperBackgroundColor,
  theme: Theme
): string => {
  return getCss({
    ...buildHostStyles({
      display: 'flex',
    }),
    root: {
      margin: '0 auto',
      backgroundColor: backgroundColor === 'default' ? getThemedColors(theme).backgroundColor : 'transparent',
      width: '100%',
      minWidth: 0,
      ...widthMap[width],
    },
  });
};
