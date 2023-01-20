import {
  addImportantToEachRule,
  addImportantToRule,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
} from '../../styles';
import { getCss } from '../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getTagFocusJssStyle, getThemedBackgroundColor } from '../tag/tag-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import type { Theme } from '../../utils/theme';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (color: TagDismissibleColor, hasLabel: boolean, theme: Theme): string => {
  const themedColors = getThemedColors(theme);
  const { primaryColor, hoverColor, contrastHighColor } = themedColors;
  const backgroundColor = getThemedBackgroundColor(color, themedColors);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'inline-block',
        verticalAlign: 'top',
        outline: addImportantToRule(0),
      }),
      ...hostHiddenStyles,
      button: {
        position: 'relative',
        minHeight: '54px',
        padding: '4px 54px 4px 12px',
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
      position: 'absolute',
      padding: '8px',
      top: '50%',
      right: '10px',
      transform: 'translate3d(0, -50%, 0)',
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
