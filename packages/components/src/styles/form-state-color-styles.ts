import type { FormState } from '../utils/form/form-state';
import { colors } from './colors';

type ThemedFormStateColors = {
  formStateBackgroundColor: string;
  formStateBorderColor: string;
  formStateBorderHoverColor: string;
  formStateColor: string | undefined;
};

const {
  successColor,
  errorColor,
  primaryColor,
  successLowColor,
  errorLowColor,
  contrastLowerColor,
  successFrostedColor,
  errorFrostedColor,
  frostedColor,
} = colors;

const colorBackgroundMap: Record<FormState, string> = {
  success: successFrostedColor,
  error: errorFrostedColor,
  none: frostedColor,
};

const colorBorderMap: Record<FormState, string> = {
  success: successLowColor,
  error: errorLowColor,
  none: contrastLowerColor,
};

const colorBorderHoverMap: Record<FormState, string> = {
  success: successColor,
  error: errorColor,
  none: primaryColor,
};

const colorMap: Record<FormState, string> = {
  success: successColor,
  error: errorColor,
  none: undefined,
};

export const getThemedFormStateColors = (state: FormState): ThemedFormStateColors => {
  return {
    formStateBackgroundColor: colorBackgroundMap[state],
    formStateBorderColor: colorBorderMap[state],
    formStateBorderHoverColor: colorBorderHoverMap[state],
    formStateColor: colorMap[state],
  };
};
