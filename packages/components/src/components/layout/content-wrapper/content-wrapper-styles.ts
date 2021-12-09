import { addImportantToEachRule, buildHostStyles, getCss, mediaQuery, pxToRemWithUnit } from '../../../utils';
import type { Theme } from '../../../types';
import { getThemedColors, JssStyle } from '../../../utils';
import type { BackgroundColor, Width } from './content-wrapper-utils';

export const contentWrapperMaxWidth = pxToRemWithUnit(1536);
export const contentWrapperMaxWidthExtended = pxToRemWithUnit(1920);
export const contentWrapperMargin = '7vw';
export const contentWrapperMarginXl = '10vw';
export const contentWrapperMarginXxl = pxToRemWithUnit(192);

const widthMap: { [key in Width]: JssStyle } = {
  basic: {
    maxWidth: contentWrapperMaxWidth,
    padding: `0 ${contentWrapperMargin}`,
    [mediaQuery('xl')]: {
      padding: `0 ${contentWrapperMarginXl}`,
    },
    [mediaQuery('xxl')]: {
      padding: `0 ${contentWrapperMarginXxl}`,
    },
  },
  extended: {
    maxWidth: contentWrapperMaxWidthExtended,
  },
  fluid: {},
};

export const getComponentCss = (width: Width, backgroundColor: BackgroundColor, theme: Theme): string => {
  const { backgroundColor: themedBackgroundColor } = getThemedColors(theme);

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'flex',
      })
    ),
    root: {
      margin: '0 auto',
      backgroundColor: backgroundColor === 'default' ? themedBackgroundColor : 'transparent',
      width: '100%',
      minWidth: 0,
      ...widthMap[width],
    },
  });
};
