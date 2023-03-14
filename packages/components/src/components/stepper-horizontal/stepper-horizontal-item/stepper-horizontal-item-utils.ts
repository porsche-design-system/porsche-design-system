import type { IconName } from '@porsche-design-system/icons';
import type { Theme } from '../../../types';
import { getTagName } from '../../../utils';

export type StepperHorizontalItemInternalHTMLProps = {
  theme: Theme;
};

export const STEPPER_ITEM_STATES = ['current', 'complete', 'warning'] as const;
export type StepperHorizontalItemState = typeof STEPPER_ITEM_STATES[number];

export const isStateCompleteOrWarning = (state: StepperHorizontalItemState): boolean => {
  return state === 'complete' || state === 'warning';
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
    throw new Error(`Using state='current' and disabled='true' at ${getTagName(host)} is not allowed`);
  }
};

export const isItemClickable = (state: StepperHorizontalItemState, disabled: boolean): boolean => {
  return !!state && isStateCompleteOrWarning(state) && !disabled;
};
