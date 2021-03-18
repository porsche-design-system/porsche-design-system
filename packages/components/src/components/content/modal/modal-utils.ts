import { getHTMLElements, getPrefixedTagNames, isIos } from '../../../utils';

export const getFocusableElements = (host: HTMLElement, closeButton: HTMLElement): HTMLElement[] => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  const notDisabled = ':not([disabled])';
  const selector =
    Object.values(PrefixedTagNames).join(',') +
    `,a[href],area[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex="0"]`;

  return [closeButton].concat(getHTMLElements(host, selector));
};

export const setScrollLock = (lock: boolean, host: HTMLElement): void => {
  document.body.style.overflow = lock ? 'hidden' : '';

  // prevent scrolling of background on iOS
  if (isIos()) {
    const addOrRemoveEventListener = lock ? 'addEventListener' : 'removeEventListener';
    document[addOrRemoveEventListener]('touchmove', (e: TouchEvent) => e.preventDefault(), false);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    host[addOrRemoveEventListener]('touchmove', (e: TouchEvent) => setScrollTop(e, host));
  }
};

const setScrollTop = (e: TouchEvent, host: HTMLElement): void => {
  host.scrollTop = handleHostTouchMove(e, host);
};

export const handleHostTouchMove = (e: TouchEvent, host: HTMLElement): number => {
  // Source: https://stackoverflow.com/a/43860705
  let { scrollTop, scrollHeight, offsetHeight } = host;
  const currentScroll = scrollTop + offsetHeight;

  if (scrollTop === 0 && currentScroll === scrollHeight) {
    e.preventDefault();
  } else if (scrollTop === 0) {
    scrollTop = 1;
  } else if (currentScroll === scrollHeight) {
    scrollTop = scrollTop - 1;
  }
  return scrollTop;
};

export const getFirstAndLastElement = (elements: HTMLElement[]): HTMLElement[] => {
  return [elements[0], elements.slice(-1)[0]];
};
