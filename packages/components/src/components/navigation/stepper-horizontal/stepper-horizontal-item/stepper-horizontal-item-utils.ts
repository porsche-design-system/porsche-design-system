import { IconName } from '@porsche-design-system/icons';

export type StepperState = 'current' | 'complete' | 'warning';

export const isStateCompleteOrWarning = (state: StepperState): boolean => {
  return state === 'complete' || state === 'warning';
};

export const getIcon = (state: StepperState): Extract<IconName, 'success' | 'warning'> => {
  return state === 'complete' ? 'success' : 'warning';
};
