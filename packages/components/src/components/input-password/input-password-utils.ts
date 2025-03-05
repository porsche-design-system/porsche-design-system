import type { FormState } from '../../utils/form/form-state';
export type InputPasswordState = FormState;

export const INPUT_PASSWORD_AUTO_COMPLETE = ['off', 'on', 'current-password', 'new-password', ''] as const;
export type InputPasswordAutoComplete = (typeof INPUT_PASSWORD_AUTO_COMPLETE)[number];

export type InputPasswordChangeEventDetail = Event;
export type InputPasswordBlurEventDetail = Event;
export type InputPasswordInputEventDetail = InputEvent;
