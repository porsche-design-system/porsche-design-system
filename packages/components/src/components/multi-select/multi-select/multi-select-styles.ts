import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '../../../../../utilities/projects/utilities';
import { JssStyle } from 'jss';
import { DropdownDirectionInternal } from '../../select-wrapper/select-wrapper/select-wrapper-utils';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';

export const OPTION_HEIGHT = 40; // optgroups are higher and ignored
export const ICON_SPACE = `${24 + 13 * 2 + 2}px`; // 24px = icon width, 13px * 2 = padding, 2px = border

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme
): string => {
  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'block',
        ...hostHiddenStyles,
      },
      root: {
        display: 'block',
        position: 'relative',
      },
      ...getInputJSSStyles(true, isDisabled, 'down', theme),
    }),
    icon: {
      position: 'absolute',
      bottom: '13px',
      right: '15px',
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
  });
};

const getInputJSSStyles = (
  isOpen: boolean,
  isDisabled: boolean,
  direction: DropdownDirectionInternal,
  theme: Theme
): JssStyle => {
  const { primaryColor, backgroundColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
  const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, 'none');
  const isDirectionDown = direction === 'down';

  const placeHolderJssStyle: JssStyle = {
    opacity: 1,
    color: isDisabled ? disabledColor : primaryColor,
  };

  return {
    input: {
      width: `calc(100% - (${fontLineHeight} + 6px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2))`,
      height: `calc(${fontLineHeight} + 6px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 6px additionally so input height becomes 50px
      font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
      padding: `13px ${spacingStaticMedium}`,
      boxSizing: 'border-box',
      borderRadius: borderRadiusSmall, // for white corners
      ...textSmallStyle,
      textIndent: 0,
      cursor: isDisabled ? 'not-allowed' : 'text',
      color: primaryColor,
      background: backgroundColor,
      '&::placeholder': placeHolderJssStyle,
      '&::-webkit-input-placeholder': placeHolderJssStyle,
      '&::-moz-placeholder': placeHolderJssStyle,
      '&:not(:disabled):focus': {
        opacity: 1, // to display value while typing
        '&+span, &~ ul': {
          borderColor: primaryColor,
        },
      },
      ...hoverMediaQuery({
        '&:not(:disabled)': {
          '&+span:hover': {
            borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
          },
          '&:hover': {
            '&+span, &~ul': {
              borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
            },
          },
        },
      }),
      '&+span': {
        // for focus outline and clicking arrow since input ends left of the icon
        position: 'absolute',
        ...getInsetJssStyle(),
        transition: getTransition('border-color'),
        pointerEvents: 'all',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
        borderRadius: borderRadiusSmall,
        ...(isOpen && {
          [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
          [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
        }),
      },
    },
  };
};
