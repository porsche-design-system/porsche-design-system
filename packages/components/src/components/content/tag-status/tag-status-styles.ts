import { getCss, isThemeDark } from '../../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, getTransition } from '../../../styles';
import { textXSmall } from '@porsche-design-system/utilities-v2';
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

export const getComponentCss = (theme: Theme, color: TagColor, icon: IconName, isFocusable: boolean): string => {
  const themedColors = getThemedColors(theme);
  const isDark = isThemeDark(theme);
  const colorCondition =
    (theme === 'light' && color !== 'neutral-contrast-high') ||
    (isDark && (color === 'background-surface' || color === 'default'));

  const { baseColor } = colorCondition ? themedColors : getThemedColors(isDark ? 'light' : 'dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        position: 'relative',
      },
      '::slotted': addImportantToEachRule({
        '&(a),&(button)': {
          display: 'block',
          position: 'static',
          textDecoration: 'underline',
          cursor: 'pointer',
          font: 'inherit',
          // color: 'inherit', // TODO: chrome hover bug. Use when fixed.
          outline: 'transparent none',
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            ...getInsetJssStyle(),
            outline: '1px solid transparent',
            outlineOffset: '1px',
            borderRadius: '4px',
          },
        },
        ...(!colorCondition
          ? {
              '&(a:focus)::before, &(button:focus)::before': {
                outlineColor: themedColors.baseColor,
              },
              '&(a:focus-visible:hover)::before, &(button:focus-visible:hover)::before': {
                transition: getTransition('outline-color'),
                outlineColor: themedColors.focusColor,
              },
            }
          : {
              '&(a:focus)::before, &(button:focus)::before': {
                outlineColor: themedColors.focusColor,
              },
            }),
        '&(a:focus:not(:focus-visible))::before, &(button:focus:not(:focus-visible))::before': {
          outlineColor: 'transparent',
        },
        '&(a)': {
          color: baseColor, // TODO: chrome hover bug. Remove when fixed.
          transition: getTransition('color'), // TODO: chrome hover bug. Remove when fixed.
        },
        '&(a:hover)': {
          color: themedColors.hoverColor, // TODO: chrome hover bug. Remove when fixed.
        },
        '&(button)': {
          margin: 0,
          padding: 0,
          background: 0,
          border: 0,
          color: 'inherit', // TODO: chrome hover bug. Remove when fixed.
        },
      }),
    },
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'top',
      padding: icon ? '0px 6px 0px 4px' : '2px 6px',
      boxSizing: 'border-box',
      borderRadius: '4px',
      background: getThemedBackgroundColor(color, themedColors),
      color: baseColor,
      ...textXSmall,
      transition: getTransition('color'),
      ...(isFocusable && {
        '&:hover': {
          color: themedColors.hoverColor,
        },
      }),
    },
    icon: {
      marginRight: '2px',
    },
  });
};
