export const getStatusBarStyle = (activeTabIndex: number, tabs: HTMLElement[]): string => {
  const activeTab = tabs[activeTabIndex];
  const statusBarWidth = activeTab !== undefined ? activeTab.offsetWidth : 0;
  const statusBarPositionLeft = activeTab !== undefined ? activeTab.offsetLeft : 0;
  const statusBarStyle = `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;
  return statusBarStyle;
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
  const gradientprevWidth = gradients[0].offsetWidth;
  const gradientNextWidth = gradients[1].offsetWidth;
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

export const scrollOnPrevNext = (action: 'prev' | 'next', nav: HTMLElement, tabs: HTMLElement[]): void => {
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

export const scrollToSelectedTab = (activeTabIndex: number, nav: HTMLElement, tabs: HTMLElement[], gradients: HTMLElement[]): void => {
  nav.scrollLeft = tabs[activeTabIndex].offsetLeft - gradients[1].offsetWidth;
};

export const registerIntersectionObserver = (
  cb: (direction: 'next' | 'prev', isIntersecting: boolean) => void,
  tabs: HTMLElement[]
): IntersectionObserver => {
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
