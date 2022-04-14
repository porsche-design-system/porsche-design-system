import { getCss, isThemeDark } from '../../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
  ThemedColors,
} from '../../../styles';
import { fontStyle, fontWeight, textXSmall } from '@porsche-design-system/utilities-v2';
import type { TagColor } from './tag-utils';
import { hasInvertedThemeColor } from './tag-utils';
import type { Theme } from '../../../types';
import type { JssStyle } from 'jss';

export const getThemedBackgroundColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.contrastHighColor,
    'notification-neutral': themedColors.neutralSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[tagColor];
};

export const getColors = (
  tagColor: TagColor,
  theme: Theme
): {
  baseColor: string;
  hoverColor: string;
  outlineColor: string;
  focusColor: string;
  backgroundColor: string;
} => {
  const themedColors = getThemedColors(theme);
  const hasInvertedTheme = hasInvertedThemeColor(tagColor, theme);

  const { baseColor, hoverColor } = hasInvertedTheme
    ? getThemedColors(isThemeDark(theme) ? 'light' : 'dark')
    : themedColors;
  const { focusColor, baseColor: themedBaseColor } = themedColors;

  return {
    baseColor,
    hoverColor,
    outlineColor: hasInvertedTheme ? themedBaseColor : focusColor,
    focusColor: hasInvertedTheme ? focusColor : null,
    backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
  };
};

export const slottedTextStyles: JssStyle = {
  '&(strong),&(b)': {
    fontWeight: fontWeight.bold,
  },
  '&(em),&(i)': {
    fontStyle,
  },
};

export const getBeforeStyles = (baseColor: string, hoverColor: string): JssStyle => {
  return {
    outline: 0,
    '&::before': {
      content: '""',
      position: 'absolute',
      ...getInsetJssStyle(-3),
      border: '1px solid transparent',
      borderRadius: pxToRemWithUnit(6),
      transition: getTransition('border-color'),
    },
    '&:focus::before': {
      borderColor: baseColor,
    },
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
    '&:hover:focus::before': {
      borderColor: hoverColor,
    },
  };
};

export const getComponentCss = (tagColor: TagColor, isFocusable: boolean, theme: Theme): string => {
  const { baseColor, hoverColor, backgroundColor } = getColors(tagColor, theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      span: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: pxToRemWithUnit(24),
        padding: `0 ${pxToRemWithUnit(6)}`,
        borderRadius: pxToRemWithUnit(4),
        background: backgroundColor,
        color: baseColor,
        ...textXSmall,
        whiteSpace: 'nowrap',
        ...(isFocusable && {
          transition: getTransition('color'),
          '&:hover': {
            color: hoverColor,
          },
        }),
      },
      '::slotted': addImportantToEachRule({
        ...(isFocusable && {
          '&(a),&(button)': {
            display: 'inline',
            position: 'static',
            textDecoration: 'underline',
            cursor: 'pointer',
            font: 'inherit',
            outline: 0, // reset native blue outline
            // color: 'inherit', // TODO: chrome hover bug. Use when fixed.
          },
          //Transform selectors of getFocusJssStyle() to fit the ::slotted syntax
          ...Object.fromEntries(
            Object.entries(getBeforeStyles(baseColor, hoverColor))
              .filter(([key]) => key !== 'outline') // Needs to be set on correct ::slotted selector
              // Use Values of getFocusJssStyle, but transform keys to fit ::slotted
              .map(([key, value]) => [key.replace(/^&([a-z:\-()]*)(::[a-z\-]+)$/, '&(a$1)$2, &(button$1)$2'), value])
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
        }),
        '&(br)': {
          display: 'none',
        },
        ...slottedTextStyles,
      }),
    },
    icon: {
      margin: `0 ${pxToRemWithUnit(2)} 0 ${pxToRemWithUnit(-2)}`,
    },
  });
};
