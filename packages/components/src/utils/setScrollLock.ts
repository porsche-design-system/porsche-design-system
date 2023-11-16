export const setScrollLock = (isOpen: boolean): void => {
  // just setting `overflow: hidden` is not enough for iOS Safari with collapsed address bar where body is still scrollable
  // there are libraries like `body-scroll-lock` and `body-scroll-lock-upgrade` which advertise to handle it, but they
  // rely on event manipulation and also don't work reliable
  // https://github.com/willmcpo/body-scroll-lock/blob/master/src/bodyScrollLock.js
  // https://github.com/rick-liruixin/body-scroll-lock-upgrade/blob/develop/src/body-scroll-lock.ts
  // therefore the easiest solution is the following one, which causes the address bar to uncollapse/expand again

  const {
    body: { style, parentElement: htmlEl },
  } = document;

  if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
    if (isOpen && !style.top) {
      style.top = -htmlEl.scrollTop + 'px';
      style.overflowY = 'scroll'; // seems necessary for flyout or modal content to be scrollable
      style.position = 'fixed';
    } else {
      const topValue = -parseInt(style.top, 10);
      style.top = '';
      style.overflowY = '';
      style.position = '';
      htmlEl.scrollTop = topValue;
    }
  } else {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
};
