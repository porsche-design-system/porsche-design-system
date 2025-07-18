import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputEmailState = FormState;

export const INPUT_EMAIL_AUTO_COMPLETE = INPUT_BASE_AUTO_COMPLETE;
export type InputEmailAutoComplete = (typeof INPUT_EMAIL_AUTO_COMPLETE)[number];

export type InputEmailChangeEventDetail = Event;
export type InputEmailBlurEventDetail = Event;
export type InputEmailInputEventDetail = InputEvent;
