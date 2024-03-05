import { debounce } from 'throttle-debounce';
import { observeProperties } from '../property-observer';

export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement): boolean => el.maxLength >= 0;

export const addInputEventListenerForCounter = (
  input: HTMLTextAreaElement | HTMLInputElement,
  characterCountElement: HTMLSpanElement,
  counterElement?: HTMLSpanElement,
  inputChangeCallback?: () => void
): void => {
  updateCounter(input, characterCountElement, counterElement); // Initial value

  // When value changes programmatically
  observeProperties(input, ['value'], () => {
    updateCounter(input, characterCountElement, counterElement, inputChangeCallback);
  });

  // When value changes by input
  input.addEventListener('input', (e: Event & { target: HTMLTextAreaElement | HTMLInputElement }) => {
    updateCounter(e.target, characterCountElement, counterElement, inputChangeCallback);
  });
};

const updateCounter = (
  el: HTMLTextAreaElement | HTMLInputElement,
  characterCountElement: HTMLSpanElement,
  counterElement?: HTMLSpanElement,
  inputChangeCallback?: () => void
): void => {
  if (counterElement) {
    setCounterInnerHtml(el, counterElement);
  }
  setAriaElementInnerHtml(el, characterCountElement);
  inputChangeCallback?.();
};

export const setCounterInnerHtml = (el: HTMLTextAreaElement | HTMLInputElement, counterElement: HTMLElement): void => {
  counterElement.innerText = `${el.value.length}/${el.maxLength}`;
};

export const setAriaElementInnerHtml = debounce(
  800,
  (el: HTMLTextAreaElement | HTMLInputElement, ariaElement: HTMLSpanElement): void => {
    ariaElement.innerText = `You have ${el.maxLength - el.value.length} out of ${el.maxLength} characters left`;
  }
);
