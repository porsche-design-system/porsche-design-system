import type { FormState } from '../utils/form/form-state';
import {
  colorContrastLower,
  colorError,
  colorErrorFrostedSoft,
  colorErrorLow,
  colorFrostedSoft,
  colorPrimary,
  colorSuccess,
  colorSuccessFrostedSoft,
  colorSuccessLow,
} from './css-variables';

type ThemedFormStateColors = {
  formStateBackgroundColor: string;
  formStateBorderColor: string;
  formStateBorderHoverColor: string;
  formStateColor: string | undefined;
};

const colorBackgroundMap: Record<FormState, string> = {
  success: colorSuccessFrostedSoft,
  error: colorErrorFrostedSoft,
  none: colorFrostedSoft,
};

const colorBorderMap: Record<FormState, string> = {
  success: colorSuccessLow,
  error: colorErrorLow,
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
    formStateBorderColor: colorBorderMap[state],
    formStateBorderHoverColor: colorBorderHoverMap[state],
    formStateColor: colorMap[state],
  };
};
