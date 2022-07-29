import { getThemedColors } from './';
import type { ThemeDefault } from '@porsche-design-system/utilities-v2';
import type { FormState } from '../components/form/form-state';

type ThemedFormStateColors = {
  formStateColor: string | undefined; // form state: "none" => undefined
  formStateHoverColor: string | undefined; // form state: "none" => undefined
};

export const getThemedFormStateColors = (theme: ThemeDefault, state: FormState): ThemedFormStateColors => {
  const themedColors = getThemedColors(theme);
  return {
    formStateColor: themedColors[`${state}Color`],
    formStateHoverColor: themedColors[`${state}ColorDarken`],
  };
};
