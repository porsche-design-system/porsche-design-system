import * as formUtils from './form-utils';
import { hasCounter, setAriaElementInnerHtml, setCounterInnerHtml, updateCounter } from './form-utils';

const getInputElement = (): HTMLInputElement => {
  const el = document.createElement('input');
  el.id = 'input';
  return el;
};
const getCounterElement = (): HTMLSpanElement => {
  const el = document.createElement('span');
  el.id = 'counter';
  return el;
};
const getAriaElement = (): HTMLSpanElement => {
  const el = document.createElement('span');
  el.id = 'ariaElement';
  return el;
};

describe('hasCounter()', () => {
  it('should for defined maxLength return true', () => {
    const inputElement = getInputElement();
    inputElement.maxLength = 20;
    expect(hasCounter(inputElement)).toBe(true);
  });

  it('should for undefined maxLength return false', () => {
    const inputElement = getInputElement();
    Object.defineProperty(inputElement, 'maxLength', { value: -1 }); // jsdom defaults to 524288 which is 512 KB
    expect(hasCounter(inputElement)).toBe(false);
  });
});

describe('setCounterInnerHtml()', () => {
  it('should set correct character count as innerText on element ', () => {
    const counterElement = getCounterElement();
    const inputElement = getInputElement();

    inputElement.maxLength = 20;
    inputElement.value = 'some';
    setCounterInnerHtml(inputElement, counterElement);
    expect(counterElement.innerText).toBe('4/20');

    inputElement.maxLength = 25;
    inputElement.value = 'Hi';
    setCounterInnerHtml(inputElement, counterElement);
    expect(counterElement.innerText).toBe('2/25');
  });
});

describe('setAriaElementInnerHtml()', () => {
  const getAccessibilityMessage = (remainingCharacter: number, maxCharacter: number) =>
    `You have ${remainingCharacter} out of ${maxCharacter} characters left`;

  it('should set correct character count text for screen reader as innerText on element', async () => {
    const ariaElement = getAriaElement();
    const inputElement = getInputElement();
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

    inputElement.maxLength = 20;
    setAriaElementInnerHtml(inputElement, ariaElement);
    await wait();
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(20, 20));

    inputElement.value = 'some';
    setAriaElementInnerHtml(inputElement, ariaElement);
    await wait();
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(16, 20));

    inputElement.maxLength = 25;
    inputElement.value = 'Hi';
    setAriaElementInnerHtml(inputElement, ariaElement);
    await wait();
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(23, 25));
  });
});

describe('updateCounter()', () => {
  it('should initially call setCounterInnerHtml() and setAriaElementInnerHtml()', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();

    const setCounterInnerHtmlSpy = jest.spyOn(formUtils, 'setCounterInnerHtml');
    const setAriaElementInnerHtmlSpy = jest.spyOn(formUtils, 'setAriaElementInnerHtml');
    updateCounter(inputElement, ariaElement, counterElement);

    expect(setCounterInnerHtmlSpy).toBeCalledWith(inputElement, counterElement);
    expect(setCounterInnerHtmlSpy).toBeCalledTimes(1);

    expect(setAriaElementInnerHtmlSpy).toBeCalledWith(inputElement, ariaElement);
    expect(setAriaElementInnerHtmlSpy).toBeCalledTimes(1);
  });

  it('should on input event call setCounterInnerHtml() and setAriaElementInnerHtml()', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();
    const setCounterInnerHtmlSpy = jest.spyOn(formUtils, 'setCounterInnerHtml');
    const setAriaElementInnerHtmlSpy = jest.spyOn(formUtils, 'setAriaElementInnerHtml');
    updateCounter(inputElement, ariaElement, counterElement);

    expect(setCounterInnerHtmlSpy).toBeCalledWith(inputElement, counterElement);
    expect(setCounterInnerHtmlSpy).toBeCalledTimes(2);
    expect(setAriaElementInnerHtmlSpy).toBeCalledWith(inputElement, ariaElement);
    expect(setAriaElementInnerHtmlSpy).toBeCalledTimes(2);
  });

  it('should on input event call inputChangeCallback() if supplied', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();
    const callback = jest.fn();
    updateCounter(inputElement, ariaElement, counterElement, callback);

    expect(callback).toBeCalledTimes(1);
  });
});
