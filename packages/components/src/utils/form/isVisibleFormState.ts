import type { FormState } from './form-state';

export const isVisibleFormState = (state: FormState): boolean => state === 'success' || state === 'error';
