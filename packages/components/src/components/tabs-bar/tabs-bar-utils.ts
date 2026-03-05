import { easeInOut } from '@porsche-design-system/tokens';

export const TABS_BAR_BACKGROUNDS = ['canvas', 'surface', 'frosted', 'none'] as const;
export type TabsBarBackground = (typeof TABS_BAR_BACKGROUNDS)[number];

export const TABS_BAR_SIZES = ['small', 'medium'] as const;
export type TabsBarSize = (typeof TABS_BAR_SIZES)[number];

export type TabsBarUpdateEventDetail = { activeTabIndex: number };

/** @deprecated */
export const TABS_BAR_WEIGHTS = ['regular', 'semi-bold'] as const;
/** @deprecated */
export type TabsBarWeight = (typeof TABS_BAR_WEIGHTS)[number];

type ScrollerDirection = 'prev' | 'next';

/**
 * Clamps and validates a tab index against the available tabs array.
 * Returns `undefined` if the index is out of range or invalid.
 * @internal
 */
const getSanitizedActiveTabIndex = (tabIndex: number | null | undefined, tabs: HTMLElement[]): number | undefined => {
  const maxIndex = tabs.length - 1; // can be -1 without children
  if (
    tabIndex === undefined ||
    tabIndex === null ||
    !Number.isInteger(tabIndex) ||
    maxIndex < 0 ||
    tabIndex < 0 ||
    tabIndex > maxIndex
  ) {
    return undefined;
  }
  return tabIndex;
};

export const getActiveElementIndex = (tabs: HTMLElement[]): number | undefined => {
  const activeElementIndex = tabs.indexOf(document.activeElement as HTMLElement);
  return activeElementIndex < 0 ? undefined : activeElementIndex;
};

export const getUpcomingActiveElementIndex = (
  direction: ScrollerDirection,
  tabs: HTMLElement[],
  activeElementIndex: number
): number | undefined => {
  if (!tabs.length) {
    return undefined;
  }
  return (activeElementIndex + (direction === 'next' ? 1 : -1) + tabs.length) % tabs.length;
};

/**
 * Computes the position and size metrics of a single tab element relative to its scroller.
 * Accounts for RTL layout and scroller padding.
 * @internal
 */
const getTabMetrics = (
  scroller: HTMLElement,
  tab: HTMLElement | undefined
): { start: number; width: number; rtl: boolean } => {
  const scrollerStyles = window.getComputedStyle(scroller);
  const safeZone = parseFloat(scrollerStyles.paddingInlineStart) || 0;
  const rtl = scrollerStyles.direction === 'rtl';

  if (!tab) {
    return { start: 0, width: 0, rtl };
  }

  const tabRect = tab.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  const tabWidth = tabRect.width;

  // TODO: would be better to use p-scroller making accessing shadow DOM not necessary or expose scrollLeft as mutable prop (ideally as getter / setter which would make it necessary to refactor component and dsr generator)
  const scrollArea = scroller.shadowRoot?.querySelector('.scroll') as HTMLElement | null;
  const scrollLeft = scrollArea?.scrollLeft ?? 0;

  const start = Math.max(
    rtl
      ? scrollerRect.right - tabRect.right - scrollLeft - safeZone // scrollLeft is negative in RTL
      : tabRect.left - scrollerRect.left + scrollLeft - safeZone,
    0
  );

  return { start, width: tabWidth, rtl };
};

/**
 * Returns the animation start position and width for the bar,
 * based on the previously active tab (or the center of the new tab if no prior tab existed).
 * @internal
 */
