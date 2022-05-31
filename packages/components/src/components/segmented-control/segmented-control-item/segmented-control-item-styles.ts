import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../styles';
import { textSmall, textXSmall } from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';

export const ITEM_PADDING = pxToRemWithUnit(40);
export const { font: ITEM_FONT } = textSmall;
export const ICON_SIZE = pxToRemWithUnit(24);
export const ICON_MARGIN = pxToRemWithUnit(4);

export const getComponentCss = (
  isSelected: boolean,
  isDisabled: boolean,
  bgColor: SegmentedControlBackgroundColor,
  theme: Theme
): string => {
  const {
    disabledColor,
    baseColor,
    backgroundColor,
    backgroundSurfaceColor,
    contrastHighColor,
    contrastLowColor,
    contrastMediumColor,
  } = getThemedColors(theme);
  const invertedThemedColors = getThemedColors(theme === 'light' ? 'dark' : 'light');
  const buttonColor = isSelected ? invertedThemedColors.baseColor : baseColor;
  const labelColor = isSelected ? invertedThemedColors.contrastMediumColor : contrastMediumColor;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        outline: 0,
      }),
      button: {
        display: 'block',
        height: '100%',
        width: '100%',
        padding: `${pxToRemWithUnit(11)} ${ITEM_PADDING}`,
        margin: 0,
        border: 0,
        background: isSelected
          ? contrastHighColor
          : bgColor === 'background-surface'
          ? backgroundColor
          : backgroundSurfaceColor,
        ...textSmall,
        ...(isDisabled
          ? {
              cursor: 'not-allowed',
              color: disabledColor,
              outline: 0,
            }
          : {
              cursor: 'pointer',
              color: buttonColor,
              ...getFocusJssStyle({ color: baseColor }),
              ...(!isSelected && {
                transition: getTransition('background-color'),
                '&:hover': {
                  background: contrastLowColor,
                },
              }),
            }),
      },
      // label
      span: {
        display: 'block',
        ...textXSmall,
        color: isDisabled ? disabledColor : labelColor,
      },
    },
    icon: {
      height: ICON_SIZE,
      width: ICON_SIZE,
      marginRight: ICON_MARGIN,
    },
  });
};
