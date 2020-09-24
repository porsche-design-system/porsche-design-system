import { prefix } from './prefix';

type HTMLElementSelector = 'nav' | 'statusBar';
type HTMLElementsSelector = 'tabs' | 'gradient';

export const getStatusBarStyle = (host: HTMLElement, activeTabIndex: number): string => {
  const tabs = getHTMLElements('tabs', host);
  const activeTab = tabs[activeTabIndex];
  const statusBarWidth = activeTab !== undefined ? activeTab.offsetWidth : 0;
  const statusBarPositionLeft = activeTab !== undefined ? activeTab.offsetLeft : 0;
  const statusBarStyle = `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;
  return statusBarStyle;
};

export const scrollOnTabClick = (
  host: HTMLElement,
  tabsItems: HTMLPTabsItemElement[],
  activeTabIndexOnClick: number,
  tabIndex: number,
  activeTabIndex: number
): void => {

  const nav = getHTMLElement('nav', host);
  const tabs = getHTMLElements('tabs', host);
  const gradient = getHTMLElements('gradient', host);
  const gradientprevWidth = gradient[0].offsetWidth;
  const gradientNextWidth = gradient[1].offsetWidth;
  const activeTab = tabs[activeTabIndex];
  let nextTab: number;

  if (tabIndex > activeTabIndexOnClick && tabIndex < tabsItems.length - 1) {
    nextTab = activeTab.offsetLeft - gradientNextWidth;
  } else if (tabIndex < activeTabIndexOnClick && tabIndex > 0) {
    nextTab = activeTab.offsetLeft + activeTab.offsetWidth + gradientprevWidth - nav.offsetWidth;
  } else {
    nextTab = activeTab.offsetLeft - 3;
  }

  nav.scrollTo({
    left: nextTab,
    behavior: 'smooth'
  });
};

export const handlePrevNextClick = (action: 'prev' | 'next', host: HTMLElement): void => {
  const nav = getHTMLElement('nav', host);
  const tabs = getHTMLElements('tabs', host);
  const lastTab = tabs[tabs.length - 1];
  const navWidth = nav.offsetWidth;
  const currentScrollPosition = nav.scrollLeft;
  const scrollToStep = navWidth * 0.2;
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

  nav.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });
};

export const scrollToSelectedTab = (host: HTMLElement, activeTabIndex: number): void => {
  const tabs = getHTMLElements('tabs', host);
  const nav = getHTMLElement('nav', host);
  const gradient = getHTMLElements('gradient', host);
  nav.scrollLeft = tabs[activeTabIndex].offsetLeft - gradient[0].offsetWidth;
};

export const registerIntersectionObserver = (
  host: HTMLElement,
  cb: (direction: 'next' | 'prev', isIntersecting: boolean) => void
): IntersectionObserver => {
  const tabs = getHTMLElements('tabs', host);
  const firstTab = tabs[0];
  const lastTab = tabs[tabs.length - 1];

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === firstTab) {
          cb('prev', entry.isIntersecting);
        }
        if (entry.target === lastTab) {
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

export const getHTMLElement = (element: HTMLElementSelector, host: HTMLElement): HTMLElement => {
  const selector = {
    nav: 'tabs__scroll-area',
    statusBar: 'tabs__status-bar'
  };

  return host.shadowRoot.querySelector(`.${prefix(selector[element])}`);
};

export const getHTMLElements = (elements: HTMLElementsSelector, host: HTMLElement): HTMLElement[] => {
  const selector = {
    tabs: 'tabs__tab',
    gradient: 'tabs__gradient'
  };

  return Array.from(host.shadowRoot.querySelectorAll(`.${prefix(selector[elements])}`));
};
