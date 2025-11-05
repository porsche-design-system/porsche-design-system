import type { FormState } from '../utils/form/form-state';
import { colors } from './colors';

type ThemedFormStateColors = {
  formStateColor: string | undefined;
  formStateHoverColor: string | undefined;
};

const { successColor, successFrostedSoftColor, errorColor, errorFrostedSoftColor } = colors;

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
    formStateColor: colorMap[state],
    formStateHoverColor: colorHoverMap[state],
  };
};
