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
} from '../../../styles';
import {
  borderRadiusSmall,
  fontWeightSemiBold,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { OPTION_HEIGHT } from '../select-wrapper/select-wrapper-styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { INPUT_HEIGHT } from '../../../styles/form-styles';
import { hoverMediaQuery } from '../../../styles/hover-media-query';
import type { FormState } from '../../../utils/form/form-state';

const dropdownPositionVar = '--p-dropdown-position';

export const getButtonStyles = (theme: Theme): Styles => {
  const { primaryColor, focusColor } = getThemedColors(theme);

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
        '&:focus': {
          outlineColor: focusColor,
          '&:not(:focus-visible))': {
            outlineColor: 'transparent',
          },
        },
        ...hoverMediaQuery({
          '&:not(:disabled):hover ~ ul': {
            borderColor: primaryColor,
          },
        }),
        '&:disabled': {
          cursor: 'not-allowed',
        },
      },
    },
  };
};

export const getFilterStyles = (disabled: boolean, theme: Theme): Styles<'@global'> => {
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
        padding: '12px',
        margin: 0,
        background: backgroundColor,
        ...textSmallStyle,
        zIndex: 10,
        left: 0,
        right: 0,
        [isDirectionDown ? 'top' : 'bottom']: 'calc(100% - 2px)',
        ...(!isOpen && {
          opacity: 0,
          overflow: 'hidden',
          height: '1px',
          pointerEvents: 'none',
        }),
        maxHeight: pxToRemWithUnit(308),
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `2px solid ${contrastMediumColor}`,
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
        outline: 'none',
        ...hoverMediaQuery({
          '&:hover': {
            borderColor: primaryColor,
          },
        }),
      },
    },
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: `${spacingStaticSmall} 14px`,
      minHeight: pxToRemWithUnit(OPTION_HEIGHT),
      color: contrastHighColor,
      cursor: 'pointer',
      textAlign: 'left',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      borderRadius: borderRadiusSmall,
      transition: ['background-color', 'color'].map(getTransition).join(),
      '&[role="status"]': {
        cursor: 'not-allowed',
      },
      '&__sr': getTextHiddenJssStyle(true),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not([role="status"]):hover': {
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
  disabled: boolean,
  state: FormState,
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
      filter ? getFilterStyles(disabled, theme) : getButtonStyles(theme),
      getListStyles(direction, isOpen, theme)
    )
  );
};
