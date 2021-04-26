import { attachCss, buildHostStyles, getCss, getHTMLElements, getPrefixedTagNames, isIos } from '../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getFocusableElements = (host: HTMLElement, closeButton: HTMLElement): HTMLElement[] => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  const notDisabled = ':not([disabled])';
  const selector =
    Object.values(PrefixedTagNames).join(',') +
    `,a[href],area[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex="0"]`;

  return [closeButton].concat(getHTMLElements(host, selector));
};

export const setScrollLock = (host: HTMLElement, lock: boolean, listener: (e: TouchEvent) => void): void => {
  document.body.style.overflow = lock ? 'hidden' : '';

  // prevent scrolling of background on iOS
  if (isIos()) {
    const addOrRemoveEventListener = lock ? 'addEventListener' : 'removeEventListener';
    document[addOrRemoveEventListener]('touchmove', (e: TouchEvent) => e.preventDefault(), false);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    host[addOrRemoveEventListener]('touchmove', listener);
  }
};

export const getScrollTopOnTouch = (host: HTMLElement, e: TouchEvent): number => {
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

export const getFirstAndLastElement = <T>(elements: T[]): T[] => {
  return [elements[0], elements.slice(-1)[0]];
};

const baseCss: string = getCss(
  buildHostStyles({
    position: 'fixed !important',
    top: '0 !important',
    left: '0 !important',
    right: '0 !important',
    bottom: '0 !important',
    zIndex: '99999 !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    flexWrap: 'wrap !important',
    background: `${color.darkTheme.background.default}e6 !important`, // e6 = 0.9 alpha
    transition: 'opacity 0.2s $easing !important ',
    opacity: '0 !important',
    visibility: 'hidden !important',
    overflowY: 'auto',
  })
);

export const getDynamicCss = (open: boolean): string => {
  return open
    ? getCss({
        ...buildHostStyles({
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear !important',
          opacity: '1 !important',
          visibility: 'inherit !important',
        }),
        root: {
          transform: 'scale3d(1, 1, 1)',
        },
      })
    : '';
};

export const addCss = (host: HTMLElement, open: boolean): void => {
  attachCss(host, baseCss + getDynamicCss(open));
};
