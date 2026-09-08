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
  ref,
} from '@porsche-design-system/stylesheets';
import type { FormState } from '../utils/form/form-state';

type ThemedFormStateColors = {
  formStateBackgroundColor: string;
  formStateBackgroundHoverColor: string;
  formStateBorderColor: string;
  formStateBorderHoverColor: string;
  formStateColor: string | undefined;
};

const colorBackgroundMap: Record<FormState, string> = {
  success: ref(colorSuccessFrostedSoft),
  error: ref(colorErrorFrostedSoft),
  none: ref(colorFrosted),
};

const colorBackgroundHoverMap: Record<FormState, string> = {
  success: ref(colorSuccessMedium),
  error: ref(colorErrorMedium),
  none: ref(colorContrastHigh),
};

const colorBorderMap: Record<FormState, string> = {
  success: ref(colorSuccess),
  error: ref(colorError),
  none: ref(colorContrastLower),
};

const colorBorderHoverMap: Record<FormState, string> = {
  success: ref(colorSuccess),
  error: ref(colorError),
  none: ref(colorPrimary),
};

const colorMap: Record<FormState, string> = {
  success: ref(colorSuccess),
  error: ref(colorError),
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