const getStartMetrics = (
  sanitizedNewTabIndex: number | undefined,
  sanitizedOldTabIndex: number | undefined,
  scroller: HTMLElement,
  tabs: HTMLElement[]
): { translateX: number; width: number } => {
  // in case there was no active tab before, the bar should grow from the center of the new tab
  if (sanitizedOldTabIndex === undefined) {
    const { start, width, rtl } = getTabMetrics(scroller, tabs[sanitizedNewTabIndex]);
    return { translateX: (rtl ? -1 : 1) * (start + width / 2), width: 0 };
  }
  // in case there was an active tab before, the bar should use its position and width as the starting point for the animation
  const { start, width, rtl } = getTabMetrics(scroller, tabs[sanitizedOldTabIndex]);
  return { translateX: (rtl ? -1 : 1) * start, width };
};

/**
 * Returns the animation end position and width for the bar,
 * based on the newly active tab (or the center of the old tab if the active tab is cleared).
 * @internal
 */
const getEndMetrics = (
  sanitizedNewTabIndex: number | undefined,
  sanitizedOldTabIndex: number | undefined,
  scroller: HTMLElement,
  tabs: HTMLElement[]
): { translateX: number; width: number } => {
  // in case the activeTabIndex is set to undefined, the bar should shrink to the center of the old tab
  if (sanitizedNewTabIndex === undefined) {
    const { start, width, rtl } = getTabMetrics(scroller, tabs[sanitizedOldTabIndex]);
    return { translateX: (rtl ? -1 : 1) * (start + width / 2), width: 0 };
  }
  // in case there is a new active tab, the bar should use its position and width as the end point for the animation
  const { start, width, rtl } = getTabMetrics(scroller, tabs[sanitizedNewTabIndex]);
  return { translateX: (rtl ? -1 : 1) * start, width };
};

const BAR_ANIMATION_DURATION = 400;
const BAR_ANIMATION_BUFFER = 20; // ensure aria-selected style is applied

export const animateBar = (
  newTabIndex: number | undefined,
  oldTabIndex: number | undefined,
  scroller: HTMLElement,
  tabs: HTMLElement[],
  bar: HTMLElement
): void => {
  if (!scroller || !bar || !tabs.length) {
    return;
  }

  const sanitizedNewTabIndex = getSanitizedActiveTabIndex(newTabIndex, tabs);
  const sanitizedOldTabIndex = getSanitizedActiveTabIndex(oldTabIndex, tabs);

  if (sanitizedNewTabIndex === undefined && sanitizedOldTabIndex === undefined) {
    return;
  }

  const { translateX: startTranslateX, width: startWidth } = getStartMetrics(
    sanitizedNewTabIndex,
    sanitizedOldTabIndex,
    scroller,
    tabs
  );
  const { translateX: endTranslateX, width: endWidth } = getEndMetrics(
    sanitizedNewTabIndex,
    sanitizedOldTabIndex,
    scroller,
    tabs
  );

  bar.animate(
    [
      { transform: `translate3d(${startTranslateX}px,0,0)`, width: `${startWidth}px` },
      { transform: `translate3d(${endTranslateX}px,0,0)`, width: `${endWidth}px` },
    ],
    { duration: BAR_ANIMATION_DURATION + BAR_ANIMATION_BUFFER, easing: easeInOut } // give 20ms extra time to ensure the `aria-selected` and/or `aria-current` style is really applied
  );
};

export const scrollTabIntoView = (
  newTabIndex: number | undefined,
  scroller: HTMLElement | undefined,
  tabs: HTMLElement[],
  isSmooth = true
): void => {
  if (!scroller || !tabs.length) {
    return;
  }

  const sanitizedNewTabIndex = getSanitizedActiveTabIndex(newTabIndex, tabs);

  if (sanitizedNewTabIndex === undefined) {
    return;
  }

  tabs[sanitizedNewTabIndex].scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant',
    block: 'nearest',
    inline: 'center',
    container: 'nearest',
  } as ScrollIntoViewOptions);
};

export const isTabList = (tabs: HTMLElement[]): boolean => {
  // only check for the first tab, since it's not expected to mix `<a>` and `<button>` elements
  return tabs[0]?.tagName === 'BUTTON';
};
