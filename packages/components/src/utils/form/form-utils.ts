export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement): boolean => el.maxLength >= 0;

export const setCounterInnerHtml = (el: HTMLTextAreaElement | HTMLInputElement, counterElement: HTMLElement): void => {
  counterElement.innerText = `${el.value.length}/${el.maxLength}`;
};

export const setAriaElementInnerHtml = (
  el: HTMLTextAreaElement | HTMLInputElement,
  ariaElement: HTMLSpanElement
): void => {
  ariaElement.innerText = `You have ${el.maxLength - el.value.length} out of ${el.maxLength} characters left`;
};

export const addInputEventListenerForCounter = (
  input: HTMLTextAreaElement | HTMLInputElement,
  characterCountElement: HTMLSpanElement,
  counterElement?: HTMLSpanElement,
  inputChangeCallback?: () => void
): void => {
  if (counterElement) {
    setCounterInnerHtml(input, counterElement); // initial value
  }
  setAriaElementInnerHtml(input, characterCountElement); // initial value

  input.addEventListener('input', (e: Event & { target: HTMLTextAreaElement | HTMLInputElement }) => {
    if (counterElement) {
      setCounterInnerHtml(e.target, counterElement);
    }
    setAriaElementInnerHtml(e.target, characterCountElement);
    if (inputChangeCallback) {
      inputChangeCallback();
    }
  });
};
