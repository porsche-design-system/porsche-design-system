import {
  getFocusJssStyle,
  getThemedColors,
  pxToRemWithUnit,
  getTransition,
  addImportantToEachRule,
} from '../../../styles';
import { getCss } from '../../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import type { ThemedColors } from '../../../styles';
import { textSmall, fontFamily, fontStyle, fontVariant, fontWeight } from '@porsche-design-system/utilities-v2';

const getBackgroundColor = (color: TagDismissibleColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagDismissibleColor]: string } = {
    default: themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.contrastHighColor,
  };
  return colorMap[color];
};

export const getComponentCss = (color: TagDismissibleColor, hasLabel: boolean): string => {
  const isNeutralContrastHigh = color === 'neutral-contrast-high';
  const themedColors = getThemedColors('light');
  const { baseColor, contrastMediumColor } = isNeutralContrastHigh ? getThemedColors('dark') : themedColors;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      button: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '48px',
        margin: 0,
        padding: '0 16px',
        borderRadius: '4px',
        outline: 'transparent none',
        border: 'none',
        appearance: 'none',
        cursor: 'pointer',
        background: getBackgroundColor(color, themedColors),
        color: baseColor,
        ...getFocusJssStyle({ color: themedColors.baseColor }),
        transition: getTransition('background-color'),
        '&:hover': {
          backgroundColor: isNeutralContrastHigh ? themedColors.baseColorDarken : themedColors.contrastLowColor,
        },
      },
      div: {
        ...textSmall,
        lineHeight: pxToRemWithUnit(16),
        overflowWrap: null,
        hyphens: null,
        whiteSpace: 'nowrap',
        textAlign: 'left',
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
        color: contrastMediumColor,
        font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 0.875rem/0.75 ${fontFamily}`,
        margin: 0,
        paddingBottom: '2px',
      },
    }),
    icon: {
      marginLeft: '12px',
    },
  });
};
