import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputTextState = FormState;

export const INPUT_TEXT_AUTO_COMPLETE = INPUT_BASE_AUTO_COMPLETE;
export type InputTextAutoComplete = (typeof INPUT_TEXT_AUTO_COMPLETE)[number];

export type InputTextChangeEventDetail = Event;
export type InputTextBlurEventDetail = Event;
export type InputTextInputEventDetail = InputEvent;
