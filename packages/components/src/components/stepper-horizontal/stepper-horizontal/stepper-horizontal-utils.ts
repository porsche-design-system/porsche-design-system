import { getTagNameWithoutPrefix, throwException } from '../../../utils';
import type { Theme } from '../../../types';
import type { StepperHorizontalItemInternalHTMLProps } from '../stepper-horizontal-item/stepper-horizontal-item-utils';
import { StepperHorizontalItem } from '../stepper-horizontal-item/stepper-horizontal-item';
import { forceUpdate } from '@stencil/core';

export const STEPPER_HORIZONTAL_SIZES = ['small', 'medium'] as const;
export type StepperHorizontalSize = (typeof STEPPER_HORIZONTAL_SIZES)[number];

/** @deprecated */
export type StepperHorizontalUpdateEvent = { activeStepIndex: number };
export type StepperHorizontalUpdateEventDetail = StepperHorizontalUpdateEvent;

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
  Array.from(host.children).forEach(
    (item: HTMLElement & StepperHorizontalItem & StepperHorizontalItemInternalHTMLProps) => {
      item.theme = theme;
      forceUpdate(item);
    }
  );
};
