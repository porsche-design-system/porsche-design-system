import { type ThemedColors, getThemedColors } from './';
import type { Theme } from '@porsche-design-system/styles';
import type { FormState } from '../utils/form/form-state';

type ThemedFormStateColors = {
  formStateColor: string | undefined; // form state: "none" => undefined
  formStateHoverColor: string | undefined; // form state: "none" => undefined
};

export const getThemedFormStateColors = (theme: Theme, state: FormState): ThemedFormStateColors => {
  const themedColors = getThemedColors(theme);
  return {
    formStateColor: themedColors[`${state}Color` as keyof ThemedColors],
    formStateHoverColor: themedColors[`${state}ColorDarken` as keyof ThemedColors],
  };
};
