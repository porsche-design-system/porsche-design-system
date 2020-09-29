// TODO: Unit tests?

import { prefix } from './prefix';

export type Direction = 'next' | 'prev';
export type ActionState = { readonly isPrevHidden: boolean; readonly isNextHidden: boolean}

export const getStatusBarStyle = (activeTab: HTMLElement): string => {
  const statusBarWidth = activeTab?.offsetWidth || 0;
  const statusBarPositionLeft = activeTab?.offsetLeft || 0;
  return `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;
};

export const setSectionAttributes = (tab: HTMLPTabsItemElement, index: number): void => {
  const attrs = {
    role: 'tabpanel',
    hidden: `${!tab.selected}`,
    id: prefix(`tab-panel-${index}`),
    'aria-labelledby': prefix(`tab-item-${index}`)
  };
  for (const key in attrs) {
    tab.setAttribute(key, attrs[key]);
  }
};

// Due to horizontal scroll we have to consider the focus padding inside the scroll-area
const FOCUS_PADDING_WIDTH = 4;

export const scrollOnTabClick = (
  host: HTMLElement,
  {
    newTabIndex,
    direction,
    tabSelector,
    queryInShadowRoot
  }: { newTabIndex: number; direction: Direction; tabSelector: string; queryInShadowRoot?: boolean }
): void => {
  const [baseClass] = Array.from(host.shadowRoot.firstElementChild.classList);
  const gradientWidths = getHTMLElements(host.shadowRoot, `.${baseClass}__gradient`).map((item) => item.offsetWidth);
  const scrollArea = getHTMLElement(host.shadowRoot, `.${baseClass}__scroll-area`);
  const tabs = getHTMLElements(queryInShadowRoot ? host.shadowRoot : host, tabSelector);
  const activeTab = tabs[newTabIndex];

  let scrollPosition: number;

  // go to next tab
  if (direction === 'next' && newTabIndex < host.children.length - 1) {
    scrollPosition = activeTab.offsetLeft - gradientWidths[1];
    // go to prev tab
  } else if (direction === 'prev' && newTabIndex > 0) {
    scrollPosition = activeTab.offsetLeft + activeTab.offsetWidth + gradientWidths[0] - scrollArea.offsetWidth;
    // go first tab
  } else if (newTabIndex === 0) {
    scrollPosition = 0;
    // go to last tab
  } else {
    scrollPosition = activeTab.offsetLeft - FOCUS_PADDING_WIDTH;
  }
  scrollToHorizontal(scrollArea, scrollPosition);
};

export const scrollOnPrevNextClick = (
  host: HTMLElement,
  {
    direction,
    tabSelector,
    queryInShadowRoot
  }: { direction: Direction; tabSelector: string; queryInShadowRoot?: boolean }
): void => {
  const [baseClass] = Array.from(host.shadowRoot.firstElementChild.classList);
  const scrollArea = getHTMLElement(host.shadowRoot, `.${baseClass}__scroll-area`);
  const tabs = getHTMLElements(queryInShadowRoot ? host.shadowRoot : host, tabSelector);

  const { offsetLeft: lastTabOffsetLeft, offsetWidth: lastTabOffsetWidth } = tabs[tabs.length - 1];
  const { offsetWidth: scrollAreaWidth, scrollLeft: currentScrollPosition } = scrollArea;
  const scrollToStep = Math.round(scrollAreaWidth * 0.2);
  const scrollToMax = lastTabOffsetLeft + lastTabOffsetWidth - scrollAreaWidth + FOCUS_PADDING_WIDTH;

  let scrollPosition: number;

  if (direction === 'next') {
    // Go to end of scroll-are when close to edge
    if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
      scrollPosition = scrollToMax - FOCUS_PADDING_WIDTH;
    } else {
      scrollPosition = currentScrollPosition + scrollToStep;
    }
  } else {
    // Go to start of scroll-are when close to edge
    if (currentScrollPosition - scrollToStep * 2 < 0) {
      scrollPosition = 0;
    } else {
      scrollPosition = currentScrollPosition - scrollToStep;
    }
  }
  scrollToHorizontal(scrollArea, scrollPosition);
};

const scrollToHorizontal = (scrollArea: HTMLElement, scrollPosition: number): void => {
  if (navigator.userAgent.includes('Edge/18')) {
    scrollArea.scrollLeft = scrollPosition;
  } else {
    scrollArea.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
};

export const setInitialScroll = (
  host: HTMLElement,
  {
    activeTabIndex,
    tabSelector,
    queryInShadowRoot
  }: { activeTabIndex: number; tabSelector: string; queryInShadowRoot?: boolean }
): void => {
  const [baseClass] = Array.from(host.shadowRoot.firstElementChild.classList);
  const scrollArea = getHTMLElement(host.shadowRoot, `.${baseClass}__scroll-area`);
  const gradientWidths = getHTMLElements(host.shadowRoot, `.${baseClass}__gradient`).map((item) => item.offsetWidth);
  const tabs = getHTMLElements(queryInShadowRoot ? host.shadowRoot : host, tabSelector);
  scrollArea.scrollLeft = tabs[activeTabIndex].offsetLeft - gradientWidths[1];
};


export const registerIntersectionObserver = (
  cb: (actionState: Partial<ActionState>) => void,
  tabs: HTMLElement[]
): IntersectionObserver => {
  const [firstTab] = tabs;
  const [lastTab] = tabs.slice(-1);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === firstTab) {
          cb({isPrevHidden: entry.isIntersecting});
        } else if (entry.target === lastTab) {
          cb({isNextHidden: entry.isIntersecting});
        }
      }
    },
    { threshold: 1 }
  );

  intersectionObserver.observe(firstTab);
  intersectionObserver.observe(lastTab);

  return intersectionObserver;
};

export const getHTMLElement = (host: HTMLElement | ShadowRoot, selector: string): HTMLElement => {
  return host.querySelector(selector);
};

export const getHTMLElements = (host: HTMLElement | ShadowRoot, selector: string): HTMLElement[] => {
  return Array.from(host.querySelectorAll(selector));
};
