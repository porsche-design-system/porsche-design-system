import {
  addImportantToEachRule,
  addImportantToRule,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
} from '../../styles';
import { getCss } from '../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { borderRadiusSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getTagFocusJssStyle, getThemedBackgroundColor, slottedTextJssStyle } from '../tag/tag-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import type { Theme } from '../../utils/theme';

export const getComponentCss = (color: TagDismissibleColor, theme: Theme, hasLabel: boolean): string => {
  const themedColors = getThemedColors(theme);
  const { primaryColor, hoverColor, contrastHighColor, focusColor } = themedColors;
  const backgroundColor = getThemedBackgroundColor(color, themedColors);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: addImportantToRule(0),
      },
      ':host([hidden])': {
        display: addImportantToRule('none'),
      },
      button: {
        position: 'relative',
        minHeight: '48px',
        padding: '4px 46px 4px 16px',
        borderRadius: borderRadiusSmall,
        border: 0,
        cursor: 'pointer',
        background: backgroundColor,
        color: primaryColor,
        textAlign: 'left',
        ...textSmallStyle,
        outline: 0,
        ...getTagFocusJssStyle(focusColor),
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: hoverColor,
          },
        }),
      },
      '::slotted': addImportantToEachRule(slottedTextJssStyle),
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastHighColor,
        fontSize: '14px',
        // a custom line-height is needed to have 48px height in total when label + slotted text is used
        lineHeight: '14px',
      },
    }),
    icon: {
      position: 'absolute',
      top: '50%',
      right: '12px',
      transform: 'translate3d(0, -50%, 0)',
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
