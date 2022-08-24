import {
  addImportantToEachRule,
  addImportantToRule,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../styles';
import { getCss } from '../../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { textSmall } from '@porsche-design-system/utilities-v2';
import { getTagFocusJssStyle, getThemedBackgroundColor, slottedTextJssStyle } from '../tag/tag-styles';
import { hoverMediaQuery } from '../../../styles/hover-media-query';

export const getComponentCss = (color: TagDismissibleColor, hasLabel: boolean): string => {
  const themedColors = getThemedColors('light');
  const { baseColor, hoverColor, contrastMediumColor } = themedColors;
  const backgroundColor = getThemedBackgroundColor(color, themedColors);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: addImportantToRule(0),
      },
      button: {
        position: 'relative',
        minHeight: pxToRemWithUnit(48),
        padding: `${pxToRemWithUnit(4)} ${pxToRemWithUnit(46)} ${pxToRemWithUnit(4)} ${pxToRemWithUnit(16)}`,
        borderRadius: pxToRemWithUnit(4),
        border: 0,
        cursor: 'pointer',
        background: backgroundColor,
        color: baseColor,
        textAlign: 'left',
        ...textSmall,
        outline: 0,
        ...getTagFocusJssStyle(baseColor, hoverColor),
        ...hoverMediaQuery({
          '&:hover > .icon': {
            color: hoverColor,
          },
        }),
      },
      '::slotted': addImportantToEachRule(slottedTextJssStyle),
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: pxToRemWithUnit(-4),
        color: contrastMediumColor,
        fontSize: pxToRemWithUnit(14),
        lineHeight: pxToRemWithUnit(20),
      },
    }),
    icon: {
      position: 'absolute',
      top: '50%',
      right: pxToRemWithUnit(12),
      transform: 'translate3d(0, -50%, 0)',
      transition: getTransition('color'),
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
