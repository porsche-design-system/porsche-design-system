import { pxToRem } from '@porsche-design-system/utilities';
import { prefix } from '../../../utils';

export type Direction = 'prev' | 'next';
export const FOCUS_PADDING_WIDTH = 4;

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  if (index === undefined) {
    return undefined;
  }
  const maxIndex = tabElementsCount - 1; // can be -1 without children
  let sanitizedIndex: number;

  if (maxIndex < 0) {
    sanitizedIndex = 0;
  } else if (index > maxIndex) {
    sanitizedIndex = maxIndex;
  } else {
    sanitizedIndex = index;
  }
  return sanitizedIndex;
};

export const getXTranslationToInactive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const statusBarWidth = offsetWidth > 0 ? offsetWidth : 0;
  const statusBarCenter = statusBarWidth / 2;
  const statusBarPositionLeft = offsetLeft > 0 ? offsetLeft : 0;
  const xTranslation = statusBarPositionLeft + statusBarCenter;
  return xTranslation ? pxToRem(`${xTranslation}px`) : '0';
};
export const addEnableTransitionClass = (statusBarElement: HTMLElement): void => {
  statusBarElement.classList.add(prefix('tabs-bar__status-bar--enable-transition'));
};
export const removeEnableTransitionClass = (statusBarElement: HTMLElement): void => {
  statusBarElement.classList.remove(prefix('tabs-bar__status-bar--enable-transition'));
};

export const determineEnableTransitionClass = (
  activeTabIndex: number,
  prevActiveTabIndex: number,
  statusBarElement: HTMLElement
): void => {
  // initial active + inactive to active
  if (activeTabIndex !== undefined && prevActiveTabIndex === undefined) {
    removeEnableTransitionClass(statusBarElement);
  } else {
    // active to active
    addEnableTransitionClass(statusBarElement);
  }
};

export const getScrollActivePosition = (
  direction: Direction,
  activeTabIndex: number,
  tabElementsCount: number,
  scrollAreaOffsetWidth: number,
  offsetLeft: number,
  prevGradientWidth: number,
  offsetWidth: number,
  nextGradientWidth: number
): number => {
  let scrollPosition;
  if (direction === 'next') {
    if (activeTabIndex === tabElementsCount - 1) {
      // go to last tab
      scrollPosition = offsetLeft - FOCUS_PADDING_WIDTH;
    } else {
      // go to next tab
      scrollPosition = offsetLeft - prevGradientWidth + FOCUS_PADDING_WIDTH * 2;
    }
  } else {
    if (activeTabIndex === 0) {
      // go to first tab
      scrollPosition = 0;
    } else {
      // go to prev tab
      scrollPosition = offsetLeft + offsetWidth + nextGradientWidth - scrollAreaOffsetWidth;
    }
  }
  return scrollPosition;
};

export const getScrollPositionAfterPrevNextClick = (
  direction: string,
  currentScrollPosition: number,
  scrollToStep: number,
  scrollToMax: number,
  scrollToMin: number
): number => {
  let scrollPosition: number;
  if (direction === 'next') {
    // Go to end of scroll-area when close to edge
    if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
      scrollPosition = scrollToMax;
    } else {
      scrollPosition = currentScrollPosition + scrollToStep;
    }
  } else {
    // Go to start of scroll-area when close to edge
    if (currentScrollPosition - scrollToStep * 2 < scrollToMin) {
      scrollPosition = scrollToMin;
    } else {
      scrollPosition = currentScrollPosition - scrollToStep;
    }
  }
  return scrollPosition;
};
