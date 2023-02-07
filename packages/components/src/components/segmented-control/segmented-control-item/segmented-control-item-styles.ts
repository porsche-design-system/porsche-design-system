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
import { hoverMediaQuery } from '../../../styles/hover-media-query';

export const ITEM_PADDING = '17px';
export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = pxToRemWithUnit(24);
export const ICON_MARGIN = pxToRemWithUnit(4);

export const getColors = (
  isDisabled: boolean,
  isSelected: boolean,
  theme: Theme
): {
  buttonColor: string;
  labelColor: string;
  borderColor: string;
  hoverBorderColor: string;
} => {
  const themedColors = getThemedColors(theme);

  const { primaryColor, contrastMediumColor, disabledColor, contrastLowColor } = themedColors;
  const borderColor = isSelected ? primaryColor : contrastLowColor;

  return isDisabled
    ? {
        buttonColor: disabledColor,
        labelColor: disabledColor,
        borderColor,
        hoverBorderColor: primaryColor,
      }
    : {
        buttonColor: primaryColor,
        labelColor: contrastMediumColor,
        borderColor,
        hoverBorderColor: primaryColor,
      };
};

export const getComponentCss = (isDisabled: boolean, isSelected: boolean, hasIcon: boolean, theme: Theme): string => {
  const { focusColor } = getThemedColors(theme);
  const { buttonColor, labelColor, borderColor, hoverBorderColor } = getColors(isDisabled, isSelected, theme);

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
        padding: hasIcon ? `13px ${ITEM_PADDING} 13px 13px` : `13px ${ITEM_PADDING}`,
        margin: 0,
        border: `${borderWidthBase} solid ${borderColor}`,
        outline: 0,
        backgroundColor: 'transparent',
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
                transition: getTransition('border-color'),
                '&:hover': {
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
