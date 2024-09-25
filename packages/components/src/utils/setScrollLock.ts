export const scrollLockStyles = `
      html, body {
        overflow: hidden; /* prevent scrolling on the background */
      }
      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none; /* hide scrollbar in WebKit browsers */
      }
      html, body {
        scrollbar-width: none; /* hide scrollbar in Firefox */
      }
    `;

export const setScrollLock = (isOpen: boolean): void => {
  // This doesn't work reliably in iOS Safari with collapsed address bar where body is still scrollable
  // there are libraries like `body-scroll-lock` and `body-scroll-lock-upgrade` which advertise to handle it, but they
  // rely on event manipulation and also don't work reliable
  // https://github.com/willmcpo/body-scroll-lock/blob/master/src/bodyScrollLock.js
  // https://github.com/rick-liruixin/body-scroll-lock-upgrade/blob/develop/src/body-scroll-lock.ts
  // Since solutions where the html and body nodes are manipulated can cause all kinds of other problems, we keep this simple solution for now
  const styleAttribute = 'data-pds-scroll-lock-styles';
  let styleElement = document.querySelector(`style[${styleAttribute}]`);

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute(styleAttribute, '');
    document.head.appendChild(styleElement);
  }

  if (isOpen) {
    styleElement.innerHTML = scrollLockStyles;
  } else {
    document.head.removeChild(styleElement);
  }
};
