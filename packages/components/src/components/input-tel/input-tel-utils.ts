import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputTelState = FormState;

export const INPUT_TEL_AUTO_COMPLETE = INPUT_BASE_AUTO_COMPLETE;
export type InputTelAutoComplete = (typeof INPUT_TEL_AUTO_COMPLETE)[number];

export type InputTelChangeEventDetail = Event;
export type InputTelBlurEventDetail = Event;
export type InputTelInputEventDetail = InputEvent;
