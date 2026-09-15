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

  // scroll only the scroll area itself: `scrollIntoView` also scrolls every scrollable ancestor
  // (including the page) in browsers without `container: 'nearest'` support (Firefox, Safari)
  // TODO: switch back to `scrollIntoView({ ..., container: 'nearest' })` once Firefox and Safari
  //  ship the `container` option (track https://caniuse.com/?search=scroll-into-view-container).
  // TODO: would be better to expose `scrollLeft` (or a scroll method) on `p-scroller`
  const scrollArea = scroller.shadowRoot?.querySelector('.scroll') as HTMLElement | null;
  if (!scrollArea) {
    return;
  }

  const itemRect = stepperHorizontalItems[stepIndex].getBoundingClientRect();
  const areaRect = scrollArea.getBoundingClientRect();
  // Delta between item center and visible scroll-area center (works for both LTR and RTL,
  // since `scrollLeft` is negative in RTL and `scrollTo` clamps to the valid range).
  const delta = itemRect.left + itemRect.width / 2 - (areaRect.left + areaRect.width / 2);

  scrollArea.scrollTo({
    left: scrollArea.scrollLeft + delta,
    behavior: isSmooth ? 'smooth' : 'instant',
  } as ScrollToOptions);
};
