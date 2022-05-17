import { StepperState } from '../stepper-horizontal-item/stepper-horizontal-item-utils';

export type StepChangeEvent = { activeStepIndex: number; state: StepperState; prevStepIndex: number };
