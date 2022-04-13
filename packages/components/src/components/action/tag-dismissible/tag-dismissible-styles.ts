import {
  getFocusJssStyle,
  getThemedColors,
  pxToRemWithUnit,
  getTransition,
  addImportantToEachRule,
  addImportantToRule,
} from '../../../styles';
import { getCss } from '../../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { textSmall, getScreenReaderOnlyJssStyle } from '@porsche-design-system/utilities-v2';
import { getThemedBackgroundColor, slottedTextStyles } from '../tag/tag-styles';

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
        ...getFocusJssStyle({ color: baseColor }),
        transition: getTransition('outline'),
        '&:hover': {
          '& .icon': {
            color: hoverColor,
          },
        },
        '&:focus-visible:hover': {
          outlineColor: hoverColor,
        },
      },
      '::slotted': addImportantToEachRule(slottedTextStyles),
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
