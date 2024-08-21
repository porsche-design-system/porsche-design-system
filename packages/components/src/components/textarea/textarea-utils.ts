import type { FormState } from '../../utils/form/form-state';
export type TextareaState = FormState;

export const AUTO_COMPLETE = ['off', 'on', ''] as const;
export type TextareaAutoComplete = (typeof AUTO_COMPLETE)[number];

export const TEXTAREA_WRAPS = ['hard', 'soft', 'off'] as const;
export type TextareaWrap = (typeof TEXTAREA_WRAPS)[number];

export const TEXTAREA_RESIZE = ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'] as const;
export type TextareaResize = (typeof TEXTAREA_RESIZE)[number];

export type TextareaChangeEventDetail = Event;
export type TextareaBlurEventDetail = Event;
export type TextareaInputEventDetail = InputEvent;
