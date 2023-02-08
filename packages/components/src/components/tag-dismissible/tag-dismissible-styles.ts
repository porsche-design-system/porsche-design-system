import {
  addImportantToEachRule,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { getCss } from '../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getTagFocusJssStyle, getThemedBackgroundColor } from '../tag/tag-shared-utils';
import type { Theme } from '../../types';

export const getComponentCss = (color: TagDismissibleColor, hasLabel: boolean, theme: Theme): string => {
  const themedColors = getThemedColors(theme);
  const { primaryColor, hoverColor, contrastHighColor } = themedColors;
  const backgroundColor = getThemedBackgroundColor(color, themedColors);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'inline-block',
        verticalAlign: 'top',
        outline: 0,
        ...hostHiddenStyles,
      }),
      button: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap: '12px',
        minHeight: '54px',
        padding: '4px 0 4px 12px',
        borderRadius: borderRadiusSmall,
        border: 0,
        cursor: 'pointer',
        background: backgroundColor,
        color: primaryColor,
        textAlign: 'left',
        ...textSmallStyle,
        outline: 0,
        ...getTagFocusJssStyle(themedColors),
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: hoverColor,
          },
        }),
      },
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastHighColor,
        fontSize: fontSizeTextXSmall,
      },
    }),
    icon: {
      padding: '4px',
      marginRight: '10px',
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
