import { StepperState } from '../stepper-horizontal-item/stepper-horizontal-item-utils';

export type StepChangeEvent = { activeStepIndex: number; prevState: StepperState; prevStepIndex: number };

export const getIndexOfStepWithStateCurrent = (stepperHorizontalItems: HTMLPStepperHorizontalItemElement[]): number => {
  return stepperHorizontalItems.findIndex((item) => item.state === 'current');
};
