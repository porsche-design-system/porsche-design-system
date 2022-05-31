import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getInvertedThemedColors,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../styles';
import { textSmall, textXSmall } from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';

export const ITEM_PADDING = pxToRemWithUnit(40);
export const { font: BUTTON_FONT } = textSmall;
export const { font: LABEL_FONT } = textXSmall;
export const ICON_SIZE = pxToRemWithUnit(24);
export const ICON_MARGIN = pxToRemWithUnit(4);

export const getColors = (
  theme: Theme,
  isSelected: boolean,
  isDisabled: boolean,
  bgColor: SegmentedControlBackgroundColor
): { backgroundColor: string; baseColor: string; labelColor: string } => {
  const themedColors = getThemedColors(theme);
  const { baseColor, contrastMediumColor } = isSelected ? getInvertedThemedColors(theme) : themedColors;

  const backgroundColor =
    themedColors[
      isSelected ? 'contrastHighColor' : bgColor === 'background-surface' ? 'backgroundColor' : 'backgroundSurfaceColor'
    ];

  return isDisabled
    ? {
        backgroundColor,
        baseColor: themedColors.disabledColor,
        labelColor: themedColors.disabledColor,
      }
    : {
        backgroundColor,
        baseColor,
        labelColor: contrastMediumColor,
      };
};

export const getComponentCss = (
  isSelected: boolean,
  isDisabled: boolean,
  bgColor: SegmentedControlBackgroundColor,
  theme: Theme
): string => {
  const { contrastLowColor } = getThemedColors(theme);
  const { backgroundColor, baseColor, labelColor } = getColors(theme, isSelected, isDisabled, bgColor);

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
        background: backgroundColor,
        color: baseColor,
        ...textSmall,
        ...(isDisabled
          ? {
              cursor: 'not-allowed',
              outline: 0,
            }
          : {
              cursor: 'pointer',
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
        color: labelColor,
      },
    },
    icon: {
      height: ICON_SIZE,
      width: ICON_SIZE,
      marginRight: ICON_MARGIN,
    },
  });
};
