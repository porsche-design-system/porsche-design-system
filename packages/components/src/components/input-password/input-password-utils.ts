import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputPasswordState = FormState;

export const INPUT_PASSWORD_AUTO_COMPLETE = [...INPUT_BASE_AUTO_COMPLETE, 'current-password', 'new-password'] as const;
export type InputPasswordAutoComplete = (typeof INPUT_PASSWORD_AUTO_COMPLETE)[number];

export type InputPasswordChangeEventDetail = Event;
export type InputPasswordBlurEventDetail = Event;
export type InputPasswordInputEventDetail = InputEvent;
