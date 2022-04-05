import { getCss, isThemeDark, mergeDeep } from '../../../utils';
import { addImportantToEachRule, getFocusJssStyle, getThemedColors, getTransition } from '../../../styles';
import { textXSmall } from '@porsche-design-system/utilities-v2';
import type { ThemedColors } from '../../../styles';
import type { TagStatusColor } from './tag-status-utils';
import type { Theme } from '../../../types';

const getThemedBackgroundColor = (color: TagStatusColor, themedColors: ThemedColors) => {
  const colorMap: { [key in TagStatusColor]: string } = {
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

export const getComponentCss = (color: TagStatusColor, isFocusable: boolean, theme: Theme): string => {
  const themedColors = getThemedColors(theme);
  const isDark = isThemeDark(theme);
  const hasInvertedThemeColor =
    (!isDark && color !== 'neutral-contrast-high') ||
    (isDark && (color === 'background-surface' || color === 'default'));

  const { baseColor, hoverColor } = hasInvertedThemeColor ? themedColors : getThemedColors(isDark ? 'light' : 'dark');
  const outlineColor = hasInvertedThemeColor ? themedColors.focusColor : themedColors.baseColor;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
      },
      '::slotted': addImportantToEachRule({
        ...mergeDeep(
          {
            '&(a),&(button)': {
              display: 'block',
              position: 'static',
              textDecoration: 'underline',
              cursor: 'pointer',
              font: 'inherit',
              outline: 0, // reset native blue outline
              // color: 'inherit', // TODO: chrome hover bug. Use when fixed.
              '&::before': {
                borderRadius: '4px',
              },
            },
          },
          Object.fromEntries(
            Object.entries({
              ...getFocusJssStyle({ offset: 2, pseudo: '::before', color: outlineColor }),
              ...(!hasInvertedThemeColor && {
                '&:focus-visible:hover::before': {
                  transition: getTransition('outline-color'),
                  outlineColor: themedColors.focusColor,
                },
              }),
            })
              .filter(([key]) => key !== 'outline') // Needs to be set on correct ::slotted selector
              // Use Values of getFocusJssStyle, but transform keys to fit ::slotted
              .map(([key, value]) => [key.replace(/^&([a-z:\-()]*)(::[a-z\-]+)$/, '&(a$1)$2, &(button$1)$2'), value])
          )
        ),
        '&(a)': {
          color: baseColor, // TODO: chrome hover bug. Remove when fixed.
          transition: getTransition('color'), // TODO: chrome hover bug. Remove when fixed.
        },
        '&(a:hover)': {
          color: hoverColor, // TODO: chrome hover bug. Remove when fixed.
        },
        '&(button)': {
          margin: 0,
          padding: 0,
          background: 0,
          border: 0,
          color: 'inherit', // TODO: chrome hover bug. Remove when fixed.
          textAlign: 'left',
        },
        '&(br)': {
          display: 'none',
        },
      }),
    },
    root: {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      verticalAlign: 'top',
      minHeight: '24px',
      padding: '0 6px',
      borderRadius: '4px',
      background: getThemedBackgroundColor(color, themedColors),
      color: baseColor,
      ...textXSmall,
      overflowWrap: null,
      hyphens: null,
      transition: getTransition('color'),
      whiteSpace: 'nowrap',
      ...(isFocusable && {
        '&:hover': {
          color: hoverColor,
        },
      }),
    },
    icon: {
      margin: '0 2px 0 -2px',
    },
  });
};
