import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputNumberState = FormState;

export const INPUT_NUMBER_AUTO_COMPLETE = INPUT_BASE_AUTO_COMPLETE;
export type InputNumberAutoComplete = (typeof INPUT_NUMBER_AUTO_COMPLETE)[number];

export type InputNumberChangeEventDetail = Event;
export type InputNumberBlurEventDetail = Event;
export type InputNumberInputEventDetail = InputEvent;
