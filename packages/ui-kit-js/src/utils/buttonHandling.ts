import { ButtonType } from '../types';

export function improveButtonHandlingForCustomElement(element: HTMLElement, type: ButtonType) {
  element.addEventListener('click', event => fixEventTarget(event, element), true);
  element.addEventListener('click', event => handleButtonEvent(event, element, type));
}

function handleButtonEvent(event: MouseEvent, element: HTMLElement, type: ButtonType): void {
  // Why? That's why: https://www.hjorthhansen.dev/shadow-dom-and-forms/
  const form = element.closest('form');
  if (form) {
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
}

/**
 * IE11/Edge (not chromium based) workaround to
 * fix the event target of click events (which normally
 * shadow dom takes care of)
 */
function fixEventTarget(event: MouseEvent, element: HTMLElement): void {
  if (event.target !== element) {
    event.stopPropagation();
    event.preventDefault();
    element.click();
  }
}
