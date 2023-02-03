import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../types';
import type { JssStyle, Styles } from 'jss';
import { getCss, mergeDeep } from '../../../utils';
import {
  getInsetJssStyle,
  getTextHiddenJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
  addImportantToRule,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontWeightSemiBold,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { ICON_SPACE, OPTION_HEIGHT } from '../select-wrapper/select-wrapper-styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { INPUT_HEIGHT } from '../../../styles/form-styles';
import { hoverMediaQuery } from '../../../styles/hover-media-query';
import type { FormState } from '../../../utils/form/form-state';

const dropdownPositionVar = '--p-internal-dropdown-position';

export const getButtonStyles = (isOpen: boolean, state: FormState, theme: Theme): Styles => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const { formStateHoverColor } = getThemedFormStateColors(theme, state);

  return {
    '@global': {
      button: {
        position: 'absolute',
        top: 0,
        height: pxToRemWithUnit(INPUT_HEIGHT),
        width: '100%',
        padding: 0,
        background: 'transparent',
        border: `${borderWidthBase} solid ${isOpen ? primaryColor : 'transparent'}`, // using border of styled select below for label:hover selector
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
      },
    },
  };
};

export const getFilterStyles = (
  isOpen: boolean,
  state: FormState,
  disabled: boolean,
  theme: Theme
): Styles<'@global'> => {
  const { primaryColor, backgroundColor, disabledColor } = getThemedColors(theme);
  const { formStateHoverColor } = getThemedFormStateColors(theme, state);

  const placeHolderJssStyle: JssStyle = {
    opacity: 1,
    color: disabled ? disabledColor : primaryColor,
  };

  const inputHeightRem = pxToRemWithUnit(INPUT_HEIGHT - 4);

  return {
    '@global': {
      input: {
        display: 'block',
        position: 'absolute',
        zIndex: 1,
        bottom: '2px', // input is inset to not overlap with 2px border of state
        left: '2px',
        width: `calc(100% - ${ICON_SPACE})`,
        height: inputHeightRem,
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
          border: `${borderWidthBase} solid ${isOpen ? primaryColor : 'transparent'}`, // using border of styled select below for label:hover selector
          borderRadius: borderRadiusSmall,
        },
      },
    },
  };
};

export const getListStyles = (direction: DropdownDirectionInternal, isOpen: boolean, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const {
    primaryColor,
    backgroundColor,
    contrastMediumColor,
    contrastHighColor,
    backgroundSurfaceColor,
    disabledColor,
  } = getThemedColors(theme);

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
        ...(!isOpen && {
          opacity: 0,
          overflow: 'hidden',
          height: '1px',
          pointerEvents: 'none',
        }),
        boxSizing: 'border-box',
        maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8px = gap, 6px = padding, 2px = border
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `2px solid ${isOpen ? primaryColor : contrastMediumColor}`,
        // causes diagonal edge between different border colors
        [isDirectionDown ? 'borderTop' : 'borderBottom']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        // boxShadow: `0 -2px 0 ${backgroundColor}`, // TODO: rounded corners on select or button are visible
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
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: `${spacingStaticSmall} 12px`,
      minHeight: pxToRemWithUnit(OPTION_HEIGHT),
      color: contrastHighColor,
      cursor: 'pointer',
      textAlign: 'left',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      borderRadius: borderRadiusSmall,
      transition: ['background-color', 'color'].map(getTransition).join(),
      '&[role=status]': {
        cursor: 'not-allowed',
      },
      '&__sr': getTextHiddenJssStyle(true),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not([role=status]):hover': {
          color: primaryColor,
          background: backgroundSurfaceColor,
        },
      }),
      '&--highlighted, &--selected': {
        color: primaryColor,
        background: backgroundSurfaceColor,
      },
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
      },
      '&--hidden': {
        display: 'none',
      },
    },
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
    'sr-text': {
      display: 'none',
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
            marginTop: pxToRemWithUnit(-INPUT_HEIGHT),
            paddingTop: pxToRemWithUnit(INPUT_HEIGHT),
            left: 0,
            right: 0,
            color: disabled ? disabledColor : formStateColor || contrastMediumColor,
            ...(!disabled &&
              hoverMediaQuery({
                '&(:hover)': {
                  color: formStateHoverColor || primaryColor,
                },
              })),
          },
        },
      },
      filter ? getFilterStyles(isOpen, state, disabled, theme) : getButtonStyles(isOpen, state, theme),
      getListStyles(direction, isOpen, theme)
    )
  );
};
