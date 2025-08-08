import type { Theme } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { isThemeDark } from '../../utils';
import { getThemedColors } from '../colors';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

export const getFilterJssStyle = (scalingVar: string, theme: Theme): JssStyle => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');
  return {
    position: 'sticky',
    top: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
    padding: `max(2px, ${scalingVar} * 6px)`,
    margin: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
    background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundSurfaceColorDark,
    }),
    zIndex: 1,
  };
};
