import { getTagName, isIos } from '../../../utils';
import type { SelectedAriaAttributes } from '../../../types';

// // ionic
// const focusableQueryString =
//   '[tabindex]:not([tabindex^="-"]),input:not([type=hidden]):not([tabindex^="-"]),textarea:not([tabindex^="-"]),button:not([tabindex^="-"]),select:not([tabindex^="-"]),.ion-focusable:not([tabindex^="-"])';
// const innerFocusableQueryString = 'input:not([type=hidden]),textarea,button,select';
//
// // material
// const candidatesSelector = [
//   'input',
//   'select',
//   'textarea',
//   'a[href]',
//   'button',
//   '[tabindex]',
//   'audio[controls]',
//   'video[controls]',
//   '[contenteditable]:not([contenteditable="false"])',
// ].join(',');

export const unpackChildren = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return (Array.from(el.children) as HTMLElement[])
    .map((child) => (child.children ? [child].concat(unpackChildren(child)) : child))
    .flat()
    .map((child) => (child.shadowRoot ? [child].concat(unpackChildren(child.shadowRoot)) : child))
    .flat();
};

export const isFocusableElement = (el: HTMLInputElement): boolean => {
  const { nodeName } = el;
  return (
    ((nodeName === 'INPUT' && el.type !== 'hidden') ||
      nodeName === 'TEXTAREA' ||
      nodeName === 'SELECT' ||
      nodeName === 'BUTTON' ||
      (nodeName === 'A' && !!(el as any).href)) &&
    el.tabIndex >= 0 &&
    !el.disabled
  );
};

export type FirstAndLastFocusableElement = [HTMLElement, HTMLElement];
export const getFirstAndLastFocusableElement = (
  host: HTMLElement,
  closeButton: HTMLElement
): FirstAndLastFocusableElement => {
  const focusableElements = (closeButton ? [closeButton] : []).concat(unpackChildren(host).filter(isFocusableElement));
  return [focusableElements[0], focusableElements[focusableElements.length - 1]];
};

export let documentKeydownListener: (e: KeyboardEvent) => void;
export const documentTouchListener = (e: TouchEvent): void => e.preventDefault();
export const hostTouchListener = (e: TouchEvent & { target: HTMLElement }): void => {
  e.target.scrollTop = getScrollTopOnTouch(e.target, e);
};

export const setScrollLock = (
  host: HTMLElement,
  isOpen: boolean,
  focusableElements?: FirstAndLastFocusableElement, // irrelevant for disconnectedCallback
  closeModal?: () => void // irrelevant for disconnectedCallback
): void => {
  document.body.style.overflow = isOpen ? 'hidden' : '';

  document.removeEventListener('keydown', documentKeydownListener);
  if (isOpen) {
    documentKeydownListener = (e: KeyboardEvent): void => {
      const { key } = e;
      if (key === 'Esc' || key === 'Escape') {
        closeModal();
      } else if (!focusableElements?.filter((x) => x).length && key === 'Tab') {
        // if we don't have any focusableElements we need to prevent Tab here
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', documentKeydownListener);
  }

  setFirstAndLastFocusableElementKeydownListener(focusableElements);

  // prevent scrolling of background on iOS
  if (isIos()) {
    const addOrRemoveEventListener = `${isOpen ? 'add' : 'remove'}EventListener`;
    document[addOrRemoveEventListener]('touchmove', documentTouchListener, false);
    host[addOrRemoveEventListener]('touchmove', hostTouchListener);
  }
};

type KeyboardHandlerTuple = [(e: KeyboardEvent) => void, (e: KeyboardEvent) => void];

/** cache of previous first and last focusable element so we are able to remove them again */
export let FOCUSABLE_ELEMENT_CACHE: FirstAndLastFocusableElement | [] = [];
/** cache of previous event handler pair so we are able to remove them again */
export let KEYDOWN_EVENT_HANDLER_CACHE: KeyboardHandlerTuple | [] = [];

export const setFirstAndLastFocusableElementKeydownListener = (
  focusableElements: FirstAndLastFocusableElement
): void => {
  console.log('setFirstAndLastFocusableElementKeydownListener');
  // remove previous handlers if there are any
  if (FOCUSABLE_ELEMENT_CACHE.length) {
    FOCUSABLE_ELEMENT_CACHE.forEach((el, idx) => el.removeEventListener('keydown', KEYDOWN_EVENT_HANDLER_CACHE[idx]));
  }

  console.log(focusableElements);

  // create, apply and save new handlers for future removal
  if (focusableElements?.filter((x) => x).length) {
    FOCUSABLE_ELEMENT_CACHE = [...focusableElements]; // prevent mutation
    KEYDOWN_EVENT_HANDLER_CACHE = focusableElements.map((el, idx) => {
      const handler = (e: KeyboardEvent): void => {
        if (e.key === 'Tab' && ((idx === 0 && e.shiftKey) || (idx === 1 && !e.shiftKey))) {
          e.preventDefault();
          focusableElements[idx === 0 ? 1 : 0].focus();
        }
      };
      el.addEventListener('keydown', handler);
      return handler;
    }) as KeyboardHandlerTuple;
  }
};

export const getScrollTopOnTouch = (host: HTMLElement, e: TouchEvent): number => {
  // Source: https://stackoverflow.com/a/43860705
  const { scrollTop, scrollHeight, offsetHeight } = host;
  let result = scrollTop;
  const currentScroll = scrollTop + offsetHeight;

  if (scrollTop === 0) {
    if (currentScroll === scrollHeight) {
      e.preventDefault();
    } else {
      result = 1;
    }
  } else if (currentScroll === scrollHeight) {
    result = scrollTop - 1;
  }
  return result;
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
