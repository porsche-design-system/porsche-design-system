import { pxToRem } from '@porsche-design-system/utilities';
import { prefix } from '../../../utils';

export type Direction = 'prev' | 'next';
export const FOCUS_PADDING_WIDTH = 4;
const ENABLE_TRANSITION_CLASS = 'tabs-bar__status-bar--enable-transition';

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  if (index === undefined || index === null || isNaN(index)) {
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

export const addEnableTransitionClass = (statusBarElement: HTMLElement): void => {
  statusBarElement.classList.add(prefix(ENABLE_TRANSITION_CLASS));
};
export const removeEnableTransitionClass = (statusBarElement: HTMLElement): void => {
  statusBarElement.classList.remove(prefix(ENABLE_TRANSITION_CLASS));
};

export const getTransformationToInactive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const statusBarWidth = offsetWidth > 0 ? offsetWidth : 0;
  const statusBarCenter = statusBarWidth / 2;
  const statusBarPositionLeft = offsetLeft > 0 ? offsetLeft : 0;
  const xTranslation = statusBarPositionLeft + statusBarCenter;
  const xTranslateInRem = xTranslation ? pxToRem(`${xTranslation}px`) : '0';
  return `transform: translate3d(${xTranslateInRem},0,0); width: 0;`;
};

export const getTransformationToActive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const statusBarWidth = offsetWidth ? pxToRem(`${offsetWidth}px`) : 0;
  const statusBarPositionLeft = offsetLeft > 0 ? pxToRem(`${offsetLeft}px`) : 0;
  return `transform: translate3d(${statusBarPositionLeft},0,0); width: ${statusBarWidth};`;
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
  activeTabOffsetLeft: number,
  gradientWidth: number,
  activeTabOffsetWidth: number
): number => {
  let scrollPosition;
  if (direction === 'next') {
    if (activeTabIndex === tabElementsCount - 1) {
      // go to last tab
      scrollPosition = activeTabOffsetLeft - FOCUS_PADDING_WIDTH;
    } else {
      // go to next tab
      scrollPosition = activeTabOffsetLeft - gradientWidth + FOCUS_PADDING_WIDTH * 2;
    }
  } else {
    if (activeTabIndex === 0) {
      // go to first tab
      scrollPosition = 0;
    } else {
      // go to prev tab
      scrollPosition = activeTabOffsetLeft + activeTabOffsetWidth + gradientWidth - scrollAreaOffsetWidth;
    }
  }
  return scrollPosition;
};

export const getScrollPositionAfterPrevNextClick = (
  direction: string,
  currentScrollPosition: number,
  scrollToStep: number,
  scrollToMax: number
): number => {
  const scrollToMin = 0;
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
