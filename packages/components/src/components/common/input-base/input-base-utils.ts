import type { FormState } from '../../../utils/form/form-state';
export type InputBaseState = FormState;

export const INPUT_BASE_AUTO_COMPLETE = ['off', 'on', ''] as const;

export type InputBaseChangeEventDetail = Event;
export type InputBaseBlurEventDetail = Event;
export type InputBaseInputEventDetail = InputEvent;
