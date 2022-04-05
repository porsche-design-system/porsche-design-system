import type { FormState } from '../../types';

export const isVisibleFormState = (state: FormState): boolean => state === 'success' || state === 'error';

export const getRole = (state: FormState): string => {
  return state === 'error' ? 'alert' : state === 'success' ? 'status' : null;
};
