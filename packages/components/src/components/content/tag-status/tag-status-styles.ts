import { getCss, isThemeDark } from '../../../utils';
import { getFocusJssStyle, getThemedColors } from '../../../styles';
import { textXSmall } from '@porsche-design-system/utilities';
import type { ThemedColors } from '../../../styles';
import type { TagColor } from './tag-status-utils';
import type { Theme } from '../../../types';
import type { IconName } from '../../../types';

const getThemedBackgroundColor = (color: TagColor, themedColors: ThemedColors) => {
  const colorMap: { [key in TagColor]: string } = {
    default: themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.contrastHighColor,
    'notification-neutral': themedColors.neutralSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[color];
};

export const getComponentCss = (theme: Theme, color: TagColor, icon: IconName): string => {
  const themedColors = getThemedColors(theme);
  const isDark = isThemeDark(theme);

  const { baseColor } =
    (theme === 'light' && color !== 'neutral-contrast-high') ||
    (isDark && (color === 'background-surface' || color === 'default'))
      ? themedColors
      : getThemedColors(isDark ? 'light' : 'dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
      },
    },
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'top',
      boxSizing: 'border-box',
      padding: icon ? '0px 6px 0px 4px' : '2px 6px',
      borderRadius: '4px',
      background: getThemedBackgroundColor(color, themedColors),
      color: baseColor,
      ...textXSmall,
      ...getFocusJssStyle(),
    },
    icon: {
      alignSelf: 'flex-start',
      marginRight: '2px',
      flexShrink: '0',
    },
  });
};
