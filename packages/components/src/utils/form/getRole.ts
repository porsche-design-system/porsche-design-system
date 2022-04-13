import type { FormState } from '../../types';

export const getRole = (state: FormState): string => {
  return state === 'error' ? 'alert' : state === 'success' ? 'status' : null;
};
