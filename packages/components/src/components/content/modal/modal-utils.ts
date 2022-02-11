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

const documentTouchListener = (e: TouchEvent) => e.preventDefault();
const hostTouchListener = (e: TouchEvent & { target: HTMLElement }) =>
  (e.target.scrollTop = getScrollTopOnTouch(e.target, e));

export const setScrollLock = (
  host: HTMLElement,
  isLocked: boolean,
  focusableElements: FirstAndLastFocusableElement,
  keydownEventHandler: (e: KeyboardEvent) => void
): void => {
  const addOrRemoveEventListener = `${isLocked ? 'add' : 'remove'}EventListener`;
  document.body.style.overflow = isLocked ? 'hidden' : '';
  document[addOrRemoveEventListener]('keydown', keydownEventHandler);

  setFirstAndLastFocusableElementKeydownListener(focusableElements);

  // prevent scrolling of background on iOS
  if (isIos()) {
    document[addOrRemoveEventListener]('touchmove', documentTouchListener, false);
    host[addOrRemoveEventListener]('touchmove', hostTouchListener);
  }
};

// cache for previous event pari of event listeners so we are able to remove them again
const keydownEventListenerMap: Map<
  FirstAndLastFocusableElement,
  [(e: KeyboardEvent) => void, (e: KeyboardEvent) => void]
> = new Map();
const getFirstAndLastFocusableElementKeydownListeners = (
  focusableElements: FirstAndLastFocusableElement
): [(e: KeyboardEvent) => void, (e: KeyboardEvent) => void] =>
  focusableElements.map((_, idx) => (e: KeyboardEvent) => {
    if (e.key === 'Tab' && ((idx === 0 && e.shiftKey) || (idx === 1 && !e.shiftKey))) {
      e.preventDefault();
      focusableElements[idx === 0 ? 1 : 0].focus();
    }
  }) as [(e: KeyboardEvent) => void, (e: KeyboardEvent) => void];

const setFirstAndLastFocusableElementKeydownListener = (focusableElements: FirstAndLastFocusableElement): void => {
  // remove previous listeners if there are any
  Array.from(keydownEventListenerMap.entries()).forEach(([els, listeners]) =>
    els.forEach((el, idx) => el?.removeEventListener('keydown', listeners[idx]))
  );
  keydownEventListenerMap.clear();

  // create, apply and save new listeners for future removal
  if (focusableElements) {
    const keydownListeners = getFirstAndLastFocusableElementKeydownListeners(focusableElements);
    focusableElements.forEach((el, idx) => el?.addEventListener('keydown', keydownListeners[idx]));
    keydownEventListenerMap.set(focusableElements, keydownListeners);
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
