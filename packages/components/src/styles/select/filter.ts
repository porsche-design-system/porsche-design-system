import type { Theme } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { isThemeDark } from '../../utils';
import { getThemedColors } from '../colors';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

export const getFilterJssStyle = (scalingVar: string, theme: Theme): JssStyle => {
  const { canvasColor, surfaceColor } = getThemedColors(theme);
  const { surfaceColor: surfaceColorDark } = getThemedColors('dark');
  return {
    position: 'sticky',
    top: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
    padding: `max(2px, ${scalingVar} * 6px)`,
    margin: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
    background: isThemeDark(theme) ? surfaceColor : canvasColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: surfaceColorDark,
    }),
    zIndex: 1,
  };
};
