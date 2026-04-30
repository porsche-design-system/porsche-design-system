import type { FormState } from '../../../utils/form/form-state';

export type InputBaseState = FormState;
/**
 * Hint for browsers to display an appropriate virtual keyboard for the expected input type (mainly on mobile devices)
 * @see {@link https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute}
 */
export const INPUT_MODE_STATES = ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] as const;
export type InputMode = (typeof INPUT_MODE_STATES)[number];

export type InputBaseChangeEventDetail = Event;
export type InputBaseBlurEventDetail = Event;
export type InputBaseInputEventDetail = InputEvent;
export type InputBaseWheelEventDetail = WheelEvent;
