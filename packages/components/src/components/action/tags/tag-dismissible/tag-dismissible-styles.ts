import {
  getFocusJssStyle,
  getThemedColors,
  pxToRemWithUnit,
  getTransition,
  addImportantToEachRule,
} from '../../../../styles';
import { getCss } from '../../../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { textSmall, fontWeight, getScreenReaderOnlyJssStyle } from '@porsche-design-system/utilities-v2';
import { getThemedBackgroundColor } from '../utils/tags-style-utils';

export const getComponentCss = (color: TagDismissibleColor, hasLabel: boolean): string => {
  const themedColors = getThemedColors('light');
  const { baseColor, contrastLowColor, contrastMediumColor } = themedColors;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      button: {
        position: 'relative',
        minHeight: '48px',
        padding: '4px 46px 4px 16px',
        borderRadius: '4px',
        border: 0,
        cursor: 'pointer',
        background: getThemedBackgroundColor(color, themedColors),
        color: baseColor,
        textAlign: 'left',
        ...textSmall,
        ...getFocusJssStyle({ color: baseColor }),
        transition: getTransition('background-color'),
        '&:hover': {
          background: contrastLowColor,
        },
      },
      '::slotted': addImportantToEachRule({
        '&(strong),&(b)': {
          fontWeight: fontWeight.bold,
        },
        '&(em),&(i)': {
          fontStyle: 'normal',
        },
      }),
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastMediumColor,
        fontSize: pxToRemWithUnit(14),
        lineHeight: pxToRemWithUnit(20),
      },
    }),
    icon: {
      position: 'absolute',
      top: '50%',
      marginTop: '-12px',
      right: '12px',
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
