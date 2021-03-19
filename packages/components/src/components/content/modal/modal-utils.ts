import { getHTMLElements, getPrefixedTagNames, isIos } from '../../../utils';

export const getFocusableElements = (host: HTMLElement, closeButton: HTMLElement): HTMLElement[] => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  const notDisabled = ':not([disabled])';
  const selector =
    Object.values(PrefixedTagNames).join(',') +
    `,a[href],area[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex="0"]`;

  return [closeButton].concat(getHTMLElements(host, selector));
};

export const setScrollLock = (host: HTMLElement, lock: boolean): void => {
  document.body.style.overflow = lock ? 'hidden' : '';

  // prevent scrolling of background on iOS
  if (isIos()) {
    const addOrRemoveEventListener = lock ? 'addEventListener' : 'removeEventListener';
    document[addOrRemoveEventListener]('touchmove', (e: TouchEvent) => e.preventDefault(), false);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    host[addOrRemoveEventListener]('touchmove', (e: TouchEvent) => setScrollTop(host, e));
  }
};

const setScrollTop = (host: HTMLElement, e: TouchEvent) => {
  host.scrollTop = handleHostTouchMove(host, e);
};

export const handleHostTouchMove = (host: HTMLElement, e: TouchEvent): number => {
  // Source: https://stackoverflow.com/a/43860705
  const { scrollTop, scrollHeight, offsetHeight } = host;
  let result = scrollTop;
  const currentScroll = scrollTop + offsetHeight;

  if (scrollTop === 0 && currentScroll === scrollHeight) {
    e.preventDefault();
  } else if (scrollTop === 0) {
    result = 1;
  } else if (currentScroll === scrollHeight) {
    result = scrollTop - 1;
  }
  return result;
};

export const getFirstAndLastElement = (elements: HTMLElement[]): HTMLElement[] => {
  return [elements[0], elements.slice(-1)[0]];
};
