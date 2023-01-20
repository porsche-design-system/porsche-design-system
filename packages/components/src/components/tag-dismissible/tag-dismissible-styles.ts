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
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (color: TagDismissibleColor, hasLabel: boolean, theme: Theme): string => {
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
        // a custom line-height is needed to have 54px height in total when label + slotted text is used
        lineHeight: '22px',
      },
    }),
    icon: {
      position: 'absolute',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      top: '50%',
      right: '10px',
      transform: 'translate3d(0, -50%, 0)',
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
