import {
  borderRadiusSmall,
  borderWidthBase,
  spacingStaticLarge,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { formElementPaddingHorizontal, getUnitCounterJssStyle } from '../../styles/form-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { TextareaResize } from './textarea-utils';

const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = colors;

export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  counter: boolean,
  resize: TextareaResize
): string => {
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(state);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      textarea: {
        resize,
        display: 'block',
        width: '100%',
        height: 'auto',
        margin: 0,
        outline: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'border-box',
        border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
        borderRadius: borderRadiusSmall,
        background: 'transparent',
        textIndent: 0,
        color: primaryColor,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        minWidth: `calc(1rem + ${formElementPaddingHorizontal}*2 + ${borderWidthBase}*2)`,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        gridArea: '1/1',
        font: textSmallStyle.font, // to override line-height
        padding: counter
          ? `12px ${formElementPaddingHorizontal} ${spacingStaticLarge}`
          : `12px ${formElementPaddingHorizontal}`,
        // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
        '&:focus': {
          borderColor: primaryColor,
        },
        '&:disabled': {
          cursor: 'not-allowed',
          color: disabledColor,
          borderColor: disabledColor,
          WebkitTextFillColor: disabledColor,
        },
        '&[readonly]': {
          borderColor: contrastLowColor,
          background: contrastLowColor,
        },
      },
      ...(hoverMediaQuery({
        // with the media query the selector has higher priority and overrides disabled styles
        'textarea:not(:disabled):not(:focus):not([readonly]):hover,label:hover~.wrapper textarea:not(:disabled):not(:focus):not([readonly])':
          {
            borderColor: formStateHoverColor || primaryColor,
          },
      }) as Styles),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
    },
    ...(counter && {
      counter: {
        ...getUnitCounterJssStyle(isDisabled, isReadonly),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
      },
      // TODO: maybe we should extract it as functional component too
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
