import type { FormState } from '../types';

export const isVisibleFormState = (state: FormState): boolean => state === 'success' || state === 'error';
