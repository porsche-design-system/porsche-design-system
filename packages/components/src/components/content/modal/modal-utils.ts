import { getHTMLElements, getTagName, hasNamedSlot, isIos } from '../../../utils';
import type { SelectedAriaAttributes } from '../../../types';

// ionic
const focusableQueryString =
  '[tabindex]:not([tabindex^="-"]),input:not([type=hidden]):not([tabindex^="-"]),textarea:not([tabindex^="-"]),button:not([tabindex^="-"]),select:not([tabindex^="-"]),.ion-focusable:not([tabindex^="-"])';
const innerFocusableQueryString = 'input:not([type=hidden]),textarea,button,select';

// material
const candidatesSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

export const unpackChildren = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return (Array.from(el.children) as HTMLElement[])
    .map((child) => (child.children ? [child].concat(unpackChildren(child)) : child))
    .flat()
    .map((child) => (child.shadowRoot ? [child].concat(unpackChildren(child.shadowRoot)) : child))
    .flat();
};

export const getFirstAndLastFocusableElement = (host: HTMLElement, closeButton: HTMLElement): HTMLElement[] => {
  const notDisabled = ':not([disabled])';
  const selector = `[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex]:not([tabindex="-1"]`;

  const allNodes = unpackChildren(host);
  console.log(allNodes);

  const [first, last] = [closeButton].concat(getHTMLElements(host, selector));
  return [first, last];
};

// TODO: make recursively respect shadowRoots and return first + last element only
export const getFocusableElements = (host: HTMLElement, closeButton: HTMLElement): HTMLElement[] => {
  const notDisabled = ':not([disabled])';
  const selector = `[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex]:not([tabindex="-1"]`;

  return [closeButton].concat(getHTMLElements(host, selector));
};

const documentTouchListener = (e: TouchEvent) => e.preventDefault();
const hostTouchListener = (e: TouchEvent & { target: HTMLElement }) =>
  (e.target.scrollTop = getScrollTopOnTouch(e.target, e));

export const setScrollLock = (
  host: HTMLElement,
  isLocked: boolean,
  keyboardEventHandler: (e: KeyboardEvent) => void
): void => {
  const addOrRemoveEventListener = `${isLocked ? 'add' : 'remove'}EventListener`;
  document.body.style.overflow = isLocked ? 'hidden' : '';
  document[addOrRemoveEventListener]('keydown', keyboardEventHandler);

  // prevent scrolling of background on iOS
  if (isIos()) {
    document[addOrRemoveEventListener]('touchmove', documentTouchListener, false);
    host[addOrRemoveEventListener]('touchmove', hostTouchListener);
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

export const hasSlottedHeading = (host: HTMLElement): boolean => {
  return hasNamedSlot(host, 'heading');
};
