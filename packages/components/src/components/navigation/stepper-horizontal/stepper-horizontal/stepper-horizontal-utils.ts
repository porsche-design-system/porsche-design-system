import type { StepperState } from '../stepper-horizontal-item/stepper-horizontal-item-utils';
import { getTagName } from '../../../../utils';

export type StepChangeEvent = { activeStepIndex: number; prevState: StepperState; prevStepIndex: number };

export const getIndexOfStepWithStateCurrent = (stepperHorizontalItems: HTMLPStepperHorizontalItemElement[]): number => {
  return stepperHorizontalItems.findIndex((item) => item.state === 'current');
};

export const throwIfMultipleCurrentStates = (
  host: HTMLElement,
  stepperHorizontalItems: HTMLPStepperHorizontalItemElement[]
): void => {
  const currentStateCount = stepperHorizontalItems.filter((item) => item.state === 'current').length;
  if (currentStateCount > 1) {
    throw new Error(`Only one child with current state is allowed in ${getTagName(host)} but got ${currentStateCount}`);
  }
};
