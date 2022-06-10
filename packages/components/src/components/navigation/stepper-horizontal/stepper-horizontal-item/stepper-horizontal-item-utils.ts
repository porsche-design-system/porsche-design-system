import type { IconName } from '@porsche-design-system/icons';
import { getTagName } from '../../../../utils';
import type { Theme } from '../../../../types';

export type StepperHorizontalItemInternalHTMLProps = {
  theme: Theme;
};

export type StepperState = 'current' | 'complete' | 'warning';

export const isStateCompleteOrWarning = (state: StepperState): boolean => {
  return state === 'complete' || state === 'warning';
};

export const getIconName = (state: StepperState): Extract<IconName, 'success' | 'warning'> => {
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
