import { getHTMLElements, getPrefixedTagNames, getTagName, isIos } from '../../../utils';
import { FOCUSABLE_TAG_NAMES_CAMEL_CASE } from '@porsche-design-system/shared';
import type { TagNameCamelCase } from '@porsche-design-system/shared';
import type { SelectedAriaAttributes } from '../../../types';

export const getFocusableElements = (host: HTMLElement, closeButton: HTMLElement): HTMLElement[] => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  const notDisabled = ':not([disabled])';
  const selector =
    Object.entries(PrefixedTagNames)
      .filter((entry) => FOCUSABLE_TAG_NAMES_CAMEL_CASE.includes(entry[0] as TagNameCamelCase)) // key
      .map((entry) => entry[1]) // value
      .join(',') +
    `,[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex]:not([tabindex="-1"]`;

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
  return [elements[0], elements[elements.length - 1]];
};

export const warnIfAriaAndHeadingPropsAreUndefined = (
  host: HTMLElement,
  heading: string,
  aria: SelectedAriaAttributes<ModalAriaAttributes>
): void => {
  if (!heading && !aria) {
    console.warn(
      `Either heading or aria attributes on ${getTagName(host)} have to be set in order to ensure accessibility.`
    );
  }
};

export const MODAL_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type ModalAriaAttributes = typeof MODAL_ARIA_ATTRIBUTES[number];
