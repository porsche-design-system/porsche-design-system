import type { FormState } from '../utils/form/form-state';
import {
  colorContrastHigh,
  colorContrastLower,
  colorError,
  colorErrorFrostedSoft,
  colorErrorMedium,
  colorFrosted,
  colorPrimary,
  colorSuccess,
  colorSuccessFrostedSoft,
  colorSuccessMedium,
} from './css-variables';

type ThemedFormStateColors = {
  formStateBackgroundColor: string;
  formStateBackgroundHoverColor: string;
  formStateBorderColor: string;
  formStateBorderHoverColor: string;
  formStateColor: string | undefined;
};

const colorBackgroundMap: Record<FormState, string> = {
  success: colorSuccessFrostedSoft,
  error: colorErrorFrostedSoft,
  none: colorFrosted,
};

const colorBackgroundHoverMap: Record<FormState, string> = {
  success: colorSuccessMedium,
  error: colorErrorMedium,
  none: colorContrastHigh,
};

const colorBorderMap: Record<FormState, string> = {
  success: colorSuccess,
  error: colorError,
  none: colorContrastLower,
};

const colorBorderHoverMap: Record<FormState, string> = {
  success: colorSuccess,
  error: colorError,
  none: colorPrimary,
};

const colorMap: Record<FormState, string> = {
  success: colorSuccess,
  error: colorError,
  none: undefined,
};

export const getThemedFormStateColors = (state: FormState): ThemedFormStateColors => {
  return {
    formStateBackgroundColor: colorBackgroundMap[state],
    formStateBackgroundHoverColor: colorBackgroundHoverMap[state],
    formStateBorderColor: colorBorderMap[state],
    formStateBorderHoverColor: colorBorderHoverMap[state],
    formStateColor: colorMap[state],
  };
};
