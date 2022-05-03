import type { TextWeight } from '../../../types';
import { pxToRemWithUnit } from '../../../styles';
import { Direction } from '../../common/scroller/scroller-utils';
import { setAttribute } from '../../../utils';

const TAB_SIZE = ['small', 'medium'] as const;
export type TabSize = typeof TAB_SIZE[number];

export type TabWeight = Extract<TextWeight, 'regular' | 'semibold'>;

export type TabChangeEvent = { activeTabIndex: number };
const ENABLE_TRANSITION_CLASS = 'bar--enable-transition';

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  // TODO: Adjust this check when working on the validation / fallback ticket https://github.com/porscheui/porsche-design-system/issues/1235
  if (index === undefined || index === null || isNaN(index)) {
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

  if (activeTabIndex === undefined && prevActiveTabIndex !== undefined) {
    // handle initial inactive + active to inactive cases
    addEnableTransitionClass(barElement);
    transformation = getTransformationToInactive(tabElements[prevActiveTabIndex]);
  } else if (activeTabIndex === undefined && prevActiveTabIndex === undefined) {
    // handle active to removed
    removeEnableTransitionClass(barElement);
    transformation = getTransformationToInactive();
  } else {
    // handle initial active + active to active + inactive to active cases
    determineEnableTransitionClass(activeTabIndex, prevActiveTabIndex, barElement);
    transformation = getTransformationToActive(tabElements[activeTabIndex]);
  }
  setAttribute(barElement, 'style', transformation);
};
