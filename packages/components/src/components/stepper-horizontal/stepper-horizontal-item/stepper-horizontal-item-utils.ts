import type { IconName } from '@porsche-design-system/icons';
import { getTagNameWithoutPrefix, throwException } from '../../../utils';

export const STEPPER_ITEM_STATES = ['current', 'complete', 'warning'] as const;
export type StepperHorizontalItemState = (typeof STEPPER_ITEM_STATES)[number];

export const isStateCompleteOrWarning = (state: StepperHorizontalItemState): boolean => {
  return state === 'complete' || state === 'warning';
};

export const internalStepper = {
  isStateCompleteOrWarning,
};

export const getStepperHorizontalIconName = (
  state: StepperHorizontalItemState
): Extract<IconName, 'success' | 'warning'> => {
  return state === 'complete' ? 'success' : 'warning';
};

export const throwIfCurrentAndDisabled = (host: HTMLElement): void => {
  if (
    (host as HTMLPStepperHorizontalItemElement).state === 'current' &&
    (host as HTMLPStepperHorizontalItemElement).disabled
  ) {
    throwException(`using state='current' and disabled='true' for ${getTagNameWithoutPrefix(host)} is not allowed.`);
  }
};

export const isItemClickable = (state: StepperHorizontalItemState, disabled: boolean): boolean => {
  return !!state && internalStepper.isStateCompleteOrWarning(state) && !disabled;
};
