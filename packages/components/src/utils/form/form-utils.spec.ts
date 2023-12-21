import * as formUtils from './form-utils';
import {
  addInputEventListenerForCounter,
  hasCounter,
  setAriaElementInnerHtml,
  setCounterInnerHtml,
} from './form-utils';

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

describe('addInputEventListenerForCounter()', () => {
  it('should register event listener on element', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();
    const spy = jest.spyOn(inputElement, 'addEventListener');

    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);
    expect(spy).toBeCalledWith('input', expect.anything());
  });

  it('should register event listener on element without error when no counterElement is provided', () => {
    const inputElement = getInputElement();
    const ariaElement = getAriaElement();
    const spy = jest.spyOn(inputElement, 'addEventListener');
    let error = undefined;
    try {
      addInputEventListenerForCounter(inputElement, ariaElement);
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
    expect(spy).toBeCalledWith('input', expect.anything());
  });

  it('should initially call setCounterInnerHtml() and setAriaElementInnerHtml()', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();

    const setCounterInnerHtmlSpy = jest.spyOn(formUtils, 'setCounterInnerHtml');
    const setAriaElementInnerHtmlSpy = jest.spyOn(formUtils, 'setAriaElementInnerHtml');
    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);

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
    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);

    inputElement.dispatchEvent(new Event('input'));
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
    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);

    inputElement.dispatchEvent(new Event('input'));
    expect(callback).toBeCalledTimes(1);
  });
});
