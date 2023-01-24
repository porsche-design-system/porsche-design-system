import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';
import { hoverMediaQuery } from '../../../styles/hover-media-query';

export const ITEM_PADDING = pxToRemWithUnit(16);
export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = pxToRemWithUnit(24);
export const ICON_MARGIN = pxToRemWithUnit(4);

export const getColors = (
  isDisabled: boolean,
  isSelected: boolean,
  bgColor: SegmentedControlBackgroundColor,
  theme: Theme
): {
  backgroundColor: string;
  buttonColor: string;
  labelColor: string;
  borderColor: string;
  hoverBorderColor: string;
} => {
  const themedColors = getThemedColors(theme);

  const { primaryColor, contrastMediumColor } = themedColors;
  const backgroundColor = themedColors[bgColor === 'background-surface' ? 'backgroundColor' : 'backgroundSurfaceColor'];
  const borderColor = isSelected ? themedColors.primaryColor : 'transparent';
  const hoverBorderColor = isSelected ? themedColors.primaryColor : themedColors.contrastMediumColor;

  return isDisabled
    ? {
        backgroundColor,
        buttonColor: themedColors.disabledColor,
        labelColor: themedColors.disabledColor,
        borderColor,
        hoverBorderColor,
      }
    : {
        backgroundColor,
        buttonColor: primaryColor,
        labelColor: contrastMediumColor,
        borderColor,
        hoverBorderColor,
      };
};

export const getComponentCss = (
  isDisabled: boolean,
  isSelected: boolean,
  bgColor: SegmentedControlBackgroundColor,
  theme: Theme
): string => {
  const { contrastLowColor, focusColor } = getThemedColors(theme);
  const { backgroundColor, buttonColor, labelColor, borderColor, hoverBorderColor } = getColors(
    isDisabled,
    isSelected,
    bgColor,
    theme
  );

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
        padding: `${pxToRemWithUnit(12)} ${ITEM_PADDING}`,
        margin: 0,
        border: `${borderWidthBase} solid ${borderColor}`,
        transition: getTransition('border-color'),
        outline: 0,
        background: backgroundColor,
        color: buttonColor,
        ...textSmallStyle,
        overflowWrap: 'normal',
        position: 'relative',
        borderRadius: borderRadiusSmall,
        '&::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-5),
          border: `${borderWidthBase} solid transparent`,
          borderRadius: '7px',
        },
        '&:focus::before': {
          borderColor: focusColor,
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        ...(isDisabled
          ? {
              cursor: 'not-allowed',
            }
          : {
              cursor: 'pointer',
              ...hoverMediaQuery({
                transition: getTransition('background-color'),
                '&:hover': {
                  background: contrastLowColor,
                  borderColor: hoverBorderColor,
                },
              }),
            }),
      },
      // label
      span: {
        display: 'block',
        ...textXSmallStyle,
        overflowWrap: 'normal',
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
