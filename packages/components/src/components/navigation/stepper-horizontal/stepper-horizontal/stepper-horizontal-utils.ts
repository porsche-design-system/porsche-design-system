import { getTagName } from '../../../../utils';
import type { Theme } from '../../../../utils';
import type { StepperHorizontalItemInternalHTMLProps } from '../stepper-horizontal-item/stepper-horizontal-item-utils';
import { StepperHorizontalItem } from '../stepper-horizontal-item/stepper-horizontal-item';
import { forceUpdate } from '@stencil/core';

export type StepChangeEvent = { activeStepIndex: number };

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

export const syncItemsProps = (host: HTMLElement, theme: Theme): void => {
  Array.from(host.children).forEach(
    (item: HTMLElement & StepperHorizontalItem & StepperHorizontalItemInternalHTMLProps) => {
      item.theme = theme;
      forceUpdate(item);
    }
  );
};
