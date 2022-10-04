import type { FormState } from './form-state';

export const getRole = (state: FormState): string => {
  return state === 'error' ? 'alert' : state === 'success' ? 'status' : null;
};
