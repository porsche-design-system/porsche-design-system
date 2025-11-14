import {
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  spacingStaticLarge,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getDisabledBaseStyles,
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

const { primaryColor, contrastMediumColor, frostedColor } = colors;

export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  counter: boolean,
  resize: TextareaResize
): string => {
  const { formStateBorderColor, formStateBackgroundColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      textarea: {
        all: 'unset',
        gridArea: '1/1',
        display: 'block',
        resize,
        border: `${borderWidthThin} solid ${formStateBorderColor}`,
        borderRadius: borderRadiusSmall,
        background: formStateBackgroundColor,
        color: primaryColor,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        minWidth: '2ch', // to show at least 2 characters in very narrow containers
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        font: textSmallStyle.font,
        padding: counter
          ? `12px ${formElementPaddingHorizontal} ${spacingStaticLarge}`
          : `12px ${formElementPaddingHorizontal}`,
        '&:focus': {
          borderColor: formStateBorderHoverColor,
        },
        cursor: isDisabled ? 'not-allowed' : 'text',
        ...(isReadonly && {
          borderColor: 'transparent',
          background: frostedColor,
          color: contrastMediumColor,
        }),
        ...(!isDisabled &&
          !isReadonly &&
          hoverMediaQuery({
            '&:hover,label:hover~&': {
              borderColor: formStateBorderHoverColor,
            },
          })),
      },
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
        ...getUnitCounterJssStyle(),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
      },
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
