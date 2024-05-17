import { debounce } from 'throttle-debounce';

export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement): boolean => el.maxLength >= 0;

// https://javascript.info/currying-partials
export const inputEventListenerCurry = (
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
