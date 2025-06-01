import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputSearchState = FormState;

export const INPUT_SEARCH_AUTO_COMPLETE = INPUT_BASE_AUTO_COMPLETE;
export type InputSearchAutoComplete = (typeof INPUT_SEARCH_AUTO_COMPLETE)[number];

export type InputSearchChangeEventDetail = Event;
export type InputSearchBlurEventDetail = Event;
export type InputSearchInputEventDetail = InputEvent;
