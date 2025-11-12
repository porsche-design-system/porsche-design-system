import type { FormState } from '../utils/form/form-state';
import { colors } from './colors';

type ThemedFormStateColors = {
  formStateBackgroundColor: string;
  formStateBorderColor: string;
  formStateBorderHoverColor: string;
  formStateColor: string | undefined;
  formStateHoverColor: string | undefined;
};

const {
  successColor,
  successFrostedSoftColor,
  errorColor,
  primaryColor,
  errorFrostedSoftColor,
  frostedSoftColor,
  successMediumColor,
  errorMediumColor,
  contrastMediumColor,
} = colors;

const colorBackgroundMap: Record<FormState, string> = {
  success: successFrostedSoftColor,
  error: errorFrostedSoftColor,
  none: frostedSoftColor,
};

const colorBorderMap: Record<FormState, string> = {
  success: successMediumColor,
  error: errorMediumColor,
  none: contrastMediumColor,
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

const colorHoverMap: Record<FormState, string> = {
  success: successFrostedSoftColor,
  error: errorFrostedSoftColor,
  none: undefined,
};

export const getThemedFormStateColors = (state: FormState): ThemedFormStateColors => {
  return {
    formStateBackgroundColor: colorBackgroundMap[state],
    formStateBorderColor: colorBorderMap[state],
    formStateBorderHoverColor: colorBorderHoverMap[state],
    formStateColor: colorMap[state],
    formStateHoverColor: colorHoverMap[state],
  };
};
