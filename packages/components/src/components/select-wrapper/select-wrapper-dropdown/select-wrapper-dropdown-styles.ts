import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../types';
import type { JssStyle, Styles } from 'jss';
import { getCss, isHighContrastMode, mergeDeep } from '../../../utils';
import { addImportantToRule, getInsetJssStyle, getThemedColors, getTransition, hoverMediaQuery } from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  fontWeightSemiBold,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

import { OPTION_HEIGHT } from '../../../styles/select/option-styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';
import { getSelectOptionStyles } from '../../../styles/select/option-styles';

const dropdownPositionVar = '--p-internal-dropdown-position';

export const getButtonStyles = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  theme: Theme
): Styles => {
  const { primaryColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
  const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, state);
  const isDirectionDown = direction === 'down';

  return {
    '@global': {
      button: {
        position: 'absolute',
        top: 0,
        height: `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 10px additionally so button height becomes 54px
        width: '100%',
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        padding: 0,
        background: 'transparent',
        border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`, // using border of styled select below for label:hover selector
        borderRadius: borderRadiusSmall,
        outline: '0',
        cursor: 'pointer',
        transition: getTransition('border-color'), // background and text color are handled on select
        '&:focus, &:focus ~ ul': {
          borderColor: primaryColor,
        },
        ...hoverMediaQuery({
          '&:not(:disabled):not(:focus):hover': {
            borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
          },
        }),
        '&:disabled': {
          cursor: 'not-allowed',
          borderColor: disabledColor,
        },
        ...(isOpen && {
          [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
          [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
        }),
      },
    },
  };
};

export const getFilterStyles = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  disabled: boolean,
  theme: Theme
): Styles<'@global'> => {
  const { primaryColor, backgroundColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
  const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, state);
  const isDirectionDown = direction === 'down';

  const placeHolderJssStyle: JssStyle = {
    opacity: 1,
    color: disabled ? disabledColor : primaryColor,
  };

  return {
    '@global': {
      input: {
        display: 'block',
        position: 'absolute',
        zIndex: 1,
        bottom: '2px',
        left: '2px',
        width: `calc(100% - (${fontLineHeight} + 6px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2))`,
        height: `calc(${fontLineHeight} + 6px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 6px additionally so input height becomes 50px
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
        padding: `13px ${spacingStaticMedium}`,
        outline: '0',
        appearance: 'none',
        boxSizing: 'border-box',
        border: '0', // done via span
        borderRadius: borderRadiusSmall, // for white corners
        opacity: 0, // is used to overlay input on focus
        ...textSmallStyle,
        textIndent: 0,
        cursor: disabled ? 'not-allowed' : 'text',
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
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
          borderRadius: borderRadiusSmall,
          ...(isOpen && {
            [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
            [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
          }),
        },
      },
    },
  };
};

export const getListStyles = (direction: DropdownDirectionInternal, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor, contrastMediumColor } = getThemedColors(theme);

  return {
    '@global': {
      ul: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacingStaticSmall,
        position: `var(${dropdownPositionVar})`, // for vrt tests
        padding: '6px',
        margin: 0,
        background: backgroundColor,
        ...textSmallStyle,
        zIndex: 10,
        left: 0,
        right: 0,
        [isDirectionDown ? 'top' : 'bottom']: 'calc(100% - 2px)', // 2px border + 2px safety for rounded corners
        boxSizing: 'border-box',
        maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8px = gap, 6px = padding, 2px = border
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `2px solid ${primaryColor}`,
        [isDirectionDown ? 'borderTop' : 'borderBottom']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        ...(isDirectionDown
          ? ['borderBottomLeftRadius', 'borderBottomRightRadius']
          : ['borderTopLeftRadius', 'borderTopRightRadius']
        ).reduce((result, curr) => ({ ...result, [curr]: borderRadiusSmall }), {}),
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
      },
    },
    ...getSelectOptionStyles(theme, {
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
      },
    }),
    optgroup: {
      display: 'block',
      padding: '3px 14px',
      fontWeight: fontWeightSemiBold,
      '&:not(:first-child)': {
        marginTop: spacingStaticSmall,
      },
      '&~$option': {
        paddingLeft: '24px',
      },
    },
  };
};

export const getComponentCss = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  disabled: boolean,
  filter: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);

  return getCss(
    // merge because of global styles
    mergeDeep(
      {
        '@global': {
          ':host': {
            [dropdownPositionVar]: 'absolute', // TODO: make conditional only for tests
            display: 'block',
            position: `var(${dropdownPositionVar})`, // for vrt tests
            font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
            marginTop: `calc(-1 * (${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2))`, // we need 10px additionally so input height becomes 54px,
            paddingTop: `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 10px additionally so input height becomes 54px,
            left: 0,
            right: 0,
            color: disabled ? disabledColor : formStateColor || contrastMediumColor,
            ...(!disabled &&
              !isHighContrastMode &&
              hoverMediaQuery({
                '&(:hover)': {
                  color: formStateHoverColor || primaryColor,
                },
              })),
          },
        },
        'sr-text': {
          display: 'none',
        },
      },
      filter
        ? getFilterStyles(direction, isOpen, state, disabled, theme)
        : getButtonStyles(direction, isOpen, state, theme),
      isOpen && getListStyles(direction, theme)
    )
  );
};
