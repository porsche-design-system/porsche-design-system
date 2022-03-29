import { getCss } from '../../../utils';
import { TagColors } from './tag-status-utils';
import { Theme } from '../../../types';
import { themeDark, themeLight } from '../../../../../utilities/projects/utilities';
import { getFocusJssStyle } from '../../../styles';

const getThemedBackgroundColor = (theme: Theme, color: TagColors) => {
  const colorTheme = theme === 'light' ? themeLight : themeDark;

  const colorMap = {
    'background-default': colorTheme.background.base,
    'background-surface': colorTheme.background.surface,
    'contrast-high': colorTheme.contrast.high,
    'notification-neutral-soft': colorTheme.notification.neutralSoft,
    'notification-success-soft': colorTheme.notification.successSoft,
    'notification-error-soft': colorTheme.notification.errorSoft,
    'notification-warning-soft': colorTheme.notification.warningSoft,
  };

  return colorMap[color];
};

export const getComponentCss = (theme: Theme, color: TagColors): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
      },
    },
    root: {
      padding: '2px 6px',
      borderRadius: '4px',
      background: getThemedBackgroundColor(theme, color),
      ...getFocusJssStyle(),
    },
  });
};
