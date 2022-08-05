import { pxToRemWithUnit } from '../../../styles';
import type { Direction, GradientColorTheme } from '../../common/scroller/scroller-utils';
import { setAttribute } from '../../../utils';

export const TAB_SIZES = ['small', 'medium'] as const;
export type TabSize = typeof TAB_SIZES[number];

export const TAB_WEIGHTS = ['regular', 'semibold'] as const;
export type TabWeight = typeof TAB_WEIGHTS[number];

export type TabChangeEvent = { activeTabIndex: number };

export type TabGradientColorTheme = GradientColorTheme;

const ENABLE_TRANSITION_CLASS = 'bar--enable-transition';

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  if (index === undefined || index === null) {
    return undefined;
  }

  const maxIndex = tabElementsCount - 1; // can be -1 without children
  let sanitizedIndex: number;

  if (maxIndex < 0 || index < 0 || index > maxIndex) {
    sanitizedIndex = undefined;
  } else {
    sanitizedIndex = index;
  }
  return sanitizedIndex;
};

export const addEnableTransitionClass = (barElement: HTMLElement): void => {
  barElement.classList.add(ENABLE_TRANSITION_CLASS);
};

export const removeEnableTransitionClass = (barElement: HTMLElement): void => {
  barElement.classList.remove(ENABLE_TRANSITION_CLASS);
};

export const getTransformationToInactive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const barWidth = offsetWidth > 0 ? offsetWidth : 0;
  const barCenter = barWidth / 2;
  const barPositionLeft = offsetLeft > 0 ? offsetLeft : 0;
  const xTranslation = barPositionLeft + barCenter;
  const xTranslate = pxToRemWithUnit(xTranslation || 0);
  return `transform: translate3d(${xTranslate},0,0); width: 0;`;
};

export const getTransformationToActive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const barWidth = pxToRemWithUnit(offsetWidth || 0);
  const barPositionLeft = pxToRemWithUnit(offsetLeft > 0 ? offsetLeft : 0);
  return `transform: translate3d(${barPositionLeft},0,0); width: ${barWidth};`;
};

export const determineEnableTransitionClass = (
  activeTabIndex: number,
  prevActiveTabIndex: number,
  barElement: HTMLElement
): void => {
  // initial active + inactive to active
  if (activeTabIndex !== undefined && prevActiveTabIndex === undefined) {
    removeEnableTransitionClass(barElement);
  } else {
    // active to active
    addEnableTransitionClass(barElement);
  }
};

export const getPrevNextTabIndex = (
  direction: Direction,
  tabElementsLength: number,
  focusedTabIndex: number
): number => {
  const newTabIndex = focusedTabIndex + (direction === 'next' ? 1 : -1);

  return (newTabIndex + tabElementsLength) % tabElementsLength;
};

export const getFocusedTabIndex = (tabElements: HTMLElement[]): number => {
  const indexOfActiveElement = tabElements.indexOf(document?.activeElement as HTMLElement);
  return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
};

export const setBarStyle = (
  tabElements: HTMLElement[],
  activeTabIndex: number,
  barElement: HTMLElement,
  prevActiveTabIndex: number
): void => {
  // statusBarElement is undefined on first render
  if (!barElement) {
    return;
  }
  let transformation: string;
  if (activeTabIndex === undefined) {
    if (prevActiveTabIndex === undefined) {
      // handle active to removed case
      removeEnableTransitionClass(barElement);
      transformation = getTransformationToInactive();
    } else {
      // handle initial inactive + active to inactive cases
      addEnableTransitionClass(barElement);
      transformation = getTransformationToInactive(tabElements[prevActiveTabIndex]);
    }
  } else {
    // handle initial active + active to active + inactive to active cases
    determineEnableTransitionClass(activeTabIndex, prevActiveTabIndex, barElement);
    transformation = getTransformationToActive(tabElements[activeTabIndex]);
  }
  setAttribute(barElement, 'style', transformation);
};

// TODO: Better approach for keyboard handling?
// export const getKeydownedSegmentedControlItem = (
//   { key }: KeyboardEvent,
//   value: string | number,
//   childrenCollection: HTMLCollection
// ): HTMLElement & SegmentedControlItem => {
//   const prevOrNext =
//     ((key === 'ArrowLeft' || key === 'Left') && -1) || ((key === 'ArrowRight' || key === 'Right') && 1);
//   if (prevOrNext) {
//     const children = Array.from(childrenCollection) as (HTMLElement & SegmentedControlItem)[];
//     const selectedIndex = children.findIndex((item) => item.value === value);
//
//     const validIndexes = children.map((item, i) => !item.disabled && i).filter((x: number | boolean) => x !== false);
//     const maxValidIndex = validIndexes.length - 1;
//
//     const selectedValidIndex = validIndexes.findIndex((i) => i === selectedIndex);
//     let newValidIndex = selectedValidIndex + prevOrNext;
//     newValidIndex = newValidIndex < 0 ? maxValidIndex : newValidIndex > maxValidIndex ? 0 : newValidIndex;
//
//     return children[validIndexes[newValidIndex]];
//   }
// };
