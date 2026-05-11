import type { FormState } from '../../utils/form/form-state';

export type CheckboxState = FormState;

/** @deprecated */
export type CheckboxUpdateEventDetail = { name: string; value?: string; checked: boolean };
export type CheckboxBlurEventDetail = Event;
export type CheckboxChangeEventDetail = Event;
