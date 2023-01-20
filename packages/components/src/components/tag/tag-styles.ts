import { getCss, isThemeDark } from '../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getInvertedThemedColors,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
  ThemedColors,
} from '../../styles';
import {
  borderWidthBase,
  fontStyle,
  fontWeight,
  textXSmallStyle,
  borderRadiusSmall,
  borderRadiusMedium,
} from '@porsche-design-system/utilities-v2';
import type { TagColor } from './tag-utils';
import { hasInvertedThemeColor } from './tag-utils';
import type { Theme } from '../../types';
import type { JssStyle } from 'jss';
import { hoverMediaQuery } from '../../styles/hover-media-query';

export const getThemedBackgroundColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.primaryColor,
    'notification-information': themedColors.infoSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[tagColor];
};

export const getThemedBackgroundHoverColor = (tagColor: TagColor, themedColors: ThemedColors, theme: Theme): string => {
  const isDark = isThemeDark(theme);
  const colorMap: { [key in TagColor]: string } = {
    'background-default': isDark ? themedColors.backgroundColorLighten : themedColors.backgroundColorDarken,
    'background-surface': isDark
      ? themedColors.backgroundSurfaceColorLighten
      : themedColors.backgroundSurfaceColorDarken,
    'neutral-contrast-high': isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor,
    'notification-information': isDark ? themedColors.infoSoftColorLighten : themedColors.infoSoftColorDarken,
    'notification-success': isDark ? themedColors.successSoftColorLighten : themedColors.successSoftColorDarken,
    'notification-error': isDark ? themedColors.errorSoftColorLighten : themedColors.errorSoftColorDarken,
    'notification-warning': isDark ? themedColors.warningSoftColorLighten : themedColors.warningSoftColorDarken,
  };

  return colorMap[tagColor];
};

export const getColors = (
  tagColor: TagColor,
  theme: Theme,
  themedColors: ThemedColors
): {
  primaryColor: string;
  focusColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
} => {
  const hasInvertedTheme = hasInvertedThemeColor(tagColor, theme);

  const { primaryColor } = hasInvertedTheme ? getInvertedThemedColors(theme) : themedColors;
  const { focusColor } = themedColors;

  return {
    primaryColor,
    focusColor,
    backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
    backgroundHoverColor: getThemedBackgroundHoverColor(tagColor, themedColors, theme),
  };
};

export const slottedTextJssStyle: JssStyle = {
  '&(strong),&(b)': {
    fontWeight: fontWeight.bold,
  },
  '&(em),&(i)': {
    fontStyle,
  },
};

export const getTagFocusJssStyle = (themedColors: ThemedColors): JssStyle => {
  return {
    '&::before': {
      content: '""',
      position: 'absolute',
      ...getInsetJssStyle(-4),
      border: `${borderWidthBase} solid transparent`,
      borderRadius: borderRadiusMedium,
    },
    '&:focus::before': {
      borderColor: themedColors.focusColor,
    },
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
  };
};

export const getComponentCss = (tagColor: TagColor, isFocusable: boolean, theme: Theme): string => {
  const themedColors = getThemedColors(theme);
  const { primaryColor, backgroundColor, backgroundHoverColor } = getColors(tagColor, theme, themedColors);

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
        padding: '5px 9px',
        borderRadius: borderRadiusSmall,
        background: backgroundColor,
        color: primaryColor,
        ...textXSmallStyle,
        whiteSpace: 'nowrap',
        transition: `${getTransition('background-color')}`,
        ...(isFocusable &&
          hoverMediaQuery({
            '&:hover': {
              cursor: 'pointer',
              background: backgroundHoverColor,
            },
          })),
      },
      '::slotted': addImportantToEachRule({
        '&(a),&(button)': {
          display: 'inline',
          position: 'static',
          textDecoration: 'underline',
          cursor: 'pointer',
          font: 'inherit',
          outline: 0, // reset native blue outline
          color: 'inherit',
        },

        // Transform selectors of getTagFocusJssStyle() to fit the ::slotted syntax
        ...Object.entries(getTagFocusJssStyle(themedColors)).reduce((result, [key, value]) => {
          result[key.replace(/^&([a-z:\-()]*)(::[a-z\-]+)$/, '&(a$1)$2, &(button$1)$2')] = value;
          return result;
        }, {} as JssStyle),

        '&(button)': {
          margin: 0,
          padding: 0,
          background: 0,
          border: 0,
          textAlign: 'left',
        },
        '&(br)': {
          display: 'none',
        },
        ...slottedTextJssStyle,
      }),
    },
    icon: {
      margin: `0 ${pxToRemWithUnit(2)} 0 ${pxToRemWithUnit(-2)}`,
    },
  });
};
