export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement | undefined): boolean => el && el.maxLength >= 0;

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
    internal.setCounterInnerHtml(el, counterElement);
  }
  internal.setAriaElementInnerHtml(el, characterCountElement);
  inputChangeCallback?.();
};

export const setCounterInnerHtml = (el: HTMLTextAreaElement | HTMLInputElement, counterElement: HTMLElement): void => {
  counterElement.innerText = `${el.value.length}/${el.maxLength}`;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function debounce<T extends (...args: any[]) => void>(fn: T, ms = 800) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export const setAriaElementInnerHtml = debounce(
  (el: HTMLTextAreaElement | HTMLInputElement, ariaElement: HTMLSpanElement): void => {
    ariaElement.innerText = `You have ${el.maxLength - el.value.length} out of ${el.maxLength} characters left`;
  }
);

export const internal = {
  setCounterInnerHtml,
  setAriaElementInnerHtml,
};
