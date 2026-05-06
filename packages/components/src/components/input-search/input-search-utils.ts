import type { FormState } from '../../utils/form/form-state';
export type InputSearchState = FormState;
export type InputSearchChangeEventDetail = Event;
export type InputSearchBlurEventDetail = Event;
export type InputSearchInputEventDetail = InputEvent;

export const INPUT_SEARCH_ARIA_ATTRIBUTES = [
  'role',
  'aria-autocomplete',
  'aria-controls',
  'aria-expanded',
  'aria-haspopup',
  'aria-label',
] as const;

export type InputSearchAriaAttribute = (typeof INPUT_SEARCH_ARIA_ATTRIBUTES)[number];
