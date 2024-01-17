export const unpackChildren = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return Array.from(el.children, (child: HTMLElement) =>
    child.children ? [child].concat(unpackChildren(child)) : child
  )
    .flat()
    .map((child) => (child.shadowRoot ? [child].concat(unpackChildren(child.shadowRoot)) : child))
    .flat();
};

// TODO: could be extended by audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]) or iframe
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

export type FirstAndLastFocusableElement = [HTMLElement, HTMLElement] | [];
export const getFirstAndLastFocusableElement = (
  host: HTMLElement,
  closeButton: HTMLElement
): FirstAndLastFocusableElement => {
  const focusableElements = (closeButton ? [closeButton] : []).concat(unpackChildren(host).filter(isFocusableElement));
  return [focusableElements[0], focusableElements.pop()];
};

export let documentKeydownListener: (e: KeyboardEvent) => void;

export const setFocusTrap = (
  host: HTMLElement,
  isOpen: boolean,
  firstFocusableElement: HTMLElement,
  closeBtn?: HTMLElement, // irrelevant for disconnectedCallback
  closeFn?: () => void // irrelevant for disconnectedCallback
): void => {
  let focusableElements: FirstAndLastFocusableElement = [];

  document.removeEventListener('keydown', documentKeydownListener);
  if (isOpen) {
    focusableElements = getFirstAndLastFocusableElement(host, closeBtn);
    documentKeydownListener = (e: KeyboardEvent): void => {
      const { key, shiftKey } = e;
      const { activeElement } = host.shadowRoot;
      if (key === 'Escape') {
        closeFn();
      } else if (key === 'Tab') {
        if (shiftKey && activeElement === firstFocusableElement) {
          // when component is opened initially, the dialog is focused and shift + tab would break out of cycle
          e.preventDefault();
          focusableElements[1]?.focus();
        } else if (!focusableElements.filter((x) => x).length) {
          // if we don't have any focusableElements we need to prevent Tab here
          e.preventDefault();
        }
        // all other cases respect the natural tab order
        // the cycle itself is accomplished within setFirstAndLastFocusableElementKeydownListener
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
  if (focusableElements.filter((x) => x).length) {
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
