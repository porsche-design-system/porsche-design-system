import type { FormState } from '../../utils/form/form-state';
export type InputPasswordState = FormState;

export const INPUT_PASSWORD_AUTO_COMPLETE = ['off', 'on', ''] as const;
export type InputPasswordAutoComplete = (typeof INPUT_PASSWORD_AUTO_COMPLETE)[number];

export const INPUT_PASSWORD_WRAPS = ['hard', 'soft', 'off'] as const;
export type InputPasswordWrap = (typeof INPUT_PASSWORD_WRAPS)[number];

export const INPUT_PASSWORD_RESIZE = ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'] as const;
export type InputPasswordResize = (typeof INPUT_PASSWORD_RESIZE)[number];

export type InputPasswordChangeEventDetail = Event;
export type InputPasswordBlurEventDetail = Event;
export type InputPasswordInputEventDetail = InputEvent;
