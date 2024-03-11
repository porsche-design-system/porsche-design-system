import type { ButtonType } from '../types';
import { getClosestHTMLElement, setAttributes } from './dom';

export const improveButtonHandlingForCustomElement = (
  element: HTMLElement,
  getType: () => ButtonType,
  getDisabled: () => boolean,
  getName?: () => string | undefined,
  getValue?: () => string | undefined
): void => {
  element.addEventListener('click', (event) =>
    handleButtonEvent(event, element, getType, getDisabled, getName, getValue)
  );
};

export const handleButtonEvent = (
  event: MouseEvent | KeyboardEvent,
  element: HTMLElement,
  getType: () => ButtonType,
  getDisabled: () => boolean,
  getName?: () => string | undefined,
  getValue?: () => string | undefined
): void => {
  // Why? That's why: https://hjorthhansen.dev/shadow-dom-and-forms/
  const form = getClosestHTMLElement(element, 'form');
  if (form && !getDisabled()) {
    /**
     * we've to wait if someone calls preventDefault on the event
     * then we shouldn't submit the form
     */
    window.setTimeout(() => {
      if (!event.defaultPrevented) {
        const name = getName?.();
        const value = getValue?.();
        const fakeButton = document.createElement('button');
        setAttributes(fakeButton, {
          ...(name && { name }),
          ...(value && { value }),
          type: getType(),
        });
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
