import {
  addImportantToEachRule,
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
  getTransition,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import { getBaseChildStyles, isVisibleState } from '../form-styles';
import { srOnly, color } from '@porsche-design-system/utilities';
import type { FormState, Theme } from '../../../types';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  unit: string,
  unitPosition: TextFieldWrapperUnitPosition,
  isPassword: boolean
): string => {
  const theme: Theme = 'light';
  const { baseColor, contrastMediumColor, activeColor, disabledColor, hoverColor } = getThemedColors(theme);
  const hasVisibleState = isVisibleState(state);

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles(
      addImportantToEachRule({
        ...mergeDeep(
          getBaseChildStyles('input', state),
          !unit && {
            '::slotted(input)': {
              padding: pxToRemWithUnit(hasVisibleState ? 10 : 11),
            },
          }
        ),
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
        color: baseColor,
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
      ...(unitPosition === 'suffix' ? { right: 0 } : { left: 0 }),
      padding: pxToRemWithUnit(12),
      zIndex: 1,
      boxSizing: 'border-box',
      color: contrastMediumColor,
      '&--disabled': {
        color: disabledColor,
        cursor: 'not-allowed',
      },
    },
    'label__text, unit': addImportantToEachRule({
      '&:hover': {
        '&~::slotted(input:not(:disabled):not([readonly]))': {
          borderColor: baseColor,
        },
        ...(hasVisibleState && {
          '&~::slotted(input:not(:disabled):not([readonly])), ::slotted(input:hover:not(:disabled):not([readonly]))': {
            borderColor: colorDarken.notification[state],
          },
        }),
      },
    }),
  });
};

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
