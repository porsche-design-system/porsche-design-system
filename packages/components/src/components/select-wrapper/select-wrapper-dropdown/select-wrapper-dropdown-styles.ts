import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../types';
import type { JssStyle, Styles } from 'jss';
import { getCss, isThemeDark, mergeDeep } from '../../../utils';
import {
  getInsetJssStyle,
  getTextHiddenJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../styles';
import {
  borderRadiusSmall,
  fontWeight,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { OPTION_HEIGHT } from '../select-wrapper/select-wrapper-styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { INPUT_HEIGHT } from '../../../styles/form-styles';
import { hoverMediaQuery } from '../../../styles/hover-media-query';
import type { FormState } from '../../../utils/form/form-state';

const { primaryColor: themeLightBaseColor, backgroundSurfaceColor: themeLightBackgroundSurfaceColor } =
  getThemedColors('light');

const dropdownPositionVar = '--p-dropdown-position';

export const getButtonStyles = (_isOpen: boolean, theme: Theme): Styles => {
  const { contrastHighColor, focusColor } = getThemedColors(theme);

  return {
    '@global': {
      button: {
        position: 'absolute',
        top: 0,
        height: pxToRemWithUnit(INPUT_HEIGHT),
        width: '100%',
        padding: 0,
        background: 'transparent',
        border: '2px solid currentColor',
        borderRadius: borderRadiusSmall,
        outline: '2px solid transparent',
        outlineOffset: '2px',
        cursor: 'pointer',
        color: 'currentColor',
        transition: getTransition('color'),
        // ...(isOpen && {
        //   outlineColor: focusColor,
        // }),
        '&:focus': {
          outlineColor: focusColor,
          '&:not(:focus-visible))': {
            outlineColor: 'transparent',
          },
        },
        ...hoverMediaQuery({
          '&:not(:disabled):hover ~ ul': {
            borderColor: contrastHighColor,
          },
        }),
        '&:disabled': {
          cursor: 'not-allowed',
        },
      },
    },
  };
};

export const getFilterStyles = (_isOpen: boolean, disabled: boolean, theme: Theme): Styles<'@global'> => {
  const { primaryColor, backgroundColor, contrastHighColor, focusColor, disabledColor } = getThemedColors(theme);

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
        bottom: '2px', // input is inset to not overlap with 1px or 2px border of state
        left: '2px',
        width: `calc(100% - ${inputHeightRem})`,
        height: inputHeightRem,
        padding: `13px ${spacingStaticMedium}`,
        outline: 'none',
        appearance: 'none',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: borderRadiusSmall,
        opacity: 0,
        ...textSmallStyle,
        textIndent: 0,
        cursor: disabled ? 'not-allowed' : 'text',
        color: primaryColor,
        background: backgroundColor,
        '&::placeholder': placeHolderJssStyle,
        '&::-webkit-input-placeholder': placeHolderJssStyle,
        '&::-moz-placeholder': placeHolderJssStyle,
        '&:focus': {
          opacity: disabled ? 0 : 1, // to display value while typing
          '&+span': {
            outlineColor: focusColor,
          },
        },
        ...hoverMediaQuery({
          '&:not(:disabled):hover ~ ul': {
            borderColor: contrastHighColor,
          },
        }),
        '&+span': {
          // for focus outline and click event on arrow
          position: 'absolute',
          ...getInsetJssStyle(),
          outline: '2px solid transparent',
          outlineOffset: '2px',
          transition: getTransition('color'),
          pointerEvents: 'all',
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: '2px solid currentColor',
          borderRadius: borderRadiusSmall,
          // ...(isOpen && {
          //   outlineColor: focusColor,
          // }),
        },
      },
    },
  };
};

export const getListStyles = (direction: DropdownDirectionInternal, isOpen: boolean, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const isDarkTheme = isThemeDark(theme);
  const {
    primaryColor,
    backgroundColor,
    contrastHighColor,
    contrastMediumColor,
    contrastLowColor,
    hoverColor,
    activeColor,
    disabledColor,
  } = getThemedColors(theme);

  const highlightedSelectedColor = isDarkTheme ? themeLightBaseColor : themeLightBackgroundSurfaceColor; // TODO: strange that surfaceColor isn't used for dark theme

  const baseDirectionPseudoJssStyle: JssStyle = {
    content: '""',
    display: 'block',
    position: 'sticky',
    width: '100%',
    height: '1px',
    background: contrastLowColor,
  };

  return {
    '@global': {
      ul: {
        display: 'block',
        position: `var(${dropdownPositionVar})`, // for vrt tests
        padding: 0,
        margin: 0,
        marginTop: pxToRemWithUnit(-1),
        color: primaryColor,
        background: backgroundColor,
        ...textSmallStyle,
        zIndex: 10,
        left: 0,
        right: 0,
        maxHeight: pxToRemWithUnit(308),
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `1px solid ${contrastMediumColor}`,
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
        outline: 'none',
        ...hoverMediaQuery({
          '&:hover': {
            borderColor: contrastHighColor,
          },
        }),
        ...(isDirectionDown
          ? {
              top: 'calc(100%-1px)',
              borderTop: 'none',
              boxShadow: '0 2px 4px 0 rgba(0,0,0,.05), 0 12px 25px 0 rgba(0,0,0,.1)',
              '&::before': {
                ...baseDirectionPseudoJssStyle,
                top: 0,
              },
            }
          : {
              bottom: pxToRemWithUnit(INPUT_HEIGHT - 1),
              borderBottom: 'none',
              boxShadow: '0 -2px 4px 0 rgba(0,0,0,.05), 0 -12px 25px 0 rgba(0,0,0,.075)',
              '&::after': {
                ...baseDirectionPseudoJssStyle,
                bottom: 0,
              },
            }),
        ...(!isOpen && {
          top: 'calc(100%-3px)',
          opacity: 0,
          overflow: 'hidden',
          height: '1px',
          pointerEvents: 'none',
        }),
      },
    },
    option: {
      display: 'flex',
      padding: `${pxToRemWithUnit(4)} ${pxToRemWithUnit(11)}`,
      minHeight: pxToRemWithUnit(OPTION_HEIGHT),
      cursor: 'pointer',
      textAlign: 'left',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      transition: ['background-color', 'color'].map(getTransition).join(),
      '&[role="status"]': {
        cursor: 'not-allowed',
      },
      '&__sr': getTextHiddenJssStyle(true),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not([role="status"]):hover': {
          color: hoverColor,
          background: highlightedSelectedColor,
        },
      }),
      '&--highlighted, &--selected': {
        color: activeColor,
        background: highlightedSelectedColor,
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
    icon: {
      marginLeft: pxToRemWithUnit(4),
    },
    optgroup: {
      display: 'block',
      padding: `${pxToRemWithUnit(8)} ${pxToRemWithUnit(12)}`,
      marginTop: pxToRemWithUnit(8),
      fontWeight: fontWeight.bold,
      '&~$option': {
        paddingLeft: pxToRemWithUnit(24),
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
  disabled: boolean,
  state: FormState,
  filter: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastHighColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
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
                  color: formStateHoverColor || (isThemeDark(theme) ? contrastHighColor : primaryColor),
                },
              })),
          },
        },
      },
      filter ? getFilterStyles(isOpen, disabled, theme) : getButtonStyles(isOpen, theme),
      getListStyles(direction, isOpen, theme)
    )
  );
};
