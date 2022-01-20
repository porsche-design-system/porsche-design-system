import type { TextWeight } from '../../../types';
import { getPrefixedTagNames, getScrollByX, getTagName } from '../../../utils';
import { pxToRemWithUnit } from '../../../styles/common';

const TAB_SIZE = ['small', 'medium'] as const;
export type TabSize = typeof TAB_SIZE[number];

export type TabWeight = Extract<TextWeight, 'regular' | 'semibold'>;

export type TabChangeEvent = { activeTabIndex: number };
export type TabGradientColorTheme = 'default' | 'surface';

export type Direction = 'prev' | 'next';
export const FOCUS_PADDING_WIDTH = 4;
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

export const getScrollActivePosition = (
  tabElements: HTMLElement[],
  direction: Direction,
  activeTabIndex: number,
  scrollAreaOffsetWidth: number,
  gradientWidth: number
): number => {
  const { offsetLeft: activeTabOffsetLeft, offsetWidth: activeTabOffsetWidth } = tabElements[activeTabIndex] ?? {};
  const tabElementsCount = tabElements.length;
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
  tabElements: HTMLElement[],
  scrollAreaElement: HTMLElement,
  direction: string
): number => {
  const { offsetLeft: lastTabOffsetLeft, offsetWidth: lastTabOffsetWidth } = tabElements[tabElements.length - 1] ?? {};
  const { offsetWidth: scrollAreaWidth, scrollLeft: currentScrollPosition } = scrollAreaElement ?? {};
  const scrollToStep = getScrollByX(scrollAreaElement);
  const scrollToMax = lastTabOffsetLeft + lastTabOffsetWidth - scrollAreaWidth + FOCUS_PADDING_WIDTH * 2;

  let scrollPosition: number;
  if (direction === 'next') {
    // Go to end of scroll-area when close to edge
    if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
      scrollPosition = scrollToMax;
    } else {
      scrollPosition = currentScrollPosition + scrollToStep;
    }
  } else {
    const scrollToMin = 0;
    // Go to start of scroll-area when close to edge
    if (currentScrollPosition - scrollToStep * 2 < scrollToMin) {
      scrollPosition = scrollToMin;
    } else {
      scrollPosition = currentScrollPosition - scrollToStep;
    }
  }
  return scrollPosition;
};

export const hasPTabsParent = (hostEl: HTMLElement): boolean => {
  const { host } = hostEl.getRootNode() as ShadowRoot;
  const parentTagName = host && getTagName(host as HTMLElement);
  return parentTagName === getPrefixedTagNames(hostEl).pTabs;
};
