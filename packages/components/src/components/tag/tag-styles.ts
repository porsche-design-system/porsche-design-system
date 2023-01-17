import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getInvertedThemedColors,
  getThemedColors,
  pxToRemWithUnit,
  ThemedColors,
} from '../../styles';
import {
  borderWidthBase,
  fontStyle,
  fontWeight,
  textXSmallStyle,
  borderRadiusSmall,
} from '@porsche-design-system/utilities-v2';
import type { TagColor } from './tag-utils';
import { hasInvertedThemeColor } from './tag-utils';
import type { Theme } from '../../types';
import type { JssStyle } from 'jss';

export const getThemedBackgroundColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.contrastHighColor,
    'notification-information': themedColors.infoSoftColor,
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
  primaryColor: string;
  hoverColor: string;
  outlineColor: string;
  backgroundColor: string;
} => {
  const themedColors = getThemedColors(theme);
  const hasInvertedTheme = hasInvertedThemeColor(tagColor, theme);

  const { primaryColor, hoverColor } = hasInvertedTheme ? getInvertedThemedColors(theme) : themedColors;
  const { focusColor, primaryColor: themedBaseColor } = themedColors;

  return {
    primaryColor,
    hoverColor,
    outlineColor: hasInvertedTheme ? themedBaseColor : focusColor,
    backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
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

export const getTagFocusJssStyle = (focusColor: string): JssStyle => {
  return {
    '&::before': {
      content: '""',
      position: 'absolute',
      ...getInsetJssStyle(-3),
      border: `${borderWidthBase} solid transparent`,
      borderRadius: pxToRemWithUnit(6),
    },
    '&:focus::before': {
      borderColor: focusColor,
    },
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
  };
};

export const getComponentCss = (tagColor: TagColor, isFocusable: boolean, theme: Theme): string => {
  const { primaryColor, backgroundColor, outlineColor } = getColors(tagColor, theme);

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
        ...(isFocusable && {
          '&:hover': {
            cursor: 'pointer',
          },
        }),
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
        ...Object.entries(getTagFocusJssStyle(outlineColor)).reduce((result, [key, value]) => {
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
