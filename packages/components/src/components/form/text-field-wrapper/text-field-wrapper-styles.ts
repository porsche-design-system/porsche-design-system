import {
  addImportantToEachRule,
  addImportantToRule,
  BreakpointCustomizable,
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  colorDarken,
  getBaseSlottedStyles,
  getCss,
  getFocusStyles,
  getFormTextHiddenJssStyle,
  getRequiredStyles,
  getStateMessageStyles,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../utils';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import { srOnly, font, color } from '@porsche-design-system/utilities';
import type { FormState, Theme } from '../../../types';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      ...getBaseSlottedStyles(),
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      '& input[type="text"]': {
        '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
          marginRight: '2.4375rem',
        },
      },
    })
  );
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  unit: string,
  unitPosition: TextFieldWrapperUnitPosition,
  isPassword: boolean
): string => {
  const theme: Theme = 'light';
  const { textColor, backgroundColor, contrastMediumColor, activeColor, disabledColor, hoverColor } =
    getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = ['success', 'error'].includes(state);

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles(
      addImportantToEachRule({
        '::slotted(input)': {
          position: 'relative',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: pxToRemWithUnit(48),
          display: 'block',
          ...(!unit && { padding: pxToRemWithUnit(hasVisibleState ? 10 : 11) }),
          margin: 0,
          outline: 'transparent solid 1px',
          outlineOffset: '2px',
          appearance: 'none',
          boxSizing: 'border-box',
          border: hasVisibleState ? `2px solid ${stateColor}` : `1px solid ${contrastMediumColor}`,
          borderRadius: 0,
          backgroundColor,
          opacity: 1,
          fontFamily: font.family,
          fontWeight: font.weight.regular,
          ...font.size.small,
          textIndent: 0,
          color: textColor,
          transition:
            getTransition('color') + ',' + getTransition('border-color') + ',' + getTransition('background-color'),
        },

        ...(state === 'success' || state === 'error'
          ? {
              '::slotted(input:focus)': {
                outlineColor: stateColor,
              },

              '::slotted(input[readonly]:focus)': {
                outlineColor: 'transparent',
              },
            }
          : {
              '::slotted(input:focus)': {
                outlineColor: contrastMediumColor,
              },
            }),

        '::slotted(input:hover)': {
          borderColor: hasVisibleState ? stateHoverColor : textColor,
        },

        '::slotted(input[readonly]:focus)': {
          outlineColor: 'transparent',
        },

        '::slotted(input:disabled)': {
          cursor: 'not-allowed',
          color: color.state.disabled, // 🤷
          borderColor: color.state.disabled,
          WebkitTextFillColor: color.state.disabled, // fix placeholder color bug in Safari
        },

        '::slotted(input[readonly])': {
          borderColor: '#ebebeb', // 🤷
          backgroundColor: '#ebebeb', // 🤷
        },

        '::slotted(input[readonly]:not(:disabled))': {
          color: contrastMediumColor,
        },

        '::slotted(input[type="number"])': {
          MozAppearance: 'textfield', // hides up/down spin button for Firefox
        },

        // Reset webkit autofill styles
        '::slotted(input:-internal-autofill-selected), ::slotted(input:-internal-autofill-previewed), ::slotted(input:-webkit-autofill), ::slotted(input:-webkit-autofill:focus)':
          {
            WebkitBackgroundClip: 'padding-box',
          },

        ...(isPassword && {
          '::slotted(input[type="password"]), ::slotted(input[type="text"])': {
            paddingRight: pxToRemWithUnit(48),
          },
        }),

        '::slotted(input[type="search"])': {
          paddingRight: pxToRemWithUnit(48),
        },
      })
    ),
    root: {
      display: 'block',
      position: 'relative',

      '& button': {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 0,
        width: pxToRemWithUnit(48),
        height: pxToRemWithUnit(48),
        padding: pxToRemWithUnit(12),
        boxSizing: 'border-box',
        outline: 'transparent none',
        appearance: 'none',
        border: 'none',
        textDecoration: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: textColor,
        transition: getTransition('color'),

        ...getFocusStyles({ color: color.state.focus, offset: hasVisibleState ? -5 : -4 }),

        '&:hover': {
          color: hoverColor,
        },

        '&:active': {
          color: activeColor,
        },

        '&:disabled': {
          color: disabledColor,
          cursor: 'not-allowed',
        },
      },
    },
    label: {
      display: 'block',
      '&--disabled': {
        '& .label__text': {
          color: disabledColor,
        },
      },
      '&__text': {
        ...buildResponsiveStyles(hideLabel, getFormTextHiddenJssStyle),
        display: 'block',
        width: 'fit-content',
        transition: getTransition('color'),
        '&+&--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&--description': {
          color: contrastMediumColor,
        },
      },
    },

    ...getRequiredStyles(theme),
    ...getStateMessageStyles(theme, state),

    'sr-only': {
      ...srOnly(),
      padding: 0,
    },
    unit: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: pxToRemWithUnit(12),
      zIndex: 1,
      boxSizing: 'border-box',
      color: contrastMediumColor,
      ...(unitPosition === 'suffix' && {
        left: 'auto',
        right: 0,
      }),
      '&--disabled': {
        color: disabledColor,
        cursor: 'not-allowed',
      },
    },
    'label__text, unit': {
      '&:hover': {
        '&~::slotted(input:not(:disabled):not([readonly]))': {
          borderColor: addImportantToRule(textColor),
        },
        ...((state === 'success' || state === 'error') && {
          '&~::slotted(input:not(:disabled):not([readonly])), ::slotted(input:hover:not(:disabled):not([readonly]))': {
            borderColor: addImportantToRule(colorDarken.notification[state]),
          },
        }),
      },
    },
  });
};
