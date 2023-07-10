import type { ScrollerDirection, ScrollerGradientColor, ScrollerGradientColorScheme } from '../scroller/scroller-utils';
import { getAttribute, setAttribute } from '../../utils';

export const TABS_BAR_SIZES = ['small', 'medium'] as const;
export type TabsBarSize = (typeof TABS_BAR_SIZES)[number];

/** @deprecated */
export const TABS_BAR_WEIGHTS_DEPRECATED = ['semibold'] as const;
/** @deprecated */
export type TabsBarWeightDeprecated = (typeof TABS_BAR_WEIGHTS_DEPRECATED)[number];
export const TABS_BAR_WEIGHTS = ['regular', 'semi-bold', ...TABS_BAR_WEIGHTS_DEPRECATED] as const;
export type TabsBarWeight = (typeof TABS_BAR_WEIGHTS)[number];

export type TabsBarUpdateEvent = { activeTabIndex: number };

/** @deprecated */
export type TabsBarGradientColorScheme = ScrollerGradientColorScheme;
export type TabsBarGradientColor = ScrollerGradientColor;

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  const maxIndex = tabElementsCount - 1; // can be -1 without children
  if (index === undefined || index === null || maxIndex < 0 || index < 0 || index > maxIndex) {
    return undefined;
  } else {
    return index;
  }
};

export const getTransformation = (el: HTMLElement = {} as HTMLElement): string => {
  const rect = el.getBoundingClientRect();
  return `transform: translate3d(${el.offsetLeft > 0 ? el.offsetLeft : 0}px,0,0);width: ${rect.width}px`;
};

export const getPrevNextTabIndex = (
  direction: ScrollerDirection,
  tabElementsLength: number,
  focusedTabIndex: number
): number => {
  const newTabIndex = focusedTabIndex + (direction === 'next' ? 1 : -1);

  return (newTabIndex + tabElementsLength) % tabElementsLength;
};

export const getFocusedTabIndex = (tabElements: HTMLElement[]): number => {
  const indexOfActiveElement = tabElements.indexOf(document.activeElement as HTMLElement);
  return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
};

export const setBarStyle = (tabElements: HTMLElement[], activeTabIndex: number, barElement: HTMLElement): void => {
  // in frameworks, when chunk is already loaded, the watcher for activeTabIndex can trigger
  // before the component is rendered, therefore barElement is not defined, yet
  if (barElement) {
    // el.ariaSelected isn't supported in firefox, therefore we need to read the attribute
    // https://caniuse.com/mdn-api_element_ariaselected
    const currentActiveTabElement = tabElements.find((el) => getAttribute(el, 'aria-selected') === 'true');
    if (currentActiveTabElement) {
      // for initial activeTabIndex > 0 and resized window with fluid font-size for size="medium"
      // we need to adjust the starting point of the transition
      setAttribute(barElement, 'style', 'transition: none;' + getTransformation(currentActiveTabElement));
    }

    const newActiveTabElement = tabElements[activeTabIndex];
    if (newActiveTabElement) {
      setAttribute(barElement, 'style', getTransformation(newActiveTabElement));
    }

    // when there was an active item before, we need to reset the animation
    if (currentActiveTabElement) {
      // reset animation that hides the bar after the transition
      barElement.style.animation = 'none';
      window.requestAnimationFrame(() => (barElement.style.animation = ''));
    }
  }
};
