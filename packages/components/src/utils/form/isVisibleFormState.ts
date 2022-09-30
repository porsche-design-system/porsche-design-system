import type { FormState } from '../../components/form-state';

export const isVisibleFormState = (state: FormState): boolean => state === 'success' || state === 'error';
