import { debounce } from 'throttle-debounce';
import { observeProperties } from '../property-observer';

export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement): boolean => el.maxLength >= 0;

// https://javascript.info/currying-partials
const inputEventListenerCurry = (
  characterCountElement: HTMLSpanElement,
  counterElement?: HTMLSpanElement,
  inputChangeCallback?: () => void
): EventListener => {
  // returns actual listener function
  return (e: InputEvent): void => {
    updateCounter(
      e.target as HTMLInputElement | HTMLTextAreaElement,
      characterCountElement,
      counterElement,
      inputChangeCallback
    );
  };
};

let eventListener: EventListener | null = null;

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

  // save returned function from inputEventListenerCurry, which is the actual listener function to be able to remove it
  eventListener = inputEventListenerCurry(characterCountElement, counterElement, inputChangeCallback);

  // remove the listener first to avoid multiple listeners on re-renders
  input.removeEventListener('input', eventListener);

  input.addEventListener('input', eventListener);
};

export const updateCounter = (
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
