import { getTagNameWithoutPrefix, throwException } from '../../../utils';

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

export const scrollStepperHorizontalItemIntoView = (
  stepIndex: number | undefined,
  scroller: HTMLElement | undefined,
  stepperHorizontalItems: HTMLElement[],
  isSmooth = true
): void => {
  if (!scroller || !stepperHorizontalItems.length) {
    return;
  }

  if (stepIndex === undefined || stepIndex < 0 || stepIndex >= stepperHorizontalItems.length) {
    return;
  }

  stepperHorizontalItems[stepIndex]?.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant',
    block: 'nearest',
    inline: 'center',
    container: 'nearest',
  } as ScrollIntoViewOptions);
};
