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
  getThemedColors,
  getThemedStateColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../utils';
import { UnitPositionType } from './text-field-wrapper-utils';
import { JssStyle } from 'jss';
import { srOnly, font, color } from '@porsche-design-system/utilities';
import { FormState } from '../../../types';

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

const getUnitStyles = (unitPosition: UnitPositionType, unitElementWidth?: number): JssStyle => {
  return {
    ...(unitPosition === 'prefix'
      ? {
          paddingLeft: pxToRemWithUnit(unitElementWidth),
        }
      : { paddingRight: pxToRemWithUnit(unitElementWidth) }),
  };
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isPassword: boolean,
  unit: string,
  unitPosition: UnitPositionType,
  unitElementWidth?: number
) => {
  const { textColor, backgroundColor, contrastMediumColor, activeColor, disabledColor, errorColor } =
    getThemedColors('light');
  const { stateColor, stateHoverColor } = getThemedStateColors('light', state);
  const hasState = state !== 'none';
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
          padding: hasState ? pxToRemWithUnit(11) : pxToRemWithUnit(10),
          margin: 0,
          outline: 'transparent solid 1px',
          outlineOffset: '2px',
          appearance: 'none',
          boxSizing: 'border-box',
          border: `${hasState ? '2px' : '1px'} solid ${hasState ? stateColor : contrastMediumColor}`,
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
          borderColor: stateHoverColor,
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
          ...(unit && getUnitStyles(unitPosition, unitElementWidth)),
        },

        // Reset webkit autofill styles
        '::slotted(input:-internal-autofill-selected), ::slotted(input:-internal-autofill-previewed), ::slotted(input:-webkit-autofill), ::slotted(input:-webkit-autofill:focus)':
          {
            WebkitBackgroundClip: 'padding-box',
          },

        ...(isPassword && {
          '::slotted(input), ::slotted(input[type="search"])': {
            padding: addImportantToRule('3rem'),
          },
        }),
      })
    ),
    root: {
      display: 'block',
      position: 'relative',

      '& button': {
        ...getFocusStyles({ color: color.state.focus, offset: -4 }),
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

        ...(hasState && {
          '&:focus': {
            outlineOffset: '-5px',
          },
        }),

        '&:hover': {
          color: stateHoverColor,
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
        ...buildResponsiveStyles(hideLabel, (hide: boolean): JssStyle => getFormTextHiddenJssStyle(hide)),
        display: 'block',
        width: 'fit-content',
        transition: getTransition('color'),
        '&+&--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&:hover': {
          '&~::slotted(input:not(:disabled):not([readonly]))': {
            borderColor: addImportantToRule(textColor),
          },
          ...((state === 'success' || state === 'error') && {
            '&~::slotted(input:not(:disabled):not([readonly])), ::slotted(input:hover:not(:disabled):not([readonly]))':
              {
                borderColor: addImportantToRule(
                  state === 'success' ? colorDarken.notification.success : colorDarken.notification.error
                ),
              },
          }),
        },
        '&--description': {
          color: contrastMediumColor,
        },
      },
    },
    // @mixin required() {
    required: {
      '&::after': {
        content: '" *"',
        color: errorColor,
      },
    },
    // @mixin state-message() {
    message: {
      display: 'flex',
      marginTop: pxToRemWithUnit(4),
      color: stateColor,
      transition: getTransition('color'),
      '&__icon': {
        marginRight: pxToRemWithUnit(4),
      },
    },
    'sr-only': {
      ...srOnly(),
      padding: 0,
    },
    unit: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: pxToRemWithUnit(12),
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
  });
};
