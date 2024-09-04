import type { FormState } from '../../utils/form/form-state';

export type CheckboxState = FormState;

export type CheckboxUpdateEventDetail = { name: string; value?: string; checked: boolean };
