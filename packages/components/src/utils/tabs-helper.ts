// TODO: Unit tests?

import { prefix } from './prefix';

export const getStatusBarStyle = (activeTab: HTMLElement): string => {
  const statusBarWidth = activeTab?.offsetWidth || 0;
  const statusBarPositionLeft = activeTab?.offsetLeft || 0;
  return `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;
};

export const setSectionAttributes = (
  tab: HTMLPTabsItemElement,
  index: number
): void => {
  const attrs = {
    'role': 'tabpanel',
      'hidden': `${!tab.selected}`,
      'id': prefix(`tab-panel-${index}`),
      'aria-labelledby': prefix(`tab-item-${index}`)
  };
  for (const key in attrs) {
    tab.setAttribute(key, attrs[key]);
  }
};

export const scrollOnTabClick = (
  tabsItems: HTMLElement[],
  activeTabIndexOnClick: number,
  tabIndex: number,
  activeTabIndex: number,
  nav: HTMLElement,
  tabs: HTMLElement[],
  gradients: HTMLElement[]
): void => {
  const gradientPrevWidth = gradients[0].offsetWidth;
  const gradientNextWidth = gradients[1].offsetWidth;
  const activeTab = tabs[activeTabIndex];
  let nextTab: number;

  // go to next tab
  if (tabIndex > activeTabIndexOnClick && tabIndex < tabsItems.length - 1) {
    nextTab = activeTab.offsetLeft - gradientNextWidth;
    // go to prev tab
  } else if (tabIndex < activeTabIndexOnClick && tabIndex > 0) {
    nextTab = activeTab.offsetLeft + activeTab.offsetWidth + gradientPrevWidth - nav.offsetWidth;
    // go no where
  } else if (tabIndex === activeTabIndexOnClick) {
    // go first tab
  } else if (tabIndex === 0) {
    nextTab = 0;
    // go to last tab
  } else {
    nextTab = activeTab.offsetLeft - 4;
  }
  if (navigator.userAgent.includes('Edge/18')) {
    nav.scrollLeft = nextTab;
  } else {
    nav.scrollTo({
      left: nextTab,
      behavior: 'smooth'
    });
  }
};

export const scrollOnPrevNext = (action: 'prev' | 'next', nav: HTMLElement, tabs: HTMLElement[]): void => {
  const lastTab = tabs[tabs.length - 1];
  const navWidth = nav.offsetWidth;
  const currentScrollPosition = nav.scrollLeft;
  const scrollToStep = Math.round(navWidth * 0.2);
  const focusPaddingWidth = 4;
  const scrollToMax = lastTab.offsetLeft + lastTab.offsetWidth - navWidth + focusPaddingWidth;

  let scrollTo: number;

  if (action === 'next') {
    if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
      scrollTo = scrollToMax - 3;
    } else {
      scrollTo = currentScrollPosition + scrollToStep;
    }
  } else {
    if (currentScrollPosition - scrollToStep * 2 < 0) {
      scrollTo = 0;
    } else {
      scrollTo = currentScrollPosition - scrollToStep;
    }
  }
  if (navigator.userAgent.includes('Edge/18')) {
    nav.scrollLeft = scrollTo;
  } else {
    nav.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  }
};

export const scrollToSelectedTab = (
  activeTabIndex: number,
  nav: HTMLElement,
  tabs: HTMLElement[],
  gradients: HTMLElement[]
): void => {
  nav.scrollLeft = tabs[activeTabIndex].offsetLeft - gradients[1].offsetWidth;
};

export const registerIntersectionObserver = (
  cb: (direction: 'next' | 'prev', isIntersecting: boolean) => void,
  tabs: HTMLElement[]
): IntersectionObserver => {
  const [firstTab] = tabs;
  const [lastTab] = tabs.slice(-1);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === firstTab) {
          cb('prev', entry.isIntersecting);
        } else if (entry.target === lastTab) {
          cb('next', entry.isIntersecting);
        }
      }
    },
    { threshold: 1 }
  );

  intersectionObserver.observe(firstTab);
  intersectionObserver.observe(lastTab);

  return intersectionObserver;
};
