import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  getInvertedThemedColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  ThemedColors,
} from '../../styles';
import { borderRadiusSmall, textXSmallStyle } from '@porsche-design-system/utilities-v2';
import type { TagColor } from './tag-utils';
import { getThemedBackgroundHoverColor, hasInvertedThemeColor } from './tag-utils';
import type { Theme } from '../../types';
import type { JssStyle } from 'jss';
import { getTagFocusJssStyle, getThemedBackgroundColor } from './tag-shared-utils';

export const getColors = (
  themedColors: ThemedColors,
  tagColor: TagColor,
  theme: Theme
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

export const getComponentCss = (tagColor: TagColor, isFocusable: boolean, theme: Theme): string => {
  const themedColors = getThemedColors(theme);
  const { primaryColor, backgroundColor, backgroundHoverColor } = getColors(themedColors, tagColor, theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      span: {
        display: 'flex',
        gap: '2px',
        alignItems: 'center',
        position: 'relative',
        padding: '4px 9px',
        borderRadius: borderRadiusSmall,
        background: backgroundColor,
        color: primaryColor,
        font: textXSmallStyle.font,
        whiteSpace: 'nowrap',
        ...(isFocusable && {
          transition: getTransition('background-color'),
          ...hoverMediaQuery({
            '&:hover': {
              background: backgroundHoverColor,
            },
          }),
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
          appearance: 'none',
          margin: 0,
          padding: 0,
          background: 0,
          border: 0,
          textAlign: 'left',
        },
        // Transform selectors of getTagFocusJssStyle() to fit the ::slotted syntax
        ...Object.entries(getTagFocusJssStyle(themedColors)).reduce((result, [key, value]) => {
          result[key.replace(/^&([a-z:\-()]*)(::[a-z\-]+)$/, '&(a$1)$2, &(button$1)$2')] = value;
          return result;
        }, {} as JssStyle),
        '&(br)': {
          display: 'none',
        },
      }),
    },
    icon: {
      marginLeft: '-2px', // optimize visual alignment
    },
  });
};
