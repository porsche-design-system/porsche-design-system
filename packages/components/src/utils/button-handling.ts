import { ButtonType } from '../types';

export const improveButtonHandlingForCustomElement = (
  element: HTMLElement,
  getType: () => ButtonType,
  getDisabled: () => boolean
): void => {
  element.addEventListener('click', event => fixEventTarget(event, element), true);
  element.addEventListener('click', event => handleButtonEvent(event, element, getType, getDisabled));
};

export const handleButtonEvent = (
  event: MouseEvent,
  element: HTMLElement,
  getType: () => ButtonType,
  getDisabled: () => boolean
): void => {
  // Why? That's why: https://www.hjorthhansen.dev/shadow-dom-and-forms/
  const form = element.closest('form');
  const type = getType();
  const disabled = getDisabled();
  if (form && !disabled) {
    /**
     * we've to wait if someone calls preventDefault on the event
     * then we shouldn't submit the form
     */
    window.setTimeout(() => {
      if (!event.defaultPrevented) {
        const fakeButton = document.createElement('button');
        fakeButton.type = type;
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.addEventListener('click', (fakeButtonEvent) => {
          fakeButtonEvent.stopPropagation();
        });
        fakeButton.click();
        fakeButton.remove();
      }
    }, 1);
  }
};

/**
 * IE11/Edge (not chromium based) workaround to
 * fix the event target of click events (which normally
 * shadow dom takes care of)
 */
const fixEventTarget = (event: MouseEvent, element: HTMLElement): void => {
  if (event.target !== element) {
    event.stopPropagation();
    event.preventDefault();
    element.click();
  }
};
