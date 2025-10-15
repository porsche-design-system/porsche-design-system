import { forceUpdate } from '@stencil/core';
import type { Theme } from '../../../types';
import { getTagNameWithoutPrefix, throwException } from '../../../utils';
import type { StepperHorizontalItem } from '../stepper-horizontal-item/stepper-horizontal-item';
import type { StepperHorizontalItemInternalHTMLProps } from '../stepper-horizontal-item/stepper-horizontal-item-utils';

export const STEPPER_HORIZONTAL_SIZES = ['small', 'medium'] as const;
export type StepperHorizontalSize = (typeof STEPPER_HORIZONTAL_SIZES)[number];

export type StepperHorizontalUpdateEventDetail = { activeStepIndex: number };

export const getIndexOfStepWithStateCurrent = (stepperHorizontalItems: HTMLPStepperHorizontalItemElement[]): number => {
  return stepperHorizontalItems.findIndex((item) => item.state === 'current');
};

export const throwIfMultipleCurrentStates = (
  host: HTMLElement,
  stepperHorizontalItems: HTMLPStepperHorizontalItemElement[]
): void => {
  const currentStateCount = stepperHorizontalItems.filter((item) => item.state === 'current').length;
  if (currentStateCount > 1) {
    throwException(
      `only one child with current state is allowed in ${getTagNameWithoutPrefix(host)} but got ${currentStateCount}.`
    );
  }
};

export const syncStepperHorizontalItemsProps = (host: HTMLElement, theme: Theme): void => {
  for (const item of Array.from(host.children)) {
    (item as HTMLElement & StepperHorizontalItem & StepperHorizontalItemInternalHTMLProps).theme = theme;
    forceUpdate(item);
  }
};
