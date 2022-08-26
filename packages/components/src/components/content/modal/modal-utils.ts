import { getTagName } from '../../../utils';
import type { SelectedAriaAttributes } from '../../../types';
import { isFocusableElement, unpackChildren } from '../../../utils/focus-utils';

export type FirstAndLastFocusableElement = [HTMLElement, HTMLElement] | [];
export const getFirstAndLastFocusableElement = (
  host: HTMLElement,
  closeButton: HTMLElement
): FirstAndLastFocusableElement => {
  const focusableElements = (closeButton ? [closeButton] : []).concat(unpackChildren(host).filter(isFocusableElement));
  return [focusableElements[0], focusableElements[focusableElements.length - 1]];
};

export let documentKeydownListener: (e: KeyboardEvent) => void;

export const setScrollLock = (
  host: HTMLElement,
  isOpen: boolean,
  closeBtn?: HTMLElement, // irrelevant for disconnectedCallback
  closeModal?: () => void // irrelevant for disconnectedCallback
): void => {
  let focusableElements: FirstAndLastFocusableElement = [];
  document.body.style.overflow = isOpen ? 'hidden' : '';

  document.removeEventListener('keydown', documentKeydownListener);
  if (isOpen) {
    focusableElements = getFirstAndLastFocusableElement(host, closeBtn);
    documentKeydownListener = (e: KeyboardEvent): void => {
      const { key } = e;
      if (key === 'Escape') {
        closeModal();
      } else if (!focusableElements?.filter((x) => x).length && key === 'Tab') {
        // if we don't have any focusableElements we need to prevent Tab here
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', documentKeydownListener);
  }

  setFirstAndLastFocusableElementKeydownListener(focusableElements);
};

type KeyboardHandlerTuple = [(e: KeyboardEvent) => void, (e: KeyboardEvent) => void] | [];

/** cache of previous first and last focusable element so we are able to remove them again */
export let FOCUSABLE_ELEMENT_CACHE: FirstAndLastFocusableElement = [];
/** cache of previous event handler pair so we are able to remove them again */
export let KEYDOWN_EVENT_HANDLER_CACHE: KeyboardHandlerTuple = [];

export const setFirstAndLastFocusableElementKeydownListener = (
  focusableElements: FirstAndLastFocusableElement
): void => {
  // remove previous handlers if there are any
  if (FOCUSABLE_ELEMENT_CACHE.length) {
    FOCUSABLE_ELEMENT_CACHE.forEach((el, idx) => el.removeEventListener('keydown', KEYDOWN_EVENT_HANDLER_CACHE[idx]));
  }

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
