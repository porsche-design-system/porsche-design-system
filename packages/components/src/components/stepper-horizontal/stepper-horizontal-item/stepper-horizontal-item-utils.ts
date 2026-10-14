import type { IconName } from '@porsche-design-system/icons';
import { consoleError, getTagNameWithoutPrefix } from '../../../utils';

export const STEPPER_ITEM_STATES = ['current', 'complete', 'warning'] as const;
export type StepperHorizontalItemState = (typeof STEPPER_ITEM_STATES)[number];

export const isStateCompleteOrWarning = (state: StepperHorizontalItemState): boolean => {
  return state === 'complete' || state === 'warning';
};

export const getStepperHorizontalIconName = (
  state: StepperHorizontalItemState
): Extract<IconName, 'success' | 'warning'> => {
  return state === 'complete' ? 'success' : 'warning';
};

// logs instead of throwing, since it runs in render() and a throwing render() stops the component from updating for good
export const logErrorIfCurrentAndDisabled = (host: HTMLElement): void => {
  if (
    (host as HTMLPStepperHorizontalItemElement).state === 'current' &&
    (host as HTMLPStepperHorizontalItemElement).disabled
  ) {
    consoleError(
      `using state='current' and disabled='true' for ${getTagNameWithoutPrefix(host)} is not allowed.`,
      host
    );
  }
};

export const isItemClickable = (state: StepperHorizontalItemState, disabled: boolean): boolean => {
  return !!state && isStateCompleteOrWarning(state) && !disabled;
};
