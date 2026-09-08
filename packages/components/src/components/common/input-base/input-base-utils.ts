import type { AriaAttributes } from '../../../types';
import { parseAndGetAriaAttributes } from '../../../utils/a11y/a11y';
import type { FormState } from '../../../utils/form/form-state';

export type InputBaseState = FormState;

export type InputBaseChangeEventDetail = Event;
export type InputBaseBlurEventDetail = Event;
export type InputBaseInputEventDetail = InputEvent;
export type InputBaseWheelEventDetail = WheelEvent;

export type InputNativeBuiltInAria = {
  'aria-describedby': string | null;
  'aria-invalid': 'true' | null;
  'aria-disabled': 'true' | null;
  'aria-readonly': 'true' | null;
};

export const mergeInputNativeAria = (
  passthrough: AriaAttributes | string | undefined,
  builtIn: InputNativeBuiltInAria
): AriaAttributes => ({
  ...(parseAndGetAriaAttributes(passthrough) ?? {}),
  ...builtIn,
});
