import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { PinCodeType } from './pin-code-utils';
import type { Styles } from 'jss';
import { getCss } from '../../utils';
import { getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import {
  addImportantToEachRule,
  addImportantToRule,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { isTypeNumber } from './pin-code-utils';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  pinCodeType: PinCodeType,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const inputSize = `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`; // we need 10px additionally so input height becomes 54px
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...hostHiddenStyles,
      },
      input: {
        ...addImportantToEachRule({
          height: inputSize,
          margin: 0,
          outline: 0,
          textAlign: 'center',
          width: inputSize,
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          boxSizing: 'border-box',
          border: `${borderWidthBase} solid ${contrastMediumColor}`,
          borderRadius: borderRadiusSmall,
          background: 'transparent',
          font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
          textIndent: 0,
          color: primaryColor,
          transition: ['color', 'border-color', 'background-color'].map(getTransition).join(), // for smooth transitions between e.g. disabled states
          ...(isTypeNumber(pinCodeType) && {
            MozAppearance: 'textfield', // hides up/down spin button for Firefox
          }),
        }),
        '&::-webkit-inner-spin-button': {
          display: 'none',
        },
        ...(hoverMediaQuery({
          // with the media query the selector has higher priority and overrides disabled styles
          ['&:not(:disabled):not(:focus):not([readonly]):hover']: {
            borderColor: addImportantToRule(primaryColor),
          },
        }) as Styles),
        '&:focus': {
          borderColor: addImportantToRule(primaryColor),
        },
      },
      '.pin-code-container': {
        display: 'flex',
        gap: spacingStaticSmall,
        justifyContent: 'start',
        flexWrap: 'wrap',
      },
    },

    ...getLabelStyles('input', false, hideLabel, state, theme),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
